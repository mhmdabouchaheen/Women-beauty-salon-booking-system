"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, CirclePlus } from "lucide-react";

interface Favorite {
  name: string;
  price: number;
  duration: string;
  image: string;
  alt: string;
}

const favorites: Favorite[] = [
  {
    name: "Silk Facial",
    price: 120,
    duration: "60 mins",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkNr4QiulYkY45kwv7LmODcJ--wYa1pEM2kKP7xzw-6JJlyWfxmUyM8RPihbLU7wRzHeiSV12KEbrJlt8XOaD67ser46Lc6fSKDzdbTRwYd8vFZNXq2RccKwfvSgTPjuqT4rxI9O0NR4MkCSrzaUJ9v52IyQ20wo6tSby4AXljiw1hMoTfauYBB4ugoicDtbjTa6A9LsdhnsB09swAFBdya9kT3hIJIKeQRpKZhi2v_4tp2Gkgof1tfg",
    alt: "A serene close-up of a luxurious facial treatment",
  },
  {
    name: "Luxe Manicure",
    price: 65,
    duration: "45 mins",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHNKH9w0BwBFUQljW_PWvtstFqLMARMoG7z-qh50SQBEAcmLIrAunbgd4i5UGsVqH2C34SBtZk884rxxss2EuMLTTp5zMO87Yw-e3_m8GYPA0TLX75GnK4UlgaOLiUnUjLKCtbuA8Ld5uK-DPrk51AWGtEp3QsHOOwdIIjH5Oa3ZMZa7_-KnOo48WFbLtKPF9qJeRp2WsvYee_M_MGRF4mxna0vvU-d8M0b7FQ7HPTRT6AErDozPDruw",
    alt: "An elegant nude manicure with a thin gold line accent",
  },
  {
    name: "Hot Stone Massage",
    price: 150,
    duration: "90 mins",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACj1rTL-LTNkfiFdwa8D1abaAZWoPMAC9L4ROxDnvopQy0cEWTiSUmYSHedNYZKvowW8Id7Bb90vuoWVFLaG7O0Q2Ty1s0deGijUBvPoHHt80dgworXB5ZykQvV62LAvES3zkvtyWy9r3XOJAnxef-vLx0il_DdXKUXttefz3vRNqcTFxsURIZeub5scu2-1lK5bMFJsYlDltYZOIDhqSnRq1LNmJX10_94LJhq7OwDOSSNOKSG3RNRQ",
    alt: "A tranquil spa treatment room with towels and rose petals",
  },
];

export default function FavoritesGrid() {
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(favorites.map((f) => [f.name, true])),
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline-md text-headline-md">Your Favorites</h2>
        <a
          href="#"
          className="text-primary font-label-md hover:underline underline-offset-4"
        >
          Explore More
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((fav) => (
          <div key={fav.name} className="group cursor-pointer">
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden mb-4 relative">
              <Image
                src={fav.image}
                alt={fav.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() =>
                  setLiked((prev) => ({ ...prev, [fav.name]: !prev[fav.name] }))
                }
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-primary hover:scale-110 transition-transform"
                aria-label={`${liked[fav.name] ? "Remove from" : "Add to"} favorites`}
              >
                <Heart
                  size={18}
                  className={liked[fav.name] ? "fill-primary" : ""}
                />
              </button>
            </div>
            <h3 className="font-label-md text-on-surface">{fav.name}</h3>
            <p className="text-on-surface-variant text-[14px]">
              ${fav.price} • {fav.duration}
            </p>
          </div>
        ))}

        {/* Add new favorite */}
        <div className="group cursor-pointer">
          <div className="aspect-[4/5] rounded-[24px] overflow-hidden mb-4 relative border-2 border-dashed border-outline-variant flex items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="text-center">
              <CirclePlus
                size={48}
                className="text-outline-variant mb-2 mx-auto"
              />
              <p className="font-label-md text-on-surface-variant px-4">
                Find your next favorite
              </p>
            </div>
          </div>
          <h3 className="font-label-md text-on-surface">New Service</h3>
          <p className="text-on-surface-variant text-[14px]">
            Discover trends
          </p>
        </div>
      </div>
    </section>
  );
}
