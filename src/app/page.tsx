import Hero from "@sections/furkys/Hero";
import ProductCarousel from "@sections/furkys/ProductCarousel";
import Testimonials from "@sections/furkys/Testimonials";
import ArenaCarousel from "@sections/furkys/ArenaCarousel";
import MoodsGrid from "@sections/furkys/MoodsGrid";
import SocialVideos from "@sections/furkys/SocialVideos";
import Faq from "@sections/furkys/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCarousel />
      <Testimonials />
      <ArenaCarousel />
      <MoodsGrid />
      <SocialVideos />
      <Faq />
    </main>
  );
}
