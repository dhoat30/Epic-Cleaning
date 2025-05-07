// components/GoogleMapsLoader.js
"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function GoogleMapsLoader({ onLoad }) {
  const GOOGLE_API_KEY = "AIzaSyBXgP4lHtDjEfraejSCNe99RDTweKuP0R0";

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
      strategy="lazyOnload"
      onLoad={onLoad}
    />
  );
}


