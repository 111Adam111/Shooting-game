import "./styles.scss";
import type { Metadata } from "next";
import ProviderWrapper from "./redux/ProviderWrapper";

export const metadata: Metadata = {
  title: "Shooting game",
  description: "New frontend with menu and highscore table",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="background">
          <ProviderWrapper>{children}</ProviderWrapper>
        </div>
      </body>
    </html>
  );
}
