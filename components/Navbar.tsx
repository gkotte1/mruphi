"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import { NAV_GROUPS, type NavGroup, type NavItem } from "@/lib/nav-data";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll state - purely visual: past a small threshold the white bar takes a
     faint translucency, a light blur and a lift. Nothing else changes. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes whichever surface is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Body scroll locks while the mobile sheet is open, and is restored on close. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /* The sheet is a mobile-only surface - close it if the viewport grows. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        /* White at rest. Once the page moves underneath, the bar takes a
           barely-there translucency and a light blur - enough to feel like it
           sits above the content, not enough to read through. */
        scrolled
          ? "border-b border-nav-border bg-white/92 shadow-nav backdrop-blur-[6px]"
          : "border-b border-nav-border bg-white",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[80px] max-w-[1280px] items-center gap-8 px-8 max-1024:gap-6 max-1024:px-6 max-600:px-4"
      >
        {/* Equal flanks, so the navigation sits on the true centre line. */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="shrink-0 rounded-md transition-opacity duration-200 hover:opacity-80"
            aria-label="Murphi.ai - home"
          >
            <Logo height={28} priority />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="flex shrink-0 items-center gap-1 max-900:hidden">
          {NAV_GROUPS.map((group) => (
            <MegaMenu
              key={group.label}
              group={group}
              open={openMenu === group.label}
              onOpen={() => setOpenMenu(group.label)}
              onClose={() =>
                setOpenMenu((current) =>
                  current === group.label ? null : current,
                )
              }
            />
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 max-900:hidden">
          <NavLink href="/download-app/" icon="download">
            Download App
          </NavLink>
          <a
            href="https://murphi.murphiconnect.ai/login"
            className="rounded-card bg-brand px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-brand-dark"
          >
            Sign Up / Sign In
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="ml-auto hidden size-11 items-center justify-center rounded-card border border-nav-border bg-white text-brand-dark transition-colors duration-200 hover:border-brand-border hover:bg-brand-tint max-900:flex"
        >
          <Icon name={mobileOpen ? "close" : "menu"} width={20} height={20} />
        </button>
      </nav>

      <MobileSheet open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}

/* ─────────────────────────────────────────────────────────── */

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: IconName;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-card px-3.5 py-2.5 text-[14.5px] font-semibold whitespace-nowrap text-brand transition-colors duration-200 hover:text-brand-dark"
    >
      {icon ? (
        <Icon name={icon} width={16} height={16} className="shrink-0" />
      ) : null}
      {children}
    </Link>
  );
}

/**
 * A floating menu card under its trigger. Opens on hover *and* on focus so
 * keyboard users reach it; closes on pointer-leave, Escape, and on focus
 * leaving the group. Transitions opacity only.
 */
function MegaMenu({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const id = `menu-${group.label.replace(/\s+/g, "-").toLowerCase()}`;

  /* Order is untouched; the not-yet-live ones are simply held back so they can
     sit under their own rule. */
  const live = group.items.filter((item) => !item.soon);
  const soon = group.items.filter((item) => item.soon);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          "flex items-center gap-1.5 rounded-card px-3.5 py-2.5 text-[14.5px] font-semibold transition-colors duration-200",
          open ? "text-brand-dark" : "text-brand hover:text-brand-dark",
        )}
      >
        {group.label}
        <Icon
          name="chevron"
          width={13}
          height={13}
          className={cn(
            "mt-px transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={id}
        /* Centred under its trigger, and capped so it can never run off the
           viewport. pt-2 keeps the hover bridge unbroken. */
        className={cn(
          "absolute top-full left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2 transition-opacity duration-150",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        style={{ width: group.width }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-[22px] border border-nav-border bg-white/92 p-3.5 shadow-[0_28px_64px_-30px_rgba(0,86,173,0.5)] backdrop-blur-[10px]">
          <MenuGrid
            columns={group.columns}
            items={live}
            tabbable={open}
          />

          {/* What is coming, kept below a rule so it never mixes with what
              is live today. Only a group that has such items shows this. */}
          {soon.length > 0 ? (
            <>
              <div className="my-3.5 flex items-center gap-3 px-3">
                <span className="h-px flex-1 bg-nav-border" aria-hidden />
                <span className="type-micro shrink-0 text-grey-dk/45">
                  Launching Soon
                </span>
                <span className="h-px flex-1 bg-nav-border" aria-hidden />
              </div>

              <MenuGrid columns={group.columns} items={soon} tabbable={open} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ item, tabbable }: { item: NavItem; tabbable: boolean }) {
  return (
    <Link
      href={item.href}
      tabIndex={tabbable ? undefined : -1}
      className="group flex items-start gap-3 rounded-panel p-3.5 transition-colors duration-200 hover:bg-brand-tint/70"
    >
      <span className="mt-0.5 flex size-[38px] shrink-0 items-center justify-center rounded-[13px] border border-brand-border bg-brand-tint text-brand-dark transition-all duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
        <Icon name={item.icon} width={18} height={18} />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {item.index ? (
            <span className="type-micro text-brand/70">{item.index}</span>
          ) : null}
          <span className="text-[13.5px] font-bold leading-snug tracking-[-0.01em] text-ink">
            {item.label}
          </span>
          {item.soon ? <SoonBadge /> : null}
        </span>
        <span className="mt-1 block text-[12.5px] leading-snug text-grey-dk/85">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

/** One run of menu items, in the group's own column count. */
function MenuGrid({
  columns,
  items,
  tabbable,
}: {
  columns: number;
  items: readonly NavItem[];
  tabbable: boolean;
}) {
  return (
    <div
      className={cn("grid gap-1.5", columns === 2 ? "grid-cols-2" : "grid-cols-1")}
    >
      {items.map((item) => (
        <MenuItem key={item.label} item={item} tabbable={tabbable} />
      ))}
    </div>
  );
}

function SoonBadge() {
  return (
    <span className="rounded-full border border-brand-border bg-white px-2 py-[3px] text-[9.5px] font-bold uppercase leading-none tracking-[0.08em] text-brand-dark">
      Soon
    </span>
  );
}

/* ─────────────────────────────────────────────────────────── */

/** Full-height blurred sheet below the bar; every link keeps its icon tile. */
function MobileSheet({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id="mobile-nav"
      hidden={!open}
      className="hidden max-900:absolute max-900:inset-x-0 max-900:top-[80px] max-900:block max-900:h-[calc(100dvh-80px)] max-900:overflow-y-auto max-900:border-t max-900:border-nav-border max-900:bg-white/95 max-900:backdrop-blur-[10px]"
    >
      <div className="px-6 pb-16 pt-6 max-600:px-4">
        {NAV_GROUPS.map((group) => (
          <section key={group.label} className="mb-7">
            <h2 className="type-label mb-3 px-1 text-brand-dark/75">
              {group.label}
            </h2>
            <div className="grid gap-1">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-start gap-3 rounded-panel border border-transparent p-3 transition-colors duration-200 hover:border-brand-border hover:bg-brand-tint/60"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-tile border border-brand-border bg-brand-tint text-brand-dark">
                    <Icon name={item.icon} width={19} height={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {item.index ? (
                        <span className="type-micro text-brand/70">
                          {item.index}
                        </span>
                      ) : null}
                      <span className="text-[14px] font-bold tracking-[-0.01em] text-ink">
                        {item.label}
                      </span>
                      {item.soon ? <SoonBadge /> : null}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-grey-dk/85">
                      {item.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-2 grid gap-3 border-t border-grey-mid pt-6">
          <Link
            href="/download-app/"
            onClick={onNavigate}
            className="flex items-center gap-2 rounded-card px-1 py-2 text-[15px] font-bold text-brand"
          >
            <Icon name="download" width={17} height={17} className="shrink-0" />
            Download App
          </Link>
          <a
            href="https://murphi.murphiconnect.ai/login"
            onClick={onNavigate}
            className="w-full rounded-card bg-brand px-4 py-3 text-center text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
          >
            Sign Up / Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
