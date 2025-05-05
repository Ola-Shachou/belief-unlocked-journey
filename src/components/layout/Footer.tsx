
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/50 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Belief Unlocked. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/about" className="hover:underline hover:text-foreground">
            About
          </Link>
          <Link to="/privacy" className="hover:underline hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="hover:underline hover:text-foreground">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
