import Link from "next/link";
import "./styles.scss";

export default function Home() {
  return (
    <main>
      <div className="menu-container">
        <div className="menu">
          <div className="btn">
            <Link className="link" href="/game">
              PLAY
            </Link>
          </div>
          <div className="btn">
            <Link className="link" href="/highscores">
              HIGHSCORES
            </Link>
          </div>
          <div className="btn">
            <Link className="link" href="/about">
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
