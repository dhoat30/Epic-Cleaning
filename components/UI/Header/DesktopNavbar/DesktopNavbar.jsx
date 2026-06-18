"use client";
import styles from "./DesktopNavbar.module.scss";
import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { headerLinks } from "@/utils/headerLinks";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Paper from "@mui/material/Paper";
import { usePathname } from "next/navigation";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function DesktopNavbar() {
  const [showMenu, setShowMenu] = useState(-1);
  const menuRef = useRef(null);
  const hoverTimerRef = useRef(null);
  // router
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
  };
  // drop down logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.clearTimeout(hoverTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setShowMenu(-1);
  }, [pathname]);

  const showDropdown = (index) => {
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      setShowMenu(index);
    }, 100);
  };

  const hideDropdown = () => {
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      setShowMenu(-1);
    }, 180);
  };

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    window.clearTimeout(hoverTimerRef.current);
    setShowMenu(index === showMenu ? -1 : index);
  };

  // render menu items
  const menuItems = headerLinks.map((item, index) => {
    return (
      <Box
        className={styles.menuItem}
        component="li"
        key={index}
        onMouseLeave={item.subLinks ? hideDropdown : undefined}
        onMouseEnter={item.subLinks ? () => showDropdown(index) : undefined}
        onFocus={item.subLinks ? () => showDropdown(index) : undefined}
        onBlur={item.subLinks ? (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) hideDropdown();
        } : undefined}
      >
        <Link
          href={item.url}
          className={`${styles.menuLink} ${isActive(item.url) ? styles.active : ""}`}
          aria-haspopup={item.subLinks ? "menu" : undefined}
          aria-expanded={item.subLinks ? showMenu === index : undefined}
          onClick={item.subLinks ? (event) => toggleDropdown(event, index) : undefined}
          data-dropdown-toggle={item.subLinks ? "true" : undefined}
        >
          <Typography component="span" variant="body1" align="center">
            {item.label}
          </Typography>
          {item.subLinks && (
            <KeyboardArrowDownRoundedIcon
              className={`${styles.arrow} ${showMenu === index ? styles.arrowOpen : ""}`}
            />
          )}
        </Link>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            role="menu"
            className={`${styles.dropdown} ${showMenu === index ? styles.dropdownOpen : ""}`}
          >
            <li role="none" className={styles.viewAllItem}>
              <Link href={item.url} role="menuitem" className={styles.viewAllLink}>
                {item.label}
              </Link>
            </li>
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex} role="none">
                <Link href={subLink.url} role="menuitem" className={styles.subLink}>
                  {subLink.label}
                </Link>
              </li>
            ))}
          </Paper>
        )}
      </Box>
    );
  });
  return (
    <>
      <AppBarContainer position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="grid-links-wrapper" ref={menuRef}>
            {/* logo  */}
            <Link href="/">
              <Image
                src="/logo.png"
                width={107}
                height={50}
                alt="Epic Cleaning Logo"
                style={{ cursor: "pointer" }}
                priority={true}
                quality={100}
              />
            </Link>
            {/* menu */}
            <div className="links-wrapper">
              <Box
                component="ul"
                className="desktop-links"
              >
                {menuItems}
              </Box>
              <Link href="/get-a-quote">
                <Button size="large" variant="contained" >
                  GET A QUOTE
                   <ArrowForwardRoundedIcon aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </Toolbar>
        </Container>
      </AppBarContainer>
    </>
  );
}
export default DesktopNavbar;

const AppBarContainer = ({ className = "", ...props }) =>
  React.createElement(AppBar, {
    ...props,
    color: "inherit",
    elevation: 0,
    sx: { backgroundColor: "var(--light-surface-container-low)", boxShadow: "none", borderBottom: "1px solid var(--light-outline-variant)" },
    className: `${styles.appBarContainer} ${className}`.trim(),
  });
