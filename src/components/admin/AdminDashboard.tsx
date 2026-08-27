import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { adminDashboard } from "@/lib/admin.functions";
import { statusLabel } from "@/lib/order-status";
import { formatMoney } from "@/lib/shop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-[1rem] border border-border bg-card p-4">
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function AdminDashboard() {
  const dashboard = useServerFn(adminDashboard);
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => dashboard(),
  });

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-[1rem]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[1rem] border border-border p-6">
        <p className="text-sm text-muted-foreground">
          {(error as Error)?.message ?? "Could not load the dashboard."}
        </p>
        <Button className="mt-3" size="sm" variant="outline" onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const { counts, dueCents, collectedCents, totalOrders, bestSellers, recent, upcoming } = data;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders today" value={counts.today} hint={`${totalOrders} all time`} />
        <Stat label="Awaiting verification" value={counts.pendingVerification} hint="Bank transfers to check" />
        <Stat label="New orders" value={counts.needsAttention} hint="Not confirmed yet" />
        <Stat label="Baking" value={counts.baking} hint={`${counts.ready} ready for collection`} />
        <Stat label="Upcoming pickups" value={counts.upcomingPickup} />
        <Stat label="Upcoming deliveries" value={counts.upcomingDelivery} />
        <Stat label="Amount due" value={formatMoney(dueCents)} hint="Unpaid live orders" />
        <Stat label="Collected" value={formatMoney(collectedCents)} hint="Paid live orders" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[1rem] border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl">Recent orders</h2>
            <Link to="/admin/orders" className="text-sm font-semibold text-primary">
              All orders
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {recent.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 border-b border-border pb-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.reference}</p>
                    <p className="truncate text-xs text-muted-foreground">{o.customer_name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary">{statusLabel(o.status)}</Badge>
                    <span>{formatMoney(o.due_now_cents)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[1rem] border border-border bg-card p-5">
          <h2 className="font-display text-xl">Upcoming dates</h2>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Nothing booked ahead.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {upcoming.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 border-b border-border pb-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.pickup_date ?? "—"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.customer_name} · {o.fulfilment}
                    </p>
                  </div>
                  <Badge variant="outline">{statusLabel(o.status)}</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-[1rem] border border-border bg-card p-5">
        <h2 className="font-display text-xl">Best sellers</h2>
        {bestSellers.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing ordered yet.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {bestSellers.map((b) => (
              <li key={b.name} className="flex justify-between gap-4">
                <span className="truncate">{b.name}</span>
                <span className="shrink-0 text-muted-foreground">{b.quantity} sold</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
