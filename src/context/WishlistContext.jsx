"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load wishlist from localStorage
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem("lumea-wishlist");

            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error("Failed to load wishlist:", error);
        }

        setIsLoaded(true);
    }, []);

    // Save wishlist to localStorage
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem("lumea-wishlist", JSON.stringify(wishlist))
        } catch (error) {
            console.error("Failed to load from wishlist:", error)
        }
    }, [wishlist, isLoaded])

    // Add product to wishlist
    function addToWishlist(product) {
        setWishlist((currentWishlist) => {
            const alreadyExists = currentWishlist.some(
                (item) => item.id === product.id
            )

            if (alreadyExists) {
                return currentWishlist
            }

            return [...currentWishlist, product]
        })
    }
    // Remove product from wishlist
    function removeFromWishlist(productId) {
        setWishlist((currentWishlist) => {
            return currentWishlist.filter(
                (item) => item.id !== productId)
        })
    }

    // Toggle wishlist
    function toggleWishlist(product) {
        setWishlist((currentWishlist) => {
            const alreadyExists = currentWishlist.some(
                (item) => item.id === product.id
            );

            if (alreadyExists) {
                return currentWishlist.filter(
                    (item) => item.id !== product.id
                )
            }
            return [...currentWishlist, product]
        })
    }

    // Check whether product is in wishlist
    function isInWishlist(productId) {
        return wishlist.some(
            (item) => item.id === productId
        )
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    return useContext(WishlistContext)
}