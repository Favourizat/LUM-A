const reviews = [
  {
    name: "Amara O.",
    location: "Lagos, Nigeria",
    review:
      "The cleanser has completely changed my morning routine. My skin feels clean and soft without that tight feeling.",
    product: "Gentle Cloud Cleanser",
  },
  {
    name: "Zainab M.",
    location: "Abuja, Nigeria",
    review:
      "I love how simple the products are to use. The Vitamin C serum has become my favorite part of my routine.",
    product: "Vitamin C Brightening Serum",
  },
  {
    name: "Teni A.",
    location: "Port Harcourt, Nigeria",
    review:
      "Everything about LUMÉA feels thoughtful, from the packaging to the products. My skin feels so much more hydrated.",
    product: "Daily Barrier Moisturizer",
  },
];

export default function CustomerReviews() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.35em] text-[#7D8B72]">
            LOVED BY SKIN
          </p>

          <h2 className="text-4xl font-medium tracking-tight text-[#3A2A22] sm:text-5xl">
            Kind words from
            <br className="hidden sm:block" />
            our community.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#3A2A22]/65 sm:text-base">
            Simple routines, thoughtful formulas, and skincare
            that fits beautifully into everyday life.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex min-h-[300px] flex-col justify-between rounded-[2rem] bg-[#E5D8C8]/45 p-7 md:p-8"
            >
              <div>
                {/* Stars */}
                <div
                  className="flex gap-1 text-[#7D8B72]"
                  aria-label="5 out of 5 stars"
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                <p className="mt-6 text-lg leading-8 text-[#3A2A22]">
                  “{review.review}”
                </p>
              </div>

              <div className="mt-8 border-t border-[#3A2A22]/10 pt-5">
                <p className="text-sm font-medium text-[#3A2A22]">
                  {review.name}
                </p>

                <p className="mt-1 text-xs text-[#3A2A22]/55">
                  {review.location}
                </p>

                <p className="mt-3 text-xs tracking-wide text-[#7D8B72]">
                  {review.product}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}