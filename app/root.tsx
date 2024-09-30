import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ThemeProvider } from "next-themes";
import { DarkModeToggle } from "~/components/DarkModeToggle";
import { FaHome } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Analytics } from "@vercel/analytics/react"

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <Meta />
        <Links />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3926811661344871"
        crossOrigin="anonymous"></script>
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            {!isHomePage && (
              <div className="fixed top-4 left-4 z-50">
                <Button asChild variant="outline" size="icon">
                  <Link to="/">
                    <FaHome className="w-4 h-4" />
                    <span className="sr-only">Home</span>
                  </Link>
                </Button>
              </div>
            )}
            <div className="fixed top-4 right-4 z-50">
              <DarkModeToggle />
            </div>
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

