import type { ImageMetadata } from "astro";
import hollywoodWaves from "../assets/images/gallery/hollywood-waves.png";
import lavenderBlonde from "../assets/images/gallery/lavender-blonde.png";
import creativeColourCut from "../assets/images/gallery/creative-colour-cut.png";
import platinumBraid from "../assets/images/gallery/platinum-braid-styling.png";
import pompadour from "../assets/images/gallery/pompadour-styling.png";
import eventStyling from "../assets/images/gallery/event-styling.png";

export interface GalleryItem {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    image: hollywoodWaves,
    alt: "Hollywood wave styling",
    caption: "Hollywood wave styling",
  },
  {
    image: lavenderBlonde,
    alt: "Lavender blonde colour",
    caption: "Lavender blonde colour",
  },
  {
    image: creativeColourCut,
    alt: "Creative colour cut",
    caption: "Creative colour cut",
  },
  {
    image: platinumBraid,
    alt: "Platinum braid styling",
    caption: "Platinum braid styling",
  },
  {
    image: pompadour,
    alt: "Pompadour cut and style",
    caption: "Pompadour cut and style",
  },
  {
    image: eventStyling,
    alt: "Event styling",
    caption: "Event styling",
  },
];
