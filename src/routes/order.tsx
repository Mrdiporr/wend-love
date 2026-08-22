import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Copy, MessageCircle, RotateCcw } from "lucide-react";
import { BUSINESS, CATEGORIES, PRODUCTS } from "@/data/catalog";
import { PageHeader, Section } from "@/components/site/Bits";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TITLE = "Start an order — Wendy's Bakehouse, Cakes in Toronto";
const DESC =
  "Tell Wendy what you're celebrating and get a firm quote within 24 hours. Celebration cakes, cupcakes, meat pies, loaves and gift boxes for pickup in Etobicoke.";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): { product?: string } => {
    const p = search["product"];
    return typeof p === "string" && PRODUCTS.some((x) => x.slug === p) ? { product: p } : {};
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

type Form = {
  category: string;
  product: string;
  occasion: string;
  servings: string;
  flavour: string;
  designNotes: string;
  eventDate: string;
  fulfilment: "Pickup in Etobicoke" | "Delivery (quoted)";
  deliveryArea: string;
  pickupWindow: string;
  name: string;
  phone: string;
  email: string;
  budget: string;
  allergies: string;
  heardFrom: string;
};

const EMPTY: Form = {
  category: "",
  product: "",
  occasion: "",
  servings: "",
  flavour: "",
  designNotes: "",
  eventDate: "",
  fulfilment: "Pickup in Etobicoke",
  deliveryArea: "",
  pickupWindow: "",
  name: "",
  phone: "",
  email: "",
  budget: "",
  allergies: "",
  heardFrom: "",
};

const OCCASIONS = ["Birthday", "Wedding", "Baby shower", "Anniversary", "Naming ceremony", "Corporate", "Just because"];
const SERVINGS = ["Up to 10", "10–25", "25–50", "50+"];
const FLAVOURS = ["Vanilla", "Red Velvet", "Chocolate", "Cookies & Cream", "Coconut", "Strawberry", "Savoury / pies"];
const BUDGETS = ["Under $50", "$50–$100", "$100–$150", "$150–$300", "$300+"];
const WINDOWS = ["Morning", "Afternoon", "Evening", "Flexible"];
const SOURCES = ["Instagram", "TikTok", "Facebook", "Threads", "A friend", "Google", "Other"];

const STEP_TITLES = ["What are we baking", "When and where", "Your details", "Review and send"];

function Chips({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(active ? "" : o)}
            className={`rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-card hover:border-primary/50"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

function OrderPage() {
  const { product: presetSlug } = Route.useSearch();
  const preset = PRODUCTS.find((p) => p.slug === presetSlug);

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<Form>({
    ...EMPTY,
    product: preset?.name ?? "",
    category: preset ? (CATEGORIES.find((c) => c.id === preset.category)?.name ?? "") : "",
  });

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const reference = useMemo(
    () => `WB-${new Date().getFullYear().toString().slice(2)}${Math.floor(1000 + Math.random() * 9000)}`,
    [],
  );

  const blockers: Record<number, string | null> = {
    0: form.category ? null : "Pick a category to continue",
    1: form.eventDate
      ? form.fulfilment === "Delivery (quoted)" && !form.deliveryArea
        ? "Add your delivery area"
        : null
      : "Choose the date you need it",
    2: form.name.trim() && form.phone.trim() ? null : "Your name and phone number are needed for a quote",
    3: null,
  };
  const blocker = blockers[step] ?? null;

  const brief = useMemo(() => {
    const lines = [
      `Wendy's Bakehouse order enquiry — ${reference}`,
      "",
      `Category: ${form.category || "—"}`,
      form.product ? `Item: ${form.product}` : null,
      form.occasion ? `Occasion: ${form.occasion}` : null,
      form.servings ? `Servings: ${form.servings}` : null,
      form.flavour ? `Flavour: ${form.flavour}` : null,
      form.designNotes ? `Design notes: ${form.designNotes}` : null,
      "",
      `Date needed: ${form.eventDate || "—"}`,
      `Fulfilment: ${form.fulfilment}`,
      form.fulfilment === "Delivery (quoted)" && form.deliveryArea
        ? `Delivery area: ${form.deliveryArea}`
        : null,
      form.pickupWindow ? `Preferred window: ${form.pickupWindow}` : null,
      "",
      `Name: ${form.name || "—"}`,
      `Phone: ${form.phone || "—"}`,
      form.email ? `Email: ${form.email}` : null,
      form.budget ? `Budget: ${form.budget}` : null,
      form.allergies ? `Allergies: ${form.allergies}` : null,
      form.heardFrom ? `Found via: ${form.heardFrom}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  }, [form, reference]);

  const waHref = `${BUSINESS.whatsapp}?text=${encodeURIComponent(brief)}`;

  if (sent) {
    return (
      <>
        <PageHeader
          eyebrow={`Reference ${reference}`}
          title="Your brief is ready to send."
          lead="Here is exactly what happens next, so nothing is left hanging."
        />
        <Section>
          <div className="grid gap-10 md:grid-cols-12">
            <ol className="space-y-6 md:col-span-7">
              {[
                ["I reply with a firm quote", "Within 24 hours, on the number you gave me, with the exact price and confirmation that your date is free."],
                ["Pay to hold your date", "Payment secures the slot. Dates are held in the order they are paid for."],
                [
                  form.fulfilment === "Delivery (quoted)" ? "Delivery is scheduled" : "Collect in Etobicoke",
                  form.fulfilment === "Delivery (quoted)"
                    ? `I quote delivery to ${form.deliveryArea || "your area"} and confirm a drop-off time for ${form.eventDate || "your date"}.`
                    : `Pickup address is released on confirmation. Collect on ${form.eventDate || "your date"}${form.pickupWindow ? `, ${form.pickupWindow.toLowerCase()}` : ""}.`,
                ],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 border-t border-border pt-5">
                  <span className="font-display text-2xl text-gold">0{i + 1}</span>
                  <div>
                    <h2 className="font-display text-xl">{t}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="md:col-span-5">
              <div className="rounded-lg border border-border bg-secondary p-6">
                <h2 className="eyebrow text-muted-foreground">Your brief</h2>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm">{brief}</pre>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Send on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(brief);
                      toast.success("Brief copied — paste it into a text or email.");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-input px-5 py-3 text-sm font-semibold"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copy the brief
                  </button>
                  <a
                    href={`tel:+${BUSINESS.phoneE164}`}
                    className="text-center text-sm font-semibold underline decoration-gold decoration-2 underline-offset-4"
                  >
                    Or call {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY);
                  setStep(0);
                  setSent(false);
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Start another order
              </button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Step ${step + 1} of 4`}
        title={STEP_TITLES[step]!}
        lead="Four short steps. No account, no payment here — you get a firm quote back within 24 hours."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <ol className="hidden md:col-span-3 md:block" aria-label="Progress">
            {STEP_TITLES.map((t, i) => (
              <li
                key={t}
                className={`border-l-2 py-3 pl-4 text-sm ${
                  i === step
                    ? "border-primary font-semibold text-foreground"
                    : i < step
                      ? "border-gold text-muted-foreground"
                      : "border-border text-muted-foreground"
                }`}
              >
                <span className="eyebrow mr-2 text-[10px] text-gold">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>

          <form
            className="md:col-span-9"
            onSubmit={(e) => {
              e.preventDefault();
              if (!blocker) setStep((s) => Math.min(3, s + 1));
            }}
          >
            {step === 0 && (
              <div className="space-y-8">
                <Field label="What are we baking?" hint="Pick the closest category.">
                  <Chips
                    name="Category"
                    options={CATEGORIES.map((c) => c.name)}
                    value={form.category}
                    onChange={(v) => set("category", v)}
                  />
                </Field>
                <Field label="A specific item (optional)" htmlFor="product">
                  <select
                    id="product"
                    value={form.product}
                    onChange={(e) => set("product", e.target.value)}
                    className="h-11 w-full rounded-sm border border-input bg-card px-3 text-sm"
                  >
                    <option value="">No preference yet</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name} — {p.priceBand}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Occasion">
                  <Chips name="Occasion" options={OCCASIONS} value={form.occasion} onChange={(v) => set("occasion", v)} />
                </Field>
                <Field label="How many people?">
                  <Chips name="Servings" options={SERVINGS} value={form.servings} onChange={(v) => set("servings", v)} />
                </Field>
                <Field label="Flavour">
                  <Chips name="Flavour" options={FLAVOURS} value={form.flavour} onChange={(v) => set("flavour", v)} />
                </Field>
                <Field label="Design notes" htmlFor="designNotes" hint="Colours, theme, lettering, a photo you've seen.">
                  <Textarea
                    id="designNotes"
                    rows={4}
                    value={form.designNotes}
                    onChange={(e) => set("designNotes", e.target.value)}
                    placeholder="Burgundy and gold, name on top, no fondant please."
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <Field
                  label="Date you need it"
                  htmlFor="eventDate"
                  hint="Minimum 3 days for pastries and cupcakes, 5–7 days for custom cakes, 4–8 weeks for tiered cakes."
                >
                  <Input
                    id="eventDate"
                    type="date"
                    min={minDate()}
                    value={form.eventDate}
                    onChange={(e) => set("eventDate", e.target.value)}
                    className="max-w-xs"
                  />
                </Field>
                <Field label="Pickup or delivery">
                  <Chips
                    name="Fulfilment"
                    options={["Pickup in Etobicoke", "Delivery (quoted)"]}
                    value={form.fulfilment}
                    onChange={(v) => set("fulfilment", (v || "Pickup in Etobicoke") as Form["fulfilment"])}
                  />
                </Field>
                {form.fulfilment === "Delivery (quoted)" && (
                  <Field label="Delivery area" htmlFor="deliveryArea" hint="Neighbourhood or postal code — delivery is quoted by distance.">
                    <Input
                      id="deliveryArea"
                      value={form.deliveryArea}
                      onChange={(e) => set("deliveryArea", e.target.value)}
                      placeholder="Mississauga, L5B"
                      className="max-w-sm"
                    />
                  </Field>
                )}
                <Field label="Preferred window">
                  <Chips name="Window" options={WINDOWS} value={form.pickupWindow} onChange={(v) => set("pickupWindow", v)} />
                </Field>
                <p className="rounded-sm border border-border bg-secondary p-4 text-sm text-muted-foreground">
                  The exact Etobicoke pickup address is shared once your date is confirmed and paid for.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name">
                    <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                  </Field>
                  <Field label="Phone (WhatsApp preferred)" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="416 000 0000"
                      required
                    />
                  </Field>
                </div>
                <Field label="Email (optional)" htmlFor="email">
                  <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="max-w-sm" />
                </Field>
                <Field label="Budget" hint="Helps me quote something you'll actually say yes to.">
                  <Chips name="Budget" options={BUDGETS} value={form.budget} onChange={(v) => set("budget", v)} />
                </Field>
                <Field
                  label="Allergies or dietary notes"
                  htmlFor="allergies"
                  hint="One kitchen handling wheat, dairy, egg and nuts — tell me and I'll be straight with you."
                >
                  <Textarea id="allergies" rows={3} value={form.allergies} onChange={(e) => set("allergies", e.target.value)} />
                </Field>
                <Field label="How did you find me?">
                  <Chips name="Source" options={SOURCES} value={form.heardFrom} onChange={(v) => set("heardFrom", v)} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="eyebrow text-muted-foreground">Your brief — {reference}</h2>
                  <dl className="mt-5 divide-y divide-border">
                    {[
                      ["Category", form.category],
                      ["Item", form.product],
                      ["Occasion", form.occasion],
                      ["Servings", form.servings],
                      ["Flavour", form.flavour],
                      ["Design notes", form.designNotes],
                      ["Date needed", form.eventDate],
                      ["Fulfilment", form.fulfilment],
                      ["Delivery area", form.fulfilment === "Delivery (quoted)" ? form.deliveryArea : ""],
                      ["Window", form.pickupWindow],
                      ["Name", form.name],
                      ["Phone", form.phone],
                      ["Email", form.email],
                      ["Budget", form.budget],
                      ["Allergies", form.allergies],
                      ["Found via", form.heardFrom],
                    ]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                          <dt className="w-40 shrink-0 text-sm text-muted-foreground">{k}</dt>
                          <dd className="text-sm">{v}</dd>
                        </div>
                      ))}
                  </dl>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-5 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-4"
                  >
                    Edit any of this
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground sm:w-auto"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Confirm and get next steps
                </button>
              </div>
            )}

            {step < 3 && (
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 rounded-sm border border-input px-5 py-3 text-sm font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!!blocker}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {blocker && <p className="text-sm text-muted-foreground">{blocker}</p>}
              </div>
            )}
          </form>
        </div>

        <p className="mt-14 text-sm text-muted-foreground">
          Prefer to just talk?{" "}
          <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer noopener" className="font-semibold underline decoration-gold decoration-2 underline-offset-4">
            WhatsApp {BUSINESS.phoneDisplay}
          </a>{" "}
          or read the{" "}
          <Link to="/pricing" className="font-semibold underline decoration-gold decoration-2 underline-offset-4">
            price bands and lead times
          </Link>{" "}
          first.
        </p>
      </Section>
    </>
  );
}
