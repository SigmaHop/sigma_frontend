"use client";
import anime from "animejs";
import Letterize from "letterizejs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const test = new Letterize({
      targets: ".animate-me",
    });

    const animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(100, {
        grid: [test.list[0].length, test.list.length],
        from: "center",
      }),
      loop: true,
    });

    animation
      .add({
        scale: 0.5,
        duration: 1000,
      })
      .add({
        letterSpacing: "10px",
        duration: 1000,
      })
      .add({
        scale: 1,
        duration: 1000,
      })
      .add({
        letterSpacing: "6px",
        duration: 1000,
      });
  }, []);

  // Function to determine if a character is part of the Sigma pattern
  const isPartOfSigma = (line, index, totalLines) => {
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
    <div className="flex flex-col w-screen h-screen items-center justify-center text-[5px] font-extrabold bg-black">
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
                  color: "white",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}
