import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/articles", label: "Articles" },
  { to: "/videos", label: "Vidéos" },
  { to: "/projets", label: "Projets" },
  { to: "/apropos", label: "À propos" },
  { to: "/devenir-actuaire", label: "Devenir actuaire" },
  { to: "/glossaire", label: "Glossaire" },
  { to: "/ressources", label: "Ressources" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-12 bg-background/95 border-b border-border flex items-center justify-between px-6 z-[1000] backdrop-blur-xl">
      <Link to="/" className="font-bold text-[15px] tracking-[.1em] text-primary flex-shrink-0">
        ACTUAIRE<span className="text-muted-foreground font-light">X</span>
      </Link>
      <nav className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row fixed md:static top-12 left-0 right-0 bg-background/[.98] md:bg-transparent border-b md:border-0 border-border z-[999] max-h-[calc(100vh-48px)] md:max-h-none overflow-y-auto`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={`text-[11px] tracking-[.08em] uppercase no-underline px-3 md:px-3 py-4 md:py-0 md:h-12 flex items-center border-b md:border-b-2 border-border md:border-transparent transition-colors whitespace-nowrap ${
              location.pathname === link.to
                ? "text-primary md:border-b-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://actuairex.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[.08em] uppercase text-primary no-underline px-3 py-4 md:py-0 md:h-12 flex items-center whitespace-nowrap"
        >
          Newsletter ↗
        </a>
      </nav>
      <button
        className="md:hidden bg-transparent border-none text-muted-foreground text-xl cursor-pointer flex-shrink-0"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>
    </header>
  );
};

export default Navbar;
