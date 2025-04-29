import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ⬅️ Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // ⬅️ Register the plugin

function ScrollAnimation() {
  const boxRef = useRef();

  useEffect(() => {
    gsap.from(boxRef.current, { 
      opacity: 0, 
      y: 100, 
      duration: 1,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
      }
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div ref={boxRef} style={{ height: '300px', background: 'lightblue', marginTop: '500px' }}>
        Animated on Scroll
      </div>
    </div>
  );
}

export default ScrollAnimation;
