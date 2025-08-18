import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/header.js";
import Hero from "./Components/Herosection/Hero.js";
import ClientLogos from "./Components/ClientLogos/ClientLogos.js";
import HowItWorks from "./Components/HowItWorks/HowItWorks.js";
import VideoComparison from "./Components/VideoComparison/VideoComparison.js";
import Pricing from "./Components/Pricing/Pricing.js";
import CostComparison from "./Components/CostComparison/CostComparison.js";
import Testimonials from "./Components/Testimonials/Testimonials.js";
import Footer from "./Components/Footer/Footer.js";
import ClientPortal from "./pages/ClientPortal/ClientPortal.js";
import AdminPanel from "./pages/AdminPortal/AdminPortal";

// Create a separate HomePage component for cleaner routing
const HomePage = () => (
  <>
    <Hero
      title={
        <>
          Turn Listing Photos Into Cinematic  <br /> Walkthrough Videos— for 1/3
          the Price
        </>
      }
      subtitle="Get a stunning video in 24–48 hours. Affordable pricing, no filming required."
    />
    <ClientLogos />
    <VideoComparison
      title="From Photo to Cinematic Video"
      description="See how we transform static property photos into engaging videos"
      comparisons={[
        {
          photo: require("./assets/images/before1.png"),
          video: require("./assets/videos/before1.mp4"),
        },
        {
          photo: require("./assets/images/before2.png"),
          video: require("./assets/videos/before2.mp4"),
        },
      ]}
      slideInterval={6000}
    />
    <HowItWorks />
    <Pricing />
    <CostComparison />
    <Testimonials />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* Homepage Route */}
          <Route path="/" element={<HomePage />} />

          {/* Client Portal Route */}
          <Route path="/portal" element={<ClientPortal />} />

          {/* Pricing Page Route */}
          <Route path="/pricing" element={<Pricing />} />

          {/* Admin Panel Route */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
