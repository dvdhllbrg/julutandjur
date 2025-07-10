"use client";

import type { ImageLoaderProps } from "next/image";

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const isLocal = !src.startsWith("http");
  const query = new URLSearchParams();

  const imageOptimizationApi = "https://images.julutandjur.se";
  // Your NextJS application URL
  const baseUrl = "https://julutandjur.se";

  const fullSrc = `${baseUrl}${src}`;

  if (width) query.set("width", width.toString());
  if (quality) query.set("quality", quality.toString());

  if (isLocal && process.env.NODE_ENV === "development") {
    return src;
  }
  if (isLocal) {
    return `${imageOptimizationApi}/image/${fullSrc}?${query.toString()}`;
  }
  return `${imageOptimizationApi}/image/${src}?${query.toString()}`;
}
