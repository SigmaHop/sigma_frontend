"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

const FloatingCharacters = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const characters = "Σ";
    const numberOfElements = 75;
    const elements = [];

    // Create random characters
    for (let i = 0; i < numberOfElements; i++) {
      const element = document.createElement("div");
      element.innerText =
        characters[Math.floor(Math.random() * characters.length)];
      element.className =
        "absolute text-slate-300/30 text-sm pointer-events-none";
      element.style.left = `${Math.random() * 100}vw`;
      element.style.top = `${Math.random() * 100}vh`;
      elements.push(element);
      containerRef.current?.appendChild(element);
    }

    // Animate each element
    elements.forEach((element) => {
      const delay = anime.random(0, 2000);
      const duration = anime.random(3000, 6000);

      anime({
        targets: element,
        translateX: () => {
          const movement = anime.random(-200, 200);
          return [movement, -movement];
        },
        translateY: () => {
          const movement = anime.random(-200, 200);
          return [movement, -movement];
        },
        rotate: () => {
          return anime.random(-360, 360);
        },
        opacity: [0.2, 0.5],
        duration: duration,
        delay: delay,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    });

    // Cleanup function
    return () => {
      elements.forEach((element) => {
        element.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden -z-10"
    ></div>
  );
};

export default FloatingCharacters;
