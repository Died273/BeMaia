import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TeamHero from "@/components/TeamHero";
import TeamStory from "@/components/TeamStory";
import TeamFounders from "@/components/TeamFounders";
import TeamAdvisors from "@/components/TeamAdvisors";

const Team = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <TeamHero />
      <TeamStory />
      <TeamFounders />
      <TeamAdvisors />
      <Footer />
    </div>
  );
};

export default Team;