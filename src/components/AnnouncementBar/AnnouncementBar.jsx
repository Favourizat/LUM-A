
export default function AnnouncementBar() {
    const content = (
        <div className="flex shrink-0 items-center">
            <span className="mx-8 text-xs tracking-[0.2em]">
                FREE SHIPPING ON ORDERS OVER N100,000
            </span>

            <span className="mx-8 text-xs tracking-[0.2em]">
                ✦
            </span>

            <span className="mx-8 text-xs tracking-[0.2em]">
                FREE SHIPPING ON ORDERS OVER N100,000
            </span>

            <span className="mx-8 text-xs tracking-[0.2em]">
                ✦
            </span>

            <span className="mx-8 text-xs tracking-[0.2em]">
                FREE SHIPPING ON ORDERS OVER N100,000
            </span>

            <span className="mx-8 text-xs tracking-[0.2em]">
                ✦
            </span>
        </div>
    )

    return (
        <div className="overflow-hidden bg-[#3A2A22] py-2 text-[#F7F2E8]">
            <div className="flex w-max animate-marquee">
                {content}
                {content}
            </div>
        </div>
    )
}
