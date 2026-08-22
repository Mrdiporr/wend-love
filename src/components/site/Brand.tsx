import { Link } from "@tanstack/react-router";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/70 font-display text-sm tracking-wide text-gold ${className}`}
    >
      WB
    </span>
  );
}

export function Lockup({
  tone = "ink",
  withDescriptor = true,
}: {
  tone?: "ink" | "cream";
  withDescriptor?: boolean;
}) {
  const nameTone = tone === "cream" ? "text-cocoa-foreground" : "text-foreground";
  const descTone = tone === "cream" ? "text-cocoa-foreground/60" : "text-muted-foreground";
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Wendy's Bakehouse — home">
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg ${nameTone}`}>
          Wendy&rsquo;s <span className="text-gold">·</span> Bakehouse
        </span>
        {withDescriptor && (
          <span className={`eyebrow mt-1 text-[10px] ${descTone}`}>Cakes in Toronto</span>
        )}
      </span>
    </Link>
  );
}
