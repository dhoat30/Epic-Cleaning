"use client";
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
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

function DesktopNavbar() {
  const [showMenu, setShowMenu] = useState(-1);
  const menuRef = useRef(null);
  // router
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname === path;
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
    };
  }, []);

  const showDropdown = (event, index) => {
    setTimeout(() => {
      setShowMenu(index);
    }, 200); // Delay in milliseconds
  };
  const hideDropdown = (event, index) => {
    event.preventDefault();
    setTimeout(() => {
      setShowMenu(-1);
    }, 200); // Del
  };

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    setShowMenu(index === showMenu ? -1 : index);
  };

  // render menu items
  const menuItems = headerLinks.map((item, index) => {
    return (
      <Box
        className="link"
        component="li"
        key={index}
        sx={{ color: "white", display: "block", position: "relative" }}
        onMouseLeave={
          item.subLinks ? (event) => hideDropdown(event, index) : null
        }
        onMouseEnter={
          item.subLinks ? (event) => showDropdown(event, index) : null
        }
        onClick={item.subLinks ? (event) => toggleDropdown(event, index) : null}
      >
        <Link href={item.url} className={isActive(item.url) ? "active" : ""}>
          <Typography component="span" variant="body1" align="center">
            {item.label}
          </Typography>
          {item.subLinks && (
            <KeyboardArrowDownRoundedIcon
              className={`${showMenu === index && "arrow-up"} arrow `}
            />
          )}
        </Link>

        {item.subLinks && (
          <Box
            component="ul"
            className={`${
              showMenu === index ? "block" : "hidden"
            } sublinks-container`}
            sx={{
              position: "absolute",
              left: "-16px",
              width: "250px",
              paddingLeft: 0,
              display: `${showMenu === index ? "block" : "none"} `,
            }}
          >
            <Paper sx={{ background: "white" }}>
              {item.subLinks.map((subLink, subIndex) => (
                <Box component="li" key={subIndex} className="text-left">
                  <Link href={subLink.url}>
                    <Typography
                      className="subLink"
                      component="span"
                      variant="body1"
                      sx={{
                        display: "block",
                        color: "black",
                        py: 2,
                        pr: 4,
                        pl: 4,
                        "&:hover": {
                          color: "var(--light-on-surface)",
                        },
                      }}
                    >
                      {subLink.label}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Box>
    );
  });
  return (
    <>
      <AppBarContainer
        position="static"
        sx={{
          display: { xs: "none", lg: "block" },
          background: pathname.includes("blogs")
            ? "var(--light-surface-container-lowest)"
            : "var(--light-surface-container-lowest)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="grid-links-wrapper">
            {/* logo  */}
            <Link href="/">
              <Image
                src="/logo.png"
                width={48 * 2}
                height={22 * 2}
                alt="Epic Cleaning Logo"
              />
            </Link>
            {/* menu */}
            <div className="links-wrapper">
              <Box
                component="ul"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  margin: 0,
                }}
              >
                {menuItems}
              </Box>
              <Link href="/website-design-price-calculator">
                <Button size="large" variant="contained">
                  Website price calculator
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

const AppBarContainer = styled(AppBar)`
  z-index: 100;
  top: 0;
  backdrop-filter: blur(7.599999904632568px);
  position: fixed;
  .grid-links-wrapper {
    display: flex;
    /* grid-template-columns: 60px 1fr; */
    justify-content: space-between;
  }
  .links-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
  }
  .link {
    > a {
      display: flex;
      align-items: center;
      color: var(--light-on-surface);
      padding: 16px 24px;
      @media (max-width: 1300px) {
        padding: 16px 16px;
      }
      &:hover {
        color: var(--light-on-surface);
        svg {
          color: var(--light-on-surface);
        }
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--light-secondary-fixed);
          bottom: 0;
          left: 0;
        }
      }
      span {
      }
    }
  }
  .sublinks-container {
    li {
      &:hover {
        span {
          color: var(--light-primary);
        }
      }
    }
  }
`;
