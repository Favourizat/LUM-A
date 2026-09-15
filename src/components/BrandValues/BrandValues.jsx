import {
    Sparkles,
    Stethoscope,
    Leaf,
    Heart,
    Sprout,
    ShieldCheck,
} from "lucide-react"

const values = [
    {
        icon: ShieldCheck,
        title: "Clinically Tested",
        description:
            "Formulated with a focus on safety, effectiveness, and consistency.",
    },
    {
        icon: Stethoscope,
        title: "Dermatologist Approved",
        description:
            "Created with skin health and thoughtful formulation principles in mind.",
    },
    {
        icon: Sparkles,
        title: "100% Natural",
        description:
            "Thoughtfully selected ingredients inspired by the natural world.",
    },
    {
        icon: Heart,
        title: "Cruelty Free",
        description:
            "A beauty philosophy that puts care at the heart of every product.",
    },
    {
        icon: Leaf,
        title: "Organic",
        description:
            "A considered approach to ingredients and responsible beauty.",
    },
    {
        icon: Sprout,
        title: "Vegan",
        description:
            "Skincare designed with a plant-conscious approach.",
    },
];

export default function BrandValues() {
    return (
        <section className="px-6 py-6 md:py-8">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 text-xs font-medium tracking-[0.35em] text[#7D8B72]">
                        WHAT WE BELIEVE
                    </p>

                    <h2 className="text-4xl font-medium trackimg-[tight] text-[#3A2A22] sm:text-5xl">
                        Thoughtful by nature.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#3A2A22]/65 sm:text-base">
                        Every detail of LUMÉA is guided by our belief
                        that skincare should be effective, intentional,
                        and beautiful.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-2 border border-t border-[#3A2A22]/10 md:grid-cols-3">
                    {values.map((value) => {
                        const Icon = value.icon

                        return (
                            <div 
                            key={value.title}
                            className="group mx-4 my-4 border-b border-r bg-[#3A2A22] border-[#3A2A22]/10 px-6 py-10 text-center transition  duration-500 hover:scale-105 md:px-10 md:py-14"
                          >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-[#7D8B72]/30 text-[#7D8B72] transition duration-500 group-hover:scale-110">
                                    <Icon 
                                    size={21}
                                    strokeWidth={1.4}/>
                                </div>

                                <h3 className="mt-5 text-sm font-medium tracking-wide text-[#F7F2E8]">
                                    {value.title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-xs leading-6 text-[#F7F2E8]/60 sm:text-sm">
                                    {value.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}