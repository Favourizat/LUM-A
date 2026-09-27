
export default function NewArrivalsBar() {
    const content = (
        <div className="flex shrink-0 items-center">
            <span className="mx-12 text-xs tracking-[0.2em]">
                TRANSFORM YOUR SKIN
            </span>

            <span className="mx-12 text-xs tracking-[0.2em]">
                ✦
            </span>

            <span className="mx-12 text-xs tracking-[0.2em]">
                NEW ARRIVALS
            </span>

            <span className="mx-12 text-xs tracking-[0.2em]">
                ✦
            </span>

            <span className="mx-12 text-xs tracking-[0.2em]">
                LUMEA COLLECTIONS
            </span>

            <span className="mx-12 text-xs tracking-[0.2em]">
                ✦
            </span>
        </div>
    )

    return (
        <div className="overflow-hidden bg-[#3A2A22] py-8 text-3xl text-[#F7F2E8]">
            <div className="flex w-max animate-marquee">
                {content}
                {content}
            </div>
        </div>
    )
}
