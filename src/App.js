import './App.css';
import Header from './Components/Header/header.js'; // Correct
import Hero from './Components/Herosection/Hero.js'; // Correct
import VideoComparison from './Components/VideoComparison/VideoComparison.js';



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
        title="See the Transformation"
        description="Professional real estate videos made seamlessly"

        videos={[
          {
            before: require("./assets/videos/before2.mp4"),
            after: require("./assets/videos/before2.mp4")
          },
          {
            before: ("./assets/videos/before1.mp4"),
            after: ("./assets/videos/before1.mp4")
          }
        ]}
        slideInterval={500} // Optional: change slide duration
      />


    </div>
  );
}


export default App;
