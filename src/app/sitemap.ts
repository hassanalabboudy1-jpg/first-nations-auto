import type { MetadataRoute } from "next";
import { ALL_COMMUNITIES } from "@/data/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://firstnationautofinancing.ca";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Community pages — programmatic SEO
  const communityPages: MetadataRoute.Sitemap = ALL_COMMUNITIES.map(
    (community) => ({
      url: `${baseUrl}/community/${community.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [...staticPages, ...communityPages];
}
