import Link from "next/link";
import Image from "next/image";

export default function AboutCTA() {
  return (
    <section className="px-4 pb-6 md:px-6">
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center justify-center overflow-hidden rounded-[2rem]">

        {/* Image */}
        <Image
          src="/abouthero2.jpg"
          alt="Discover LUMÉA skincare"
          className="absolute inset-0 h-full w-full object-cover"
          fill
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="relative z-10 max-w-xl px-6 text-center text-[#F7F2E8]">

          <p className="mb-4 text-xs font-medium tracking-[0.35em]">
            YOUR RITUAL STARTS HERE
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Discover your
            <br />
            LUMÉA ritual.
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F7F2E8]/80">
            Thoughtfully selected skincare for simple,
            beautiful everyday routines.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block bg-[#F7F2E8] px-8 py-4 text-xs font-medium tracking-[0.15em] text-[#3A2A22] transition duration-300 hover:bg-[#E5D8C8]"
          >
            SHOP LUMÉA
          </Link>

        </div>

      </div>
    </section>
  );
}