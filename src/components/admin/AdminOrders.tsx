import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";
import { adminListOrders, adminSlipUrl, adminUpdateOrder } from "@/lib/admin.functions";
import { formatMoney } from "@/lib/shop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUSES = ["new", "confirmed", "baking", "ready", "collected", "cancelled"] as const;
const PAYMENT_STATUSES = ["not_paid", "paid", "refunded"] as const;

type OrderRow = Awaited<ReturnType<typeof adminListOrders>>[number];

function paymentTone(status: string) {
  if (status === "paid") return "default" as const;
  if (status === "refunded") return "outline" as const;
  return "destructive" as const;
}

export function AdminOrders({ paymentsOnly = false }: { paymentsOnly?: boolean }) {
  const listOrders = useServerFn(adminListOrders);
  const updateOrder = useServerFn(adminUpdateOrder);
  const slipUrl = useServerFn(adminSlipUrl);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => listOrders(),
  });

  const [selected, setSelected] = useState<OrderRow | null>(null);
  const [slips, setSlips] = useState<Record<string, string>>({});

  const mutate = useMutation({
    mutationFn: (input: {
      id: string;
      status?: (typeof STATUSES)[number];
      payment_status?: (typeof PAYMENT_STATUSES)[number];
    }) => updateOrder({ data: input }),

    onSuccess: () => {
      toast.success("Order updated.");
      void queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function openSlip(order: OrderRow) {
    if (!order.slip_path) return;
    try {
      const cached = slips[order.id];
      const url = cached ?? (await slipUrl({ data: { path: order.slip_path } })).url;
      setSlips((s) => ({ ...s, [order.id]: url }));
      window.open(url, "_blank", "noopener");
    } catch {
      toast.error("Could not open that slip.");
    }
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  const orders = (data ?? []).filter((o) =>
    paymentsOnly ? o.checkout_method === "bank_transfer" || o.payment_status !== "paid" : true,
  );

  if (orders.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders yet.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-[1rem] border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Needed</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.reference}</TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <p className="truncate">{o.customer_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{o.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {o.pickup_date ?? "—"}
                </TableCell>
                <TableCell>{formatMoney(o.due_now_cents)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={paymentTone(o.payment_status)}>
                      {o.payment_status.replace("_", " ")}
                    </Badge>
                    {o.slip_path && (
                      <Button size="icon" variant="ghost" onClick={() => openSlip(o)} title="View slip">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Select
                    value={o.status}
                    onValueChange={(v) => mutate.mutate({ id: o.id, status: v })}
                  >
                    <SelectTrigger className="h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Select
                      value={o.payment_status}
                      onValueChange={(v) => mutate.mutate({ id: o.id, payment_status: v })}
                    >
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" onClick={() => setSelected(o)}>
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {mutate.isPending && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> Saving…
        </p>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selected.reference}</DialogTitle>
                <DialogDescription>
                  Placed {new Date(selected.created_at).toLocaleString()} ·{" "}
                  {selected.checkout_method === "bank_transfer" ? "Bank transfer" : "WhatsApp"}
                </DialogDescription>
              </DialogHeader>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Detail label="Customer" value={selected.customer_name} />
                <Detail label="Phone" value={selected.phone} />
                <Detail label="Email" value={selected.email ?? "—"} />
                <Detail label="Needed" value={selected.pickup_date ?? "—"} />
                <Detail label="Window" value={selected.pickup_window ?? "—"} />
                <Detail
                  label="Fulfilment"
                  value={
                    selected.fulfilment === "delivery"
                      ? `Delivery — ${selected.delivery_area ?? "area TBC"}`
                      : "Pickup"
                  }
                />
                <Detail label="Occasion" value={selected.occasion ?? "—"} />
                <Detail label="Allergies" value={selected.allergies ?? "—"} />
              </dl>

              {selected.notes && (
                <p className="rounded-[0.75rem] bg-secondary p-3 text-sm">{selected.notes}</p>
              )}

              <div>
                <h3 className="eyebrow text-muted-foreground">Items</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {(selected.order_items ?? []).map((item) => (
                    <li key={item.id} className="flex justify-between gap-4 border-b border-border pb-2">
                      <span>
                        {item.quantity} × {item.name}
                        {item.options && Object.keys(item.options as object).length > 0 && (
                          <span className="block text-xs text-muted-foreground">
                            {Object.entries(item.options as Record<string, string>)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(" · ")}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0">
                        {item.unit_price_cents != null
                          ? formatMoney(item.unit_price_cents * item.quantity)
                          : "Quoted"}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span>{formatMoney(selected.due_now_cents)}</span>
                </p>
              </div>

              {selected.checkout_method === "bank_transfer" && (
                <div className="rounded-[0.75rem] border border-border p-3 text-sm">
                  <h3 className="eyebrow text-muted-foreground">Transfer details</h3>
                  <p className="mt-2">Payer: {selected.payer_name ?? "—"}</p>
                  <p>Reference: {selected.transfer_reference ?? "—"}</p>
                  <p>Date sent: {selected.transfer_date ?? "—"}</p>
                  {selected.slip_path ? (
                    <Button className="mt-3" size="sm" onClick={() => openSlip(selected)}>
                      Open payment slip
                    </Button>
                  ) : (
                    <p className="mt-2 text-muted-foreground">No slip uploaded.</p>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}
