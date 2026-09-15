import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#3A2A22] text-[#F7F2E8]">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">

        {/* Brand */}
        <div className="mb-14 max-w-md">
          <h2 className="text-3xl font-semibold tracking-[0.25em]">
            LUMÉA
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#F7F2E8]/70">
            Beautiful skincare, thoughtfully created for
            simple and effective daily rituals.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-xs font-medium tracking-[0.25em] text-[#E5D8C8]">
              SHOP
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                All Products
              </Link>

              <Link
                href="/products?category=cleansers"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Cleansers
              </Link>

              <Link
                href="/products?category=serums"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Serums
              </Link>

              <Link
                href="/products?category=moisturizers"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Moisturizers
              </Link>

              <Link
                href="/products?category=sunscreen"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Sunscreen
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-5 text-xs font-medium tracking-[0.25em] text-[#E5D8C8]">
              HELP
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Contact Us
              </Link>

              <Link
                href="/shipping"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Shipping
              </Link>

              <Link
                href="/returns"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Returns
              </Link>

              <Link
                href="/faq"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                FAQs
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 text-xs font-medium tracking-[0.25em] text-[#E5D8C8]">
              ABOUT
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Our Story
              </Link>

              <Link
                href="/ritual"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Our Ritual
              </Link>

              <Link
                href="/journal"
                className="text-sm text-[#F7F2E8]/70 transition hover:text-[#F7F2E8]"
              >
                Journal
              </Link>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h3 className="mb-5 text-xs font-medium tracking-[0.25em] text-[#E5D8C8]">
              FOLLOW
            </h3>

            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="transition hover:opacity-70"
              >
                <FaInstagram size={20} strokeWidth={1.5} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="transition hover:opacity-70"
              >
                <FaFacebookF size={20} strokeWidth={1.5} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="transition hover:opacity-70"
              >
                <FaTwitter size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#F7F2E8]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-[#F7F2E8]/50 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 LUMÉA. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition hover:text-[#F7F2E8]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#F7F2E8]"
            >
              Terms
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}