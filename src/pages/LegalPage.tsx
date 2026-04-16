import { Link, useLocation } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";

const LegalPage = () => {
  const location = useLocation();
  const isMentions = location.pathname === "/mentions-legales";

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[760px] mx-auto px-8 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground text-xs tracking-[.1em] uppercase mb-12 no-underline hover:text-primary transition-colors">
          ← Retour
        </Link>
        {isMentions ? (
          <>
            <SectionHeader tag="// Légal" title="Mentions légales" />
            <div className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3 mt-8">Éditeur du site</h3>
                <p>ActuaireX — Blog personnel sur l'actuariat et l'assurance. Basé en Côte d'Ivoire.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Hébergement</h3>
                <p>Ce site est hébergé par Netlify, Inc. — 512 2nd Street, San Francisco, CA 94107, USA.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Propriété intellectuelle</h3>
                <p>Tout le contenu est la propriété d'ActuaireX sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Responsabilité</h3>
                <p>Le contenu est fourni à titre informatif uniquement. Il ne constitue pas un conseil professionnel actuariel, financier ou juridique.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <SectionHeader tag="// Légal" title="Politique de confidentialité" />
            <div className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3 mt-8">Données collectées</h3>
                <p>ActuaireX ne collecte que les données fournies volontairement : nom et email via le formulaire de contact ou la newsletter.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Utilisation</h3>
                <p>Ces données sont utilisées uniquement pour répondre à tes messages ou envoyer la newsletter. Elles ne sont jamais vendues ni partagées.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Cookies</h3>
                <p>Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement. Aucun cookie de tracking ou publicitaire n'est utilisé.</p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Tes droits</h3>
                <p>Tu peux demander la suppression de tes données à tout moment via le formulaire de contact.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LegalPage;
