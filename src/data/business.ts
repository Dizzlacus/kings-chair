export const business = {
  name: "King's Chair",
  legalName: "King's Chair",
  description:
    "King's Chair — bespoke hairdressing at Hivetree, Newcastle upon Tyne. Cuts, colour and styling by Liv Griffin and Allan Kingsland.",
  address: {
    streetAddress: "9 Bigg Market, 202 Hivetree",
    addressLocality: "Newcastle upon Tyne",
    postalCode: "NE1 1UN",
    addressCountry: "GB",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=9+Bigg+Market+202+Hivetree+Newcastle+upon+Tyne+NE1+1UN",
  stylists: [
    {
      name: "Allan Kingsland",
      bio: "Multi-award winning Wella Color Expert.",
      instagram: {
        handle: "@allankingslandhair",
        url: "https://www.instagram.com/allankingslandhair/",
      },
    },
    {
      name: "Liv Griffin",
      bio: "Bespoke, creative and technical expertise.",
      instagram: {
        handle: "@hair_bylivgriffin",
        url: "https://www.instagram.com/hair_bylivgriffin/",
      },
    },
  ],
} as const;

export const allanInstagram = business.stylists[0].instagram;
export const livInstagram = business.stylists[1].instagram;
