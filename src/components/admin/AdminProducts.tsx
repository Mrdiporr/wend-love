import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { adminDeleteProduct, adminListProducts, adminSaveProduct } from "@/lib/admin.functions";
import { formatMoney, imageSrc } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Catalog = Awaited<ReturnType<typeof adminListProducts>>;
type ProductRow = Catalog["products"][number];

type Draft = {
  id?: string;
  slug: string;
  name: string;
  category_id: string | null;
  short: string;
  description: string;
  price: string;
  deposit: string;
  lead_time: string;
  serves: string;
  image_url: string;
  available: boolean;
  sort_order: number;
};

function toDraft(p?: ProductRow): Draft {
  return {
    ...(p ? { id: p.id } : {}),
    slug: p?.slug ?? "",
    name: p?.name ?? "",
    category_id: p?.category_id ?? null,
    short: p?.short ?? "",
    description: p?.description ?? "",
    price: p?.price_cents != null ? (p.price_cents / 100).toString() : "",
    deposit: p?.deposit_cents != null ? (p.deposit_cents / 100).toString() : "",
    lead_time: p?.lead_time ?? "",
    serves: p?.serves ?? "",
    image_url: p?.image_url ?? "",
    available: p?.available ?? true,
    sort_order: p?.sort_order ?? 0,
  };
}

function toCents(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

export function AdminProducts() {
  const listProducts = useServerFn(adminListProducts);
  const saveProduct = useServerFn(adminSaveProduct);
  const deleteProduct = useServerFn(adminDeleteProduct);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => listProducts(),
  });

  const [draft, setDraft] = useState<Draft | null>(null);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    void queryClient.invalidateQueries({ queryKey: ["catalog"] });
  };

  const save = useMutation({
    mutationFn: (d: Draft) =>
      saveProduct({
        data: {
          ...(d.id ? { id: d.id } : {}),
          slug: d.slug.trim(),
          name: d.name.trim(),
          category_id: d.category_id,
          short: d.short.trim(),
          description: d.description.trim(),
          price_cents: toCents(d.price),
          deposit_cents: toCents(d.deposit),
          lead_time: d.lead_time.trim(),
          serves: d.serves.trim() || null,
          image_url: d.image_url.trim() || null,
          available: d.available,
          sort_order: d.sort_order,
        },
      }),
    onSuccess: () => {
      toast.success("Product saved.");
      setDraft(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { id } }),
    onSuccess: () => {
      toast.success("Product removed.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[1rem]" />
        ))}
      </div>
    );
  }

  const categories = data?.categories ?? [];

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setDraft(toDraft())}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> New product
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data?.products ?? []).map((p) => (
          <div key={p.id} className="rounded-[1rem] border border-border bg-card p-4">
            <img
              src={imageSrc(p)}
              alt=""
              className="aspect-[4/3] w-full rounded-[0.75rem] object-cover"
            />
            <div className="mt-3 flex items-start justify-between gap-2">
              <h3 className="font-display text-lg leading-tight">{p.name}</h3>
              <Badge variant={p.available ? "default" : "outline"}>
                {p.available ? "Live" : "Hidden"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.price_cents != null ? formatMoney(p.price_cents) : "Quoted"}
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDraft(toDraft(p))}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (confirm(`Remove ${p.name}?`)) remove.mutate(p.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {draft && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {draft.id ? "Edit product" : "New product"}
                </DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  save.mutate(draft);
                }}
              >
                <Field label="Name">
                  <Input
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Slug (web address)">
                  <Input
                    value={draft.slug}
                    onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    required
                  />
                </Field>
                <Field label="Collection">
                  <Select
                    value={draft.category_id ?? "none"}
                    onValueChange={(v) => setDraft({ ...draft, category_id: v === "none" ? null : v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No collection</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Short line">
                  <Input
                    value={draft.short}
                    onChange={(e) => setDraft({ ...draft, short: e.target.value })}
                  />
                </Field>
                <Field label="Description">
                  <Textarea
                    rows={4}
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (CAD, blank = quoted)">
                    <Input
                      inputMode="decimal"
                      value={draft.price}
                      onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                    />
                  </Field>
                  <Field label="Deposit (CAD)">
                    <Input
                      inputMode="decimal"
                      value={draft.deposit}
                      onChange={(e) => setDraft({ ...draft, deposit: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Lead time">
                    <Input
                      value={draft.lead_time}
                      onChange={(e) => setDraft({ ...draft, lead_time: e.target.value })}
                    />
                  </Field>
                  <Field label="Serves">
                    <Input
                      value={draft.serves}
                      onChange={(e) => setDraft({ ...draft, serves: e.target.value })}
                    />
                  </Field>
                </div>
                <Field label="Image URL">
                  <Input
                    value={draft.image_url}
                    onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                  />
                </Field>
                <div className="grid grid-cols-2 items-end gap-4">
                  <Field label="Sort order">
                    <Input
                      type="number"
                      value={draft.sort_order}
                      onChange={(e) =>
                        setDraft({ ...draft, sort_order: Number(e.target.value) || 0 })
                      }
                    />
                  </Field>
                  <label className="flex items-center gap-3 pb-2 text-sm font-semibold">
                    <Switch
                      checked={draft.available}
                      onCheckedChange={(v) => setDraft({ ...draft, available: v })}
                    />
                    Visible on the site
                  </label>
                </div>
                <Button type="submit" disabled={save.isPending} className="w-full">
                  {save.isPending ? "Saving…" : "Save product"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
