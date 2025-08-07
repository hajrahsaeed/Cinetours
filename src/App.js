import "./App.css";
import Header from "./Components/Header/header.js"; // Correct
import Hero from "./Components/Herosection/Hero.js"; // Correct
import HowItWorks from "./Components/HowItWorks/HowItWorks.js";
import VideoComparison from "./Components/VideoComparison/VideoComparison.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero
        title="Create Stunning Property Videos Instantly with AI"
        subtitle="Create videos 100x faster from just photos.
Join the top real estate media professionals and agents."
      >
        {/* You can add buttons or other content here */}
      </Hero>
      <VideoComparison
        title="From Photo to Cinematic Video"
        description="See how we transform static property photos into engaging videos"
        comparisons={[
          {
            photo: require("./assets/images/before1.png"), // Path to your photo
            video: require("./assets/videos/before1.mp4"), // Path to your video
          },
          {
            photo: require("./assets/images/before2.png"), // Path to your photo
            video: require("./assets/videos/before2.mp4"), // Path to your video
          }
        ]}
        slideInterval={6000} // 6 seconds per comparison
      />

      <HowItWorks />
    </div>
  );
}

export default App;
