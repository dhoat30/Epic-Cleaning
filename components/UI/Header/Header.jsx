"use client";
import styles from "./Header.module.scss";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

export default function Header() {
  return (
    <>
      <div className={styles.desktop}>
        <DesktopNavbar />
      </div>
      <div className={styles.mobile}>
        <MobileNavbar />
      </div>
    </>
  );
}
