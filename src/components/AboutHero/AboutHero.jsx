import Image from "next/image"

export default function AboutHero() {
    return (
        <section className="px-4 py-6 md:px-6 md:py-10">
            <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-end overflow-hidden rounded-2rem md:min-h-[750px]">

                <Image
                    src="/abouthero3.jpg"
                    alt="about.title"
                    fill
                    className="absolute inset-0 h-full w-full object-cover" />

            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 max-w-3xl px-6 pb-12 text-[#F7F2E8] md:px-12 md:py-16">
                <p className="pb-5 text-xs font-medium tracking-[0.4em]">
                    OUR STORY
                </p>

                <h1 className="text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                    Skincare,
                    <br />
                    thoughtfully formulated
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#F7F2E8]/85 sm:text-base">
                    LUMÉA was created with one simple belief:
                    beautiful skincare should feel intentional,
                    uncomplicated, and enjoyable.
                </p>
            </div>
             </div>
        </section>
    )
}