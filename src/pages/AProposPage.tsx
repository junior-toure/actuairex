import SectionHeader from "@/components/SectionHeader";
import { apropos, siteConfig } from "@/data/config";

const AProposPage = () => {
  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// À propos" title="Qui est ActuaireX ?" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20 mb-20">
          <div>
            <div className="w-full aspect-square bg-surface-2 border border-border flex items-center justify-center font-serif text-[5rem] font-black text-primary italic relative">
              X
              <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[.1em] text-text-dim">CI</span>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-[2.2rem] font-bold text-white leading-tight mb-4">{apropos.titre}</h2>
            <p className="font-sans text-[17px] font-normal text-primary leading-relaxed mb-6">{apropos.intro}</p>
            {apropos.paragraphes.map((p, i) => (
              <p key={i} className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </div>

        <SectionHeader tag="// Valeurs" title="Ce qui guide ActuaireX" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {apropos.valeurs.map((v) => (
            <div key={v.titre} className="bg-surface-1 p-8">
              <div className="text-2xl text-primary mb-4">{v.icone}</div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">{v.titre}</h4>
              <p className="font-sans text-[13px] text-muted-foreground leading-relaxed font-light">{v.texte}</p>
            </div>
          ))}
        </div>

        {/* Substack CTA */}
        <div className="bg-surface-1 border border-border p-8 mt-12 flex items-center gap-8 flex-wrap">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold text-white mb-2">Rejoindre la communauté ActuaireX</h3>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Articles exclusifs, outils actuariels et analyses — directement dans ta boîte email.
            </p>
            <div className="flex gap-6 mt-4 flex-wrap">
              <span className="font-mono text-[11px] text-primary tracking-[.08em]">// Hebdomadaire</span>
              <span className="font-mono text-[11px] text-primary tracking-[.08em]">// Gratuit</span>
              <span className="font-mono text-[11px] text-primary tracking-[.08em]">// Substack</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <a
              href={siteConfig.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[13px] font-bold tracking-[.08em] uppercase px-7 py-3.5 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity whitespace-nowrap flex-shrink-0"
            >
              S'abonner gratuitement →
            </a>
            <span className="text-[11px] text-text-dim font-mono">Désabonnement en 1 clic. Aucun spam.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AProposPage;
