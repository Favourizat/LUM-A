
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const heros = [
    {
        title: "Bath & Body",
        image: "/hero2.jpg",
    },
    {
        title: "Toners",
        image: "/hero3.jpg",
    },
    {
        title: "Cleansers",
        image: "/moisturizer2.jpg",
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((previousSlide) => {
                return (previousSlide + 1) % heros.length;
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="px-4 py-4 md:px-6">
            <div className="relative h-[650px] overflow-hidden rounded-3xl md:h-[750px]">

                {/* IMAGE SLIDER */}
                <div className="absolute inset-0">

                    {heros.map((hero, index) => (
                        <div
                            key={hero.title}
                            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                                index === currentSlide
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <Image
                                src={hero.image}
                                alt={hero.title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                            />
                        </div>
                    ))}

                </div>

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 z-10 bg-black/30" />

                {/* TEXT CONTENT */}
                <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
                    <div className="max-w-3xl text-[#F7F2E8]">

                        <p className="mb-6 text-xs font-medium tracking-[0.4em]">
                            SKINCARE, SIMPLIFIED
                        </p>

                        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                            Beautiful skin,
                            <br />
                            simply cared for.
                        </h1>

                        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#F7F2E8]/85 sm:text-base">
                            Thoughtfully formulated skincare designed to make
                            your daily routine simple, effective, and beautiful.
                        </p>

                        <Link href="/products" 
                        className="mt-9 inline-block bg-[#E5D8C8] px-8 py-4 text-sm font-medium tracking-wide text-[#3A2A22] transition duration-500 hover:bg-[#F7F2E8] cursor-pointer">
                            Shop Collection
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}
