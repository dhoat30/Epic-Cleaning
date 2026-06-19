"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { headerLinks } from "@/utils/headerLinks";
import styles from "./Header.module.scss";

const Drawer = dynamic(() => import("@mui/material/Drawer"), {
  ssr: false,
});

const quoteHref = "/get-a-quote";
const phoneNumber = process.env.NEXT_PUBLIC_PHONE;
const phoneHref = phoneNumber?.replace(/[^\d+]/g, "");

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const [desktopMenu, setDesktopMenu] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(-1);

  const isActive = (path) =>
    pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDesktopMenu(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.clearTimeout(hoverTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setDesktopMenu(-1);
    setMobileOpen(false);
    setMobileMenu(-1);
  }, [pathname]);

  const showDesktopDropdown = (index) => {
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setDesktopMenu(index), 90);
  };

  const hideDesktopDropdown = () => {
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setDesktopMenu(-1), 160);
  };

  const toggleDesktopDropdown = (event, index) => {
    event.preventDefault();
    window.clearTimeout(hoverTimerRef.current);
    setDesktopMenu((current) => (current === index ? -1 : index));
  };

  const handleMobileItemClick = (event, item, index) => {
    if (isExternalUrl(item.url)) {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();

    if (item.subLinks?.length) {
      setMobileMenu((current) => (current === index ? -1 : index));
      return;
    }

    router.push(item.url);
    setMobileOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      className={styles.appBar}
    >
      <Container maxWidth="xl" className={styles.container}>
        <Toolbar disableGutters className={styles.toolbar} ref={navRef}>
          <Link href="/" className={styles.logoLink} aria-label="Epic Cleaning home">
            <Image
              src="/logo.png"
              width={107}
              height={50}
              alt="Epic Cleaning Logo"
              priority
              quality={100}
              className={styles.logo}
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <ul className={styles.desktopList}>
              {headerLinks.map((item, index) => (
                <li
                  className={styles.desktopItem}
                  key={`${item.label}-${item.url}`}
                  onMouseEnter={item.subLinks ? () => showDesktopDropdown(index) : undefined}
                  onMouseLeave={item.subLinks ? hideDesktopDropdown : undefined}
                  onFocus={item.subLinks ? () => showDesktopDropdown(index) : undefined}
                  onBlur={
                    item.subLinks
                      ? (event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            hideDesktopDropdown();
                          }
                        }
                      : undefined
                  }
                >
                  <NavLink
                    item={item}
                    className={`${styles.desktopLink} ${
                      isActive(item.url) ? styles.desktopLinkActive : ""
                    }`}
                    aria-haspopup={item.subLinks ? "menu" : undefined}
                    aria-expanded={item.subLinks ? desktopMenu === index : undefined}
                    onClick={item.subLinks ? (event) => toggleDesktopDropdown(event, index) : undefined}
                    data-dropdown-toggle={item.subLinks ? "true" : undefined}
                  >
                    <span>{item.label}</span>
                    {item.subLinks && (
                      <KeyboardArrowDownRoundedIcon
                        className={`${styles.desktopArrow} ${
                          desktopMenu === index ? styles.desktopArrowOpen : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </NavLink>

                  {item.subLinks && (
                    <ul
                      className={`${styles.desktopDropdown} ${
                        desktopMenu === index ? styles.desktopDropdownOpen : ""
                      }`}
                      role="menu"
                    >
                      <li role="none" className={styles.desktopViewAllItem}>
                        <Link href={item.url} role="menuitem" className={styles.desktopViewAllLink}>
                          {item.label}
                        </Link>
                      </li>
                      {item.subLinks.map((subLink) => (
                        <li key={subLink.url} role="none">
                          <Link
                            href={subLink.url}
                            role="menuitem"
                            className={`${styles.desktopSubLink} ${
                              isActive(subLink.url) ? styles.desktopSubLinkActive : ""
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href={quoteHref} className={styles.quoteLink}>
              <Button size="large" variant="contained" className={styles.quoteButton}>
                GET A QUOTE
                <ArrowForwardRoundedIcon aria-hidden="true" />
              </Button>
            </Link>
            <IconButton
              className={styles.menuButton}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <MenuRoundedIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>

      {mobileOpen && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ className: styles.drawerPaper }}
          ModalProps={{ keepMounted: false }}
        >
          <div className={styles.mobilePanel}>
            <div className={styles.mobileHeader}>
              <Link href="/" className={styles.mobileLogoLink} onClick={() => setMobileOpen(false)}>
                <Image
                  src="/logo.png"
                  width={92}
                  height={43}
                  alt="Epic Cleaning Logo"
                  quality={100}
                />
              </Link>
              <IconButton
                className={styles.closeButton}
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              <ul className={styles.mobileList}>
                {headerLinks.map((item, index) => (
                  <li className={styles.mobileItem} key={`${item.label}-${item.url}`}>
                    <a
                      href={item.url}
                      className={`${styles.mobileParentLink} ${
                        isActive(item.url) ? styles.mobileParentActive : ""
                      }`}
                      onClick={(event) => handleMobileItemClick(event, item, index)}
                      aria-haspopup={item.subLinks ? "true" : undefined}
                      aria-expanded={item.subLinks ? mobileMenu === index : undefined}
                      data-dropdown-toggle={item.subLinks ? "true" : undefined}
                    >
                      <span>{item.label}</span>
                      {item.subLinks && (
                        <KeyboardArrowDownRoundedIcon
                          className={`${styles.mobileArrow} ${
                            mobileMenu === index ? styles.mobileArrowOpen : ""
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </a>

                    {item.subLinks && (
                      <ul
                        className={`${styles.mobileDropdown} ${
                          mobileMenu === index ? styles.mobileDropdownOpen : ""
                        }`}
                      >
                        <li>
                          <Link
                            href={item.url}
                            className={styles.mobileViewAllLink}
                            onClick={() => setMobileOpen(false)}
                          >
                            View all {item.label}
                          </Link>
                        </li>
                        {item.subLinks.map((subLink) => (
                          <li key={subLink.url}>
                            <Link
                              href={subLink.url}
                              className={`${styles.mobileSubLink} ${
                                isActive(subLink.url) ? styles.mobileSubLinkActive : ""
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileFooter}>
              <Link href={quoteHref} onClick={() => setMobileOpen(false)}>
                <Button variant="contained" size="large" className={styles.mobileQuoteButton}>
                  GET A QUOTE
                  <ArrowForwardRoundedIcon aria-hidden="true" />
                </Button>
              </Link>
              {phoneNumber && (
                <a className={styles.mobilePhoneLink} href={`tel:${phoneHref}`}>
                  <PhoneRoundedIcon aria-hidden="true" />
                  {phoneNumber}
                </a>
              )}
            </div>
          </div>
        </Drawer>
      )}
    </AppBar>
  );
}

function NavLink({ item, children, ...props }) {
  if (isExternalUrl(item.url)) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={item.url} {...props}>
      {children}
    </Link>
  );
}

function isExternalUrl(url = "") {
  return /^https?:\/\//i.test(url);
}
