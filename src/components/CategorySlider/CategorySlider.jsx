"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Bath & Body",
    description: "Everyday care, elevated.",
    image: "/bath&body.jpg",
    slug: "body-care",
  },
  {
    title: "Cleansers",
    description: "A gentle beginning to your skincare ritual.",
    image: "/cleanser-new.jpg",
    slug: "cleansers"
  },
  {
    title: "Toners",
    description: "Refresh, balance, and prepare your skin.",
    image: "/toner-new.avif",
    slug: "toners"
  },
];

export default function CategorySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-8 md:px-6 md:py-12">
      <div className="relative mx-auto h-[260px] max-w-7xl overflow-hidden rounded-3xl md:h-[300px]">

        {/* Slides Container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="relative h-full min-w-full flex-shrink-0"
            >
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
                fill
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/33" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-[#F7F2E8]">
                <div>
                  <p className="mb-3 text-xs tracking-[0.3em]">
                    LUMÉA COLLECTION
                  </p>

                  <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl">
                    {slide.title}
                  </h2>

                  <p className="mt-3 text-sm text-[#F7F2E8]/85">
                    {slide.description}
                  </p>

                  <Link 
                  href={`/products/${slide.slug}`}
                  className="mt-5 inline-block bg-[#F7F2E8] px-6 py-3 text-xs font-medium text-[#3A2A22] transition hover:bg-[#E5D8C8]">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to ${slide.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-[#F7F2E8]"
                  : "w-2 bg-[#F7F2E8]/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}