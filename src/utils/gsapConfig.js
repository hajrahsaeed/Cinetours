import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins globally
gsap.registerPlugin(ScrollTrigger, SplitText);

// Optional: Configure GSAP
gsap.config({
  nullTargetWarn: false
});

export { gsap, ScrollTrigger, SplitText };