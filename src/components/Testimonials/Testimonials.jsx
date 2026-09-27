import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Amara O.",
            location: "Lagos, Nigeria",
            image: "/testimonials/amara.jpg",
            text: "My skin feels noticeably softer and more hydrated since I started using LUMÉA. The moisturizer has become a part of my everyday routine.",
            image: "/testi1.jpg",
        },
        {
            name: "Damilola A.",
            location: "Abuja, Nigeria",
            image: "/testimonials/damilola.jpg",
            text: "I love how lightweight the serum feels on my skin. It absorbs quickly and leaves my skin looking fresh and healthy without feeling greasy.",
            image: "/testi2.jpg",
        },
        {
            name: "Chidinma E.",
            location: "Port Harcourt, Nigeria",
            image: "/testimonials/chidinma.jpg",
            text: "LUMÉA has made my skincare routine much simpler. The products feel gentle, nourishing, and my skin always feels refreshed after using them.",
            image: "/testi3.jpg",
        },
        {
            name: "Zainab M.",
            location: "Kaduna, Nigeria",
            image: "/testimonials/zainab.jpg",
            text: "The quality and feel of these products really stood out to me. My skin feels smoother and moisturized, and I genuinely enjoy using them every day.",
            image: "/esti4.jpg",
        },
    ];

    return (
        <section className="bg-[#F7F2E8] px-6 py-16 md:py-20">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-12 text-center">
                    <p className="mb-2 text-xs font-medium tracking-[0.25em] text-[#7D8B72]">
                        CUSTOMER LOVE
                    </p>

                    <h2 className="font-serif text-3xl font-medium text-[#3A2A22] sm:text-4xl md:text-5xl">
                        What Our Customers Say
                    </h2>

                    <div className="mx-auto mt-4 h-px w-12 bg-[#B89B5E]" />
                </div>

                {/* Testimonials */}
                <div className="grid gap-6 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
                        >
                            <div className="flex gap-6">

                                {/* Customer Image */}
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#E5D8C8] bg-[#F7F2E8]">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="h-full w-full object-cover"
                                        fill
                                    />
                                </div>

                                {/* Testimonial */}
                                <div className="flex-1">

                                    {/* Stars */}
                                    <div className="mb-3 text-sm tracking-[0.2em] text-[#B89B5E]">
                                        ★★★★★
                                    </div>

                                    <p className="font-serif text-lg leading-relaxed text-[#3A2A22]">
                                        “{testimonial.text}”
                                    </p>

                                    {/* Customer */}
                                    <div className="mt-6 border-t border-[#E5D8C8] pt-4">
                                        <p className="text-sm font-semibold text-[#3A2A22]">
                                            {testimonial.name}
                                        </p>

                                        <p className="mt-1 text-xs text-[#7D8B72]">
                                            {testimonial.location}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
