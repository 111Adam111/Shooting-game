import Link from "next/link";
import "./styles.scss";
import CowboyBoardWrapper from "./components/cowboyBoardWrapper/CowboyBoardWrapper";

export default function Home() {
  return (
    <main>
      <CowboyBoardWrapper>
        <div className="menu-container">
          <div className="menu">
            <div>
              <Link className="link" href="/game">
                PLAY
              </Link>
            </div>
            <div>
              <Link className="link" href="/highscores">
                HIGHSCORES
              </Link>
            </div>
            <div>
              <Link className="link" href="/about">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </CowboyBoardWrapper>
    </main>
  );
}
