import React from "react";
import hero from "../assets/hero.png";

export default function Hero() {
  return (
    <div>
      <img
        src={hero}
        alt="hero image"
        className="w-full max-h-600 object-cover"
      />
    </div>
  );
}
