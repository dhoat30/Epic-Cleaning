"use client";
import styles from "./ContactInfo.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

export default function ContactInfo({ contactInfo, className }) {
  if (contactInfo.info.length === 0) return null;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <Typography variant="overline" component="p" className={styles.heading}>
        Contact
      </Typography>
      {contactInfo.info.map((info, index) => (
        <Link href={info.url} key={index} className={styles.infoRow}>
          <span className={styles.iconWrapper}>
            <Image src={info.icon.url} alt={info.icon.alt} fill />
          </span>
          <Typography variant="body2" component="span" className={styles.label}>
            {info.label}
          </Typography>
        </Link>
      ))}
    </div>
  );
}
