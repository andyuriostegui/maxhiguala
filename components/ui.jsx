import Image from "next/image";
import { media } from "../data/site";

export function GoldButton({
  as: Tag = "button",
  variant = "solid",
  className = "min-h-12 px-7 text-[0.68rem]",
  children,
  ...props
}) {
  const styles =
    variant === "outline"
      ? "bg-transparent text-gold ring-1 ring-gold/50 hover:bg-gold hover:text-ink"
      : "bg-gold text-ink hover:bg-[#d4b98c] hover:shadow-[0_12px_32px_rgba(200,169,126,0.28)]";

  return (
    <Tag
      className={`inline-flex items-center justify-center font-sans font-semibold tracking-[0.2em] uppercase transition duration-300 disabled:cursor-not-allowed disabled:opacity-45 ${styles} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function GhostLink({ as: Tag = "a", className = "", children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center gap-3 font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase transition duration-300 hover:text-cream ${className}`}
      {...props}
    >
      {children}
      <span className="h-px w-8 bg-gold/70 transition-all duration-300 group-hover:w-12" />
    </Tag>
  );
}

export function PlusIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.2v11.6M2.2 8h11.6" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}

export function CloseIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}

export function BrandMark({ align = "center", compact = false }) {
  return (
    <span className={`inline-flex ${align === "center" ? "items-center" : "items-start"}`}>
      <Image
        src={media.logo}
        alt="El Maxhi Restaurante & Bar"
        width={925}
        height={583}
        priority={compact}
        className={compact ? "h-11 w-auto sm:h-12 lg:h-14" : "h-[4.75rem] w-auto sm:h-20"}
      />
    </span>
  );
}

export function SectionKicker({ children, className = "" }) {
  return (
    <p className={`flex items-center gap-3 font-sans text-[0.68rem] font-semibold tracking-[0.22em] uppercase ${className}`}>
      <span className="h-px w-7 bg-gold" />
      {children}
    </p>
  );
}

export function CornerFrame({ className = "" }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-6 ${className}`}>
      <i className="absolute top-0 left-0 h-10 w-10 border-t border-l border-gold/40" />
      <i className="absolute top-0 right-0 h-10 w-10 border-t border-r border-gold/40" />
      <i className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-gold/40" />
      <i className="absolute right-0 bottom-0 h-10 w-10 border-b border-r border-gold/40" />
    </span>
  );
}
