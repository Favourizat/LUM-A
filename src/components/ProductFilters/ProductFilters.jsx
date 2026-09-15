"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";


export default function ProductFilters({ products, initialCategory = "ALL" }) {
    console.log("PRODUCT CATEGORIES:", products.map((product) => product.category));
    const [selectedCategory, setSelectedCategory] =
        useState(initialCategory);

    const [selectedPrice, setSelectedPrice] =
        useState("ALL");

    const [sortBy, setSortBy] =
        useState("DEFAULT");

    const categories = [
        "ALL",
        "CLEANSERS",
        "TONERS",
        "SERUMS",
        "MOISTURIZERS",
        "SUNSCREEN",
        "BODYCARE",
    ];

    let filteredProducts = [...products];

    // CATEGORY FILTER
    if (selectedCategory !== "ALL") {
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.category === selectedCategory
        );
    }

    // PRICE FILTER
    if (selectedPrice === "UNDER_15000") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price < 15000
        );
    }

    if (selectedPrice === "15000_20000") {
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.price >= 15000 &&
                product.price <= 20000
        );
    }

    if (selectedPrice === "OVER_20000") {
        filteredProducts = filteredProducts.filter(
            (product) => product.price > 20000
        );
    }

    // SORTING
    if (sortBy === "PRICE_LOW") {
        filteredProducts.sort(
            (a, b) => a.price - b.price
        );
    }

    if (sortBy === "PRICE_HIGH") {
        filteredProducts.sort(
            (a, b) => b.price - a.price
        );
    }

    // CLEAR FILTERS
    function clearFilters() {
        setSelectedPrice("ALL");
        setSortBy("DEFAULT");
    }

    const filtersAreActive =
        selectedPrice !== "ALL" ||
        sortBy !== "DEFAULT";

    return (
        <div className="grid items-start gap-8 lg:grid-cols-[220px_1fr]">

            {/* LEFT SIDE - CATEGORY LIST */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">

                <div className="border-b border-[#E5D8C8] pb-4">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A2A22]">
                        Categories
                    </h2>
                </div>

                <div className="mt-4 space-y-1">
                    {categories.map((category) => {
                        const isSelected =
                            selectedCategory === category;

                        return (
                            <button
                                key={category}
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                                className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${isSelected
                                    ? "bg-[#3A2A22] font-medium text-[#F7F2E8]"
                                    : "text-[#3A2A22]/65 hover:bg-[#E5D8C8]/40 hover:text-[#3A2A22]"
                                    }`}
                            >
                                {category === "ALL"
                                    ? "All Products"
                                    : category}
                            </button>
                        );
                    })}
                </div>
            </aside>


            {/* RIGHT SIDE */}
            <section className="min-w-0">

                {/* TOP FILTER BAR */}
                <div className="mb-8 flex flex-col gap-5 border-b border-[#E5D8C8] pb-6 md:flex-row md:items-end md:justify-between">

                    {/* SELECTED CATEGORY */}
                    <div>
                        <p className="text-xs tracking-wider text-[#7D8B72]">
                            CURRENT CATEGORY
                        </p>

                        <h2 className="mt-1 text-2xl font-medium capitalize text-[#3A2A22]">
                            {selectedCategory === "ALL"
                                ? "All Products"
                                : selectedCategory}
                        </h2>

                        <p className="mt-1 text-sm text-[#3A2A22]/60">
                            {filteredProducts.length} product
                            {filteredProducts.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>
                    </div>

                    {/* PRICE + SORT + CLEAR */}
                    <div className="flex flex-wrap items-center gap-3">

                        {/* PRICE */}
                        <select
                            id="price"
                            value={selectedPrice}
                            onChange={(e) =>
                                setSelectedPrice(e.target.value)
                            }
                            className="rounded-full border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-2.5 text-sm text-[#3A2A22] outline-none transition focus:border-[#3A2A22]"
                        >
                            <option value="ALL">
                                All Prices
                            </option>

                            <option value="UNDER_15000">
                                Under ₦15,000
                            </option>

                            <option value="15000_20000">
                                ₦15,000 - ₦20,000
                            </option>

                            <option value="OVER_20000">
                                Above ₦20,000
                            </option>
                        </select>

                        {/* SORT */}
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                            className="rounded-full border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-2.5 text-sm text-[#3A2A22] outline-none transition focus:border-[#3A2A22]"
                        >
                            <option value="DEFAULT">
                                Sort By
                            </option>

                            <option value="PRICE_LOW">
                                Price: Low to High
                            </option>

                            <option value="PRICE_HIGH">
                                Price: High to Low
                            </option>
                        </select>

                        {filtersAreActive && (
                            <button
                                onClick={clearFilters}
                                className="px-2 py-2.5 text-sm font-medium text-[#3A2A22] underline underline-offset-4 transition hover:opacity-60"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* PRODUCT GRID */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">

                            <h3 className="text-lg font-medium text-[#3A2A22]">
                                No products found
                            </h3>

                            <p className="mt-2 text-sm text-[#3A2A22]/60">
                                Try adjusting your filters.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="mt-5 text-sm font-medium text-[#3A2A22] underline underline-offset-4"
                            >
                                Clear Filters
                            </button>

                        </div>
                    </div>
                )}

            </section>
        </div>
    )
}