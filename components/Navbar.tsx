"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { NAV_GROUPS, type NavGroup, type NavItem } from "@/lib/nav-data";
import { cn } from "@/lib/cn";
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function Navbar({ banner = false }: { banner?: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ResizableNavbar className={banner ? "top-[42px]" : "top-0"}>
      <NavBody className="px-4">
        <NavbarLogo />

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center min-[901px]:flex">
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

        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton
            href="/download-app/"
            as={Link}
            variant="secondary"
            className="gap-2"
          >
            <Icon name="download" width={16} height={16} className="shrink-0" />
            Download App
          </NavbarButton>
          <NavbarButton
            href="https://murphi.murphiconnect.ai/login"
            variant="primary"
          >
            Sign Up / Sign In
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader className="px-2">
          <NavbarLogo className="mr-0" />
          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          {NAV_GROUPS.map((group) => (
            <section key={group.label} className="w-full">
              <h2 className="type-label mb-3 px-1 text-brand-dark/75">
                {group.label}
              </h2>
              <div className="grid gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
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

          <div className="mt-2 grid w-full gap-3 border-t border-grey-mid pt-6">
            <NavbarButton
              href="/download-app/"
              as={Link}
              variant="secondary"
              className="w-full justify-start gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <Icon name="download" width={17} height={17} className="shrink-0" />
              Download App
            </NavbarButton>
            <NavbarButton
              href="https://murphi.murphiconnect.ai/login"
              variant="primary"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up / Sign In
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}

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
          "flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[14.5px] font-semibold transition-colors duration-200",
          open ? "bg-grey-bg text-brand-dark" : "text-ink hover:text-brand-dark",
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
        className={cn(
          "absolute top-full left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2 transition-opacity duration-150",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        style={{ width: group.width }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-[22px] border border-nav-border bg-white p-3.5 shadow-[0_28px_64px_-30px_rgba(0,86,173,0.5)]">
          <MenuGrid columns={group.columns} items={live} tabbable={open} />

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
