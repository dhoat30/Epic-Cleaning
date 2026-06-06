"use client";
import React from "react";
import styles from "./MobileNavbar.module.scss";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "../../Icons/MenuIcon";
import Link from "next/link";
import ArrowIcon from "../../Icons/ArrowIcon";
import { headerLinks } from "@/utils/headerLinks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";

import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@mui/material/Drawer"));

export default function MobileNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(-1); // To track which submenu is open
  const pathname = usePathname();
  const router = useRouter(); // To programmatically navigate

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowMenu(-1);
  };

  const handleClick = (event, item, index) => {
    event.preventDefault();

    // Check if the link has sublinks
    if (item.subLinks && item.subLinks.length > 0) {
      // If the same submenu is open, navigate to the link
      if (showMenu === index) {
        router.push(item.url); // Navigate to the link
        handleDrawerClose(); // Close the drawer after navigation
      } else {
        // Open the submenu
        setShowMenu(index);
      }
    } else {
      // If no sublinks, just navigate and close the drawer
      router.push(item.url);
      handleDrawerClose();
    }
  };

  const menuItems = headerLinks.map((item, index) => {
    return (
      <li
        className="flex-auto text-center relative parent-list-item"
        key={index}
      >
        <a
          href={item.url}
          className={`${styles.parentLink} ${pathname === item.url ? styles.active : ""}`}
          onClick={(event) => handleClick(event, item, index)}
          aria-haspopup={item.subLinks ? "true" : undefined}
          aria-expanded={item.subLinks ? showMenu === index : undefined}
        >
          {item.label}
          {item.subLinks && (
            <ArrowIcon
              className={`${styles.mobileArrow} ${showMenu === index ? styles.mobileArrowOpen : ""}`}
            />
          )}
        </a>

        {item.subLinks && (
          <ul
            className={`${styles.mobileDropdown} ${showMenu === index ? styles.mobileDropdownOpen : ""}`}
          >
            <li className={styles.mobileViewAllItem}>
              <Link href={item.url} className={styles.mobileViewAllLink} onClick={handleDrawerClose}>
                 {item.label}
              </Link>
            </li>
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subLink.url}
                  className={`${styles.mobileSubLink} ${pathname === subLink.url ? styles.mobileSubLinkActive : ""}`}
                  onClick={handleDrawerClose}
                >
                  {subLink.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Divider
          key={index + 122}
          light={true}
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        />
      </li>
    );
  });

  return (
    <>
      <AppBarStyled
        position="fixed"
        style={{ backgroundColor: "var(--light-surface-container-low)", boxShadow: "none" }}
      >
        <Container maxWidth="xl" className={styles.navContainer}>
          <Toolbar disableGutters>
            <Box className={styles.fullWidth} id="menu-container">
              <div className="menu-logo-wrapper">
                <IconButton
                  size="small"
                  aria-label="Open navigation menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerOpen}
                  color="primary"
                  disableRipple={true}
                  className="hamburger-icon"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Link href="/" className="logo-wrapper">
                  <Image
                    src="/logo.png"
                    width={72}
                    height={33}
                    alt="Epic Cleaning Logo"
                    quality={100}
                  />
                </Link>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBarStyled>
      <Box
        className={styles.drawerWrapper}
        role="presentation"
        id="menu-appbar"
      >
        <Drawer
          className={styles.drawer}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <div className={styles.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIconStyle />
              ) : (
                <ChevronRightIconStyle />
              )}
            </IconButton>
          </div>
          <ListContainer>{menuItems}</ListContainer>
          <Link href="/get-a-quote" style={{ margin: "16px" }}>
            <Button
              size="large"
              variant="outlined"
              className="button"
              onClick={handleDrawerClose}
              classes={{ root: styles.quoteButton }}
            >
              GET A QUOTE
            </Button>
          </Link>
        </Drawer>
      </Box>
    </>
  );
}

const AppBarStyled = ({ className = "", ...props }) =>
  React.createElement(AppBar, {
    ...props,
    color: "inherit",
    elevation: 0,
    sx: { backgroundColor: "#ffffff", boxShadow: "none" },
    className: `${styles.appBarStyled} ${className}`.trim(),
  });

const ListContainer = ({ className = "", ...props }) =>
  React.createElement("ul", {
    ...props,
    className: `${styles.listContainer} ${className}`.trim(),
  });

const ChevronLeftIconStyle = ({ className = "", ...props }) =>
  React.createElement(ChevronLeftIcon, {
    ...props,
    className: `${styles.chevronLeftIconStyle} ${className}`.trim(),
  });
const ChevronRightIconStyle = ({ className = "", ...props }) =>
  React.createElement(ChevronLeftIcon, {
    ...props,
    className: `${styles.chevronRightIconStyle} ${className}`.trim(),
  });
