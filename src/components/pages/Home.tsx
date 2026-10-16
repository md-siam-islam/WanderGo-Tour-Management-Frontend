import { Hero } from "../Homepage/Banner";
import FeaturedTours from "../Homepage/FeaturedTours";
import WhyChooseUs from "../Homepage/WhyChooseUs";
import Explore from "../Homepage/Explore";
import HowItWorks from "../Homepage/HowItWorks";
import PromoBanner from "../Homepage/PromoBanner";
import HomeReviews from "../Homepage/HomeReviews";
import Support from "../Homepage/Support";

const Home = () => {
  return (
    <div className="space-y-4">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Featured Tour Packages */}
      <FeaturedTours />

      {/* 3. Why Travel With WanderGo */}
      <WhyChooseUs />

      {/* 4. Explore Destinations Visual Highlight */}
      <Explore />

      {/* 5. 3-Step Booking Journey */}
      <HowItWorks />

      {/* 6. Active Promo Coupons & Deals */}
      <PromoBanner />

      {/* 7. Verified Traveler Reviews & Testimonials */}
      <HomeReviews />

      {/* 8. 24/7 Support & Traveler Care */}
      <Support />
    </div>
  );
};

export default Home;