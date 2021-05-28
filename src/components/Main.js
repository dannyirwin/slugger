import About from "./About";
import Game from "./Game";
import Instructions from "./Instructions";

export default function Main({ setMovementButtons }) {
  return (
    <main>
      <Instructions setMovementButtons={setMovementButtons} />
      <Game />
      <About />
    </main>
  );
}
