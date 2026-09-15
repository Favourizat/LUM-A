import AboutCTA from "@/components/AboutCTA/AboutCTA";
import AboutHero from "@/components/AboutHero/AboutHero";
import AboutStory from "@/components/AboutStory/AboutStory";
import BrandValues from "@/components/BrandValues/BrandValues";

export default function AboutPage() {
    return(
        <main>
            <AboutHero />
            <AboutStory />
            <BrandValues />
            <AboutCTA />
        </main>
    )
}