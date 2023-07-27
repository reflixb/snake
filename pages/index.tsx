import { useState, useEffect } from "react";

const SnakeGame = () => {
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [headLeft, setHeadLeft] = useState(0);
  const [headDown, setHeadDown] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      switch (snakeDirection) {
        case "up":
          setHeadDown((prevHeadDown) => prevHeadDown - 15);
          break;
        case "left":
          setHeadLeft((prevHeadLeft) => prevHeadLeft - 15);
          break;
        case "down":
          setHeadDown((prevHeadDown) => prevHeadDown + 15);
          break;
        case "right":
          setHeadLeft((prevHeadLeft) => prevHeadLeft + 15);
          break;
        default:
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [snakeDirection]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
          setSnakeDirection("up");
          break;
        case "a":
          setSnakeDirection("left");
          break;
        case "s":
          setSnakeDirection("down");
          break;
        case "d":
          setSnakeDirection("right");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const maxX = 380;
  const maxY = 380;
  const [genX, setGenX] = useState(0);
  const [genY, setGenY] = useState(0);
  const [score, setScore] = useState(-2);

  useEffect(() => {
    setGenX(Math.floor(Math.random() * 380));
    setGenY(Math.floor(Math.random() * 380));
    console.log(genX, genY);
  }, []);

  const boundedHeadLeft = Math.min(Math.max(0, headLeft), maxX);
  const boundedHeadDown = Math.min(Math.max(0, headDown), maxY);

  console.log(boundedHeadLeft, boundedHeadDown);

  useEffect(() => {
    if (boundedHeadDown === genX || boundedHeadLeft === genY) {
      setScore((score) => score + 1);
    }
  }, [boundedHeadLeft, boundedHeadDown]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>{score}</div>
        <button
          style={{
            marginBottom: 30,
            border: "2px solid black",
            borderRadius: "10px",
          }}
          // onClick={}
        >
          <div style={{ padding: 5 }}> Start</div>
        </button>
        <div
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "aqua",
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              backgroundColor: "transparent",
              position: "absolute",
              top: `${genY}px`,
              left: `${genX}px`,
            }}
          >
            🍎
          </div>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              backgroundColor: "black",
              position: "absolute",
              top: `${boundedHeadDown}px`,
              left: `${boundedHeadLeft}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
