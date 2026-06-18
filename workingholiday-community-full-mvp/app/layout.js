import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "WorkAway Global",
  description: "Global working holiday community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
