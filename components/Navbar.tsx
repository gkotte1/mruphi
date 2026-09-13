"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/icons";
import {
  AI_MODULES,
  WHO_WE_SERVE,
  type NavGroup,
  type NavItem,
} from "@/lib/nav-data";
import "./site-chrome.css";

const LOGIN = "https://murphi.murphiconnect.ai/login";

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      ref={barRef}
      className="site-chrome"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #E3E3E3",
      }}
    >
      <div
        className="hl-nav-inner"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" className="hl-nav-logo" style={{ display: "flex", alignItems: "center" }}>
          <Logo height={30} priority />
        </Link>

        <nav className="hl-nav-links" aria-label="Primary">
          <NavDropdown
            group={AI_MODULES}
            width={480}
            open={open === AI_MODULES.label}
            onOpen={() => setOpen(AI_MODULES.label)}
            onClose={() =>
              setOpen((current) =>
                current === AI_MODULES.label ? null : current,
              )
            }
          />
          <NavDropdown
            group={WHO_WE_SERVE}
            width={440}
            open={open === WHO_WE_SERVE.label}
            onOpen={() => setOpen(WHO_WE_SERVE.label)}
            onClose={() =>
              setOpen((current) =>
                current === WHO_WE_SERVE.label ? null : current,
              )
            }
          />
          <Link href="/events/" className="hl-nav-link">
            Events
          </Link>
        </nav>

        <div className="hl-nav-actions">
          <DownloadAppLink className="hl-nav-download" />
          <button
            type="button"
            className="hl-nav-toggle hl-nav-link"
            aria-expanded={mobileOpen}
            aria-controls="hl-mobile-nav"
            onClick={() => {
              setOpen(null);
              setMobileOpen((v) => !v);
            }}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
          <a
            href={LOGIN}
            className="hl-nav-cta"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#F5F5F5",
              background: "#007EFF",
              padding: "10px 20px",
              borderRadius: 4,
            }}
          >
            Sign Up / Sign In
          </a>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="hl-mobile-nav"
          className="hl-nav-mobile"
          style={{
            borderTop: "1px solid #E3E3E3",
            background: "#ffffff",
            padding: "20px 32px 28px",
          }}
        >
          <MobileGroup
            group={AI_MODULES}
            onNavigate={() => setMobileOpen(false)}
          />
          <MobileGroup
            group={WHO_WE_SERVE}
            onNavigate={() => setMobileOpen(false)}
          />
          <Link
            href="/events/"
            className="hl-nav-link"
            onClick={() => setMobileOpen(false)}
            style={{ display: "inline-flex", marginBottom: 22 }}
          >
            Events
          </Link>
          <DownloadAppLink
            className="hl-nav-link"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
}

function DownloadAppLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href="/download-app/" className={className} onClick={onClick}>
      <Icon name="download" width={16} height={16} className="shrink-0" />
      Download App
    </Link>
  );
}

function NavDropdown({
  group,
  width,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  width: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const id = `hl-menu-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
  const live = group.items.filter((item) => !item.soon);
  const soon = group.items.filter((item) => item.soon);

  return (
    <div
      ref={wrapRef}
      className="hl-nav-drop"
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
        className="hl-nav-link"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {group.label}
        <Icon
          name="chevron"
          width={13}
          height={13}
          style={{
            marginTop: 1,
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      <div
        id={id}
        className="hl-nav-menu-slot"
        style={{
          width,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="hl-nav-menu">
          <MenuList items={live} tabbable={open} onNavigate={onClose} />
          {soon.length > 0 ? (
            <>
              <div className="hl-nav-soon-row" aria-hidden>
                <span className="hl-nav-soon-line" />
                <span className="hl-nav-soon-label">Launching Soon</span>
                <span className="hl-nav-soon-line" />
              </div>
              <MenuList items={soon} tabbable={open} onNavigate={onClose} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MenuList({
  items,
  tabbable,
  onNavigate,
}: {
  items: readonly NavItem[];
  tabbable: boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="hl-nav-menu-list">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          tabIndex={tabbable ? undefined : -1}
          onClick={onNavigate}
        >
          <span className="hl-nav-item-icon" aria-hidden>
            <Icon name={item.icon} width={17} height={17} />
          </span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const live = group.items.filter((item) => !item.soon);
  const soon = group.items.filter((item) => item.soon);

  return (
    <div style={{ marginBottom: 22 }}>
      <p
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: "#606060",
          marginBottom: 12,
        }}
      >
        {group.label}
      </p>
      <div className="hl-nav-menu-list hl-nav-mobile-list">
        {live.map((item) => (
          <MobileItem key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>
      {soon.length > 0 ? (
        <>
          <div className="hl-nav-soon-row" aria-hidden>
            <span className="hl-nav-soon-line" />
            <span className="hl-nav-soon-label">Launching Soon</span>
            <span className="hl-nav-soon-line" />
          </div>
          <div className="hl-nav-menu-list hl-nav-mobile-list">
            {soon.map((item) => (
              <MobileItem key={item.href} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function MobileItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  return (
    <Link href={item.href} onClick={onNavigate}>
      <span className="hl-nav-item-icon" aria-hidden>
        <Icon name={item.icon} width={17} height={17} />
      </span>
      {item.label}
    </Link>
  );
}
