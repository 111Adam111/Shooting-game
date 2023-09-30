import type { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "./redux/store";


export const metadata: Metadata = {
  title: "Shooting game",
  description: "New frontend with menu and highscore table",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
