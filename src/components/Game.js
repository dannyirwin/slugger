import { useRef, useEffect } from "react";
import runGame from "../slugger";

export default function Game() {
  let ref = useRef();

  useEffect(() => {
    runGame(ref.current);
  });

  return <canvas ref={ref}></canvas>;
}
