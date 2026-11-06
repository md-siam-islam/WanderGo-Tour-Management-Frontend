import { Hero } from "../Homepage/Banner";
import TravelPartner from "../Homepage/TravelPartner";
import VideoSection from "../Homepage/VideoSection";
import TrendingActivities from "../Homepage/TrendingActivities";
import FeaturedTours from "../Homepage/FeaturedTours";
import TopPlaces from "../Homepage/TopPlaces";
import Explore from "../Homepage/Explore";
import HowItWorks from "../Homepage/HowItWorks";
import AgencyMilestones from "../Homepage/AgencyMilestones";
import PromoBanner from "../Homepage/PromoBanner";
import HomeReviews from "../Homepage/HomeReviews";
import Support from "../Homepage/Support";
import TourGuidesSection from "../modules/Home/TourGuides";
import ReadyToExploreCTA from "../Homepage/ReadyToExploreCTA";

const Home = () => {
  return (
    <div className="space-y-4">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Why We're Your Perfect Travel Partner (Get To Know Us) */}
      <TravelPartner />

      {/* 3. Cinematic Tour Video Showcase */}
      <VideoSection />

      {/* 4. Trending Activities & Tour Styles */}
      <TrendingActivities />

      {/* 5. Featured Tour Packages */}
      <FeaturedTours />

      {/* 6. Top Places To Travel in Bangladesh (Bento Grid) */}
      <TopPlaces />

      {/* 4. Explore Destinations Visual Highlight */}
      <Explore />

      {/* 5. 3-Step Booking Journey */}
      <HowItWorks />

      {/* 6. Agency Milestones & Flight Path Stats */}
      <AgencyMilestones />

      {/* 6. Active Promo Coupons & Deals */}
      {/* <PromoBanner /> */}

      {/* 7. Certified Tour Guides */}
      <TourGuidesSection />

      {/* 8. Verified Traveler Reviews & Testimonials */}
      <HomeReviews />

      {/* 9. Final Call-To-Action (Before Footer) */}
      <ReadyToExploreCTA />

      {/* 10. 24/7 Support & Traveler Care */}
      {/* <Support /> */}
    </div>
  );
};

export default Home;