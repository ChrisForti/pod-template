import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <Features />
      <Footer />
    </div>
  );
}
