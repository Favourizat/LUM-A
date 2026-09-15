
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">

        <div className="relative h-[550px] overflow-hidden rounded-[2rem] md:h-[650px]">
          <Image
            src="/abouthero.jpg"
            alt="LUMÉA skincare"
            fill
            className="object-cover transition duration-700 hover:scale-110"
          />
        </div>

        <div className="max-w-xl">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-[#7D8B72]">
            BEAUTY IN SIMPLICITY
          </p>

          <h2 className="text-4xl font-medium leading-tight tracking-tight text-[#3A2A22] sm:text-5xl">
            Your skin deserves a{" "}
            <span className="italic">simpler ritual.</span>
          </h2>

          <div className="mt-7 space-y-5 text-sm leading-7 text-[#3A2A22]/70 sm:text-base">
            <p>
              We believe skincare should work with your everyday life,
              not complicate it.
            </p>

            <p>
              LUMÉA brings together carefully considered formulas,
              purposeful ingredients, and a thoughtful approach to
              daily skincare.
            </p>

            <p>
              From the first cleanse to the final layer, every product
              is designed to make your routine feel more intentional.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
