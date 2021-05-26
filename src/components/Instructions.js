export default function Instructions() {
  const isOnMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i);

  return (
    <section className="side">
      <h2>How To Play</h2>
      Control the slug and eat as many snacks as possible! Careful not to run
      into the edge or yourself as you grow.
      <ul>
        <li>Use WSAD or your arrow keys to control the slug</li>
        <li>Begin the game by pressing "p"</li>
      </ul>
    </section>
  );
}
