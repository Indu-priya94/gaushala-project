import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import { LanguageContext } from "../LanguageContext";

import cow from "../assets/cow.jpg";
import milk from "../assets/milkdistribution.jpg";
import food from "../assets/fooddonation.jpg";
import health from "../assets/healthcare.jpg";
import organic from "../assets/organicfood.jpg";

function Slider() {

  const { t } = useContext(LanguageContext);

  const slides = [
    {
      title: t.cowImportance,
      text: t.cowText,
      image: cow,
    },

    {
      title: t.milkTitle,
      text: t.milkText,
      image: milk,
    },

    {
      title: t.foodTitle,
      text: t.foodText,
      image: food,
    },

    {
      title: t.healthTitle,
      text: t.healthText,
      image: health,
    },

    {
      title: t.organicTitle,
      text: t.organicText,
      image: organic,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrent(
        (prev) =>
          (prev + 1) % slides.length
      );

    }, 3000);

    return () => clearInterval(timer);

  }, [slides.length]);

  return (
    <div
      style={{
        background: "#FFF8E7",
        padding: "60px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Left Content */}
        <div
          style={{
            width: "50%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
            }}
          >
            {slides[current].title}
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            {slides[current].text}
          </p>
        </div>

        {/* Right Image */}
        <img
          src={slides[current].image}
          alt={slides[current].title}
          style={{
            width: "430px",
            height: "260px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>
  );
}

export default Slider;