"use client";
import anime from "animejs";
import Letterize from "letterizejs";
import { useEffect } from "react";

export default function SigmaBoxAnimation({ scale = 0.5 }) {
  useEffect(() => {
    const test = new Letterize({
      targets: ".animate-me",
    });

    // Single timeline for both animations
    const animation = anime.timeline({
      targets: ".animate-me",
      delay: anime.stagger(100, {
        grid: [test.list[0].length, test.list.length],
        from: "center",
      }),
      loop: true,
    });

    animation
      .add({
        letterSpacing: "10px",
        marginBottom: "20px",
        duration: 1000,
        easing: "easeInOutQuart",
      })
      .add({
        letterSpacing: "6px",
        marginBottom: "10px",
        duration: 1000,
        easing: "easeInOutQuart",
      });
  }, []);

  // Function to determine if a character is part of the Sigma pattern
  const isPartOfSigma = (line, index) => {
    // Top horizontal line of Sigma
    if (index === 4 || index === 5) return true;
    // Bottom horizontal line of Sigma
    if (index === 24 || index === 25 || index === 26) return true;
    // Diagonal lines of Sigma
    if (index > 5 && index < 24) {
      const position = line.indexOf(".");
      const lastDotPosition = line.lastIndexOf(".");
      if (position !== -1 && lastDotPosition !== -1) return true;
    }
    return false;
  };

  const getCharacterOpacity = (char, lineIndex, charIndex, line) => {
    if (char === "." && isPartOfSigma(line, lineIndex)) {
      return "0"; // Make the Sigma pattern invisible
    }
    return "1"; // Keep other characters visible
  };

  return (
    <div
      className="relative"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className=" flex flex-col items-center justify-center text-xs font-extrabold bg-[var(--background)]"
        style={{
          transform: `translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(${scale}) scaleY(${scale})`,
        }}
      >
        <pre className="font-mono">
          {[
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@*.......................................#@@@@@@@@@",
            "@@@@@@@@@@@%-........=======================-:....#@@@@@@@@@",
            "@@@@@@@@@@@@@*.......:#@@@@@@@@@@@@@@@@@@@@@@@+...#@@@@@@@@@",
            "@@@@@@@@@@@@@@%-.......+@@@@@@@@@@@@@@@@@@@@@@@...#@@@@@@@@@",
            "@@@@@@@@@@@@@@@@*.......:#@@@@@@@@@@@@@@@@@@@@@...#@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@%-.......=@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@*.......:#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@%-.......+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@*.......:#@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@%-.......+@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@*.......:%@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@%-.....+@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@*...:%@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@%-...*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@+...-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@#:..:#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@%-...=@@@@@@@@@@@@@@@@@@@@@###@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@+...:%@@@@@@@@@@@@@@@@@@@@@@...#@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@#:...+@@@@@@@@@@@@@@@@@@@@@@@%...#@@@@@@@@@",
            "@@@@@@@@@@@@@@@@=...-%@@@@@@@@@@@@@@@@@@@@@@@%-...#@@@@@@@@@",
            "@@@@@@@@@@@@@@*.....::::::::::::::::::::::::......#@@@@@@@@@",
            "@@@@@@@@@@@@%-....................................#@@@@@@@@@",
            "@@@@@@@@@@@+......................................#@@@@@@@@@",
            "@@@@@@@@@@*+++++++++++++++++++++++++++++++++++++++%@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
            "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
          ].map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="animate-me text-center whitespace-pre font-mono tracking-[6px]"
              style={{
                fontFamily: "monospace",
                marginBottom: "10px",
              }}
            >
              {[...line].map((char, charIndex) => (
                <span
                  key={charIndex}
                  style={{
                    opacity: getCharacterOpacity(
                      char,
                      lineIndex,
                      charIndex,
                      line
                    ),
                    color: "var(--text-color)",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
