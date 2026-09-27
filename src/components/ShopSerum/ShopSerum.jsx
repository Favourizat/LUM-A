
import Image from "next/image";
import Link from "next/link";

export default function ShopSerum() {

    return (
        <main className="  px-6 py-15 md:py-18">

            <div className="mb-10 flex flex-col items-center">
                <p className="mb-2 text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                    LIMITED TIME OFFER
                </p>

                <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-white" />

                    <h2 className="font-serif text-3xl font-medium tracking-wide text-[#3A2A22] md:text-4xl">
                        FLASH SALE
                    </h2>

                    <span className="h-px w-10 bg-[#D8CBB9]" />
                </div>

                <p className="mt-3 text-sm text-[#6B625A]">
                    Treat your skin to something special
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">

                {/* Card 1 */}
                <div className="grid grid-cols-2 overflow-hidden bg-white shadow-xl">

                    {/* Image */}
                    <div className="relative h-[300px] group">
                        <Image
                            src="/clear-skin1.jpg"
                            alt="Face serum for glowing skin"
                            fill
                            className="object-cover group-hover:scale-110 transition-all duration-700 cursor-pointer"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-center justify-center px-5 text-center">
                        <h2 className="font-serif text-2xl text-[#3A2A22]">
                            Face Serum for Glowing Skin
                        </h2>

                        <h4 className="mt-3 text-xs font-medium tracking-[0.15em] text-[#3A2A22]">
                            FLAT UP TO 15% DISCOUNT
                        </h4>

                        <Link 
                        href="/products"
                        className="mt-6 border border-[#3A2A22] px-5 py-3 text-xs font-medium tracking-[0.15em] text-[#3A2A22] transition hover:bg-[#3A2A22] hover:text-white">
                            SHOP NOW
                        </Link>
                    </div>

                </div>


                {/* Card 2 */}
                <div className="grid grid-cols-2 overflow-hidden bg-white shadow-xl">

                    {/* Image */}
                    <div className="relative h-[300px] group">
                        <Image
                            src="/moisturizer2.jpg"
                            alt="Hydrating face moisturizer"
                            fill
                            className="object-cover group-hover:scale-110 transition-all duration-700 cursor-pointer"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-center justify-center px-5 text-center">
                        <h2 className="font-serif text-2xl text-[#3A2A22]">
                            Hydrating Face Moisturizer
                        </h2>

                        <h4 className="mt-3 text-xs font-medium tracking-[0.15em] text-[#3A2A22]">
                            FLAT UP TO 20% DISCOUNT
                        </h4>

                        <Link 
                        href="/products"
                        className="mt-6 border border-[#3A2A22] px-5 py-3 text-xs font-medium tracking-[0.15em] text-[#3A2A22] transition hover:bg-[#3A2A22] hover:text-white">
                            SHOP NOW
                        </Link>
                    </div>

                </div>

            </div>
        </main>
    )
}