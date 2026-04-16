import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border px-8 py-8 flex justify-between items-center flex-wrap gap-4 text-[11px] text-text-dim">
    <span>© {new Date().getFullYear()} ActuaireX — Côte d'Ivoire</span>
    <div className="flex gap-8 flex-wrap">
      <Link to="/mentions-legales" className="text-text-dim no-underline hover:text-primary transition-colors">Mentions légales</Link>
      <Link to="/confidentialite" className="text-text-dim no-underline hover:text-primary transition-colors">Confidentialité</Link>
      <Link to="/contact" className="text-text-dim no-underline hover:text-primary transition-colors">Contact</Link>
    </div>
  </footer>
);

export default Footer;
