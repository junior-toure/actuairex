import SectionHeader from "@/components/SectionHeader";
import { useProjets } from "@/hooks/useContent";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const ProjetsPage = () => {
  const { data: projets, isLoading } = useProjets();

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Projets" title="Projets & Outils" />
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : projets && projets.length > 0 ? (
          <div>
            {projets.map((p) => {
              const urlPage = (p as any).url_page;
              const lien = urlPage || p.pdf;
              return (
                <div key={p.id} className="border-b border-border py-7">
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <span className="text-[10px] tracking-[.15em] uppercase text-primary border border-green-glow px-2.5 py-0.5">{p.categorie}</span>
                    <span className="text-[10px] tracking-[.15em] uppercase text-muted-foreground border border-border px-2.5 py-0.5">{p.tag}</span>
                    {urlPage && (
                      <span className="text-[10px] tracking-[.15em] uppercase text-primary border border-primary/30 px-2.5 py-0.5">Page interactive</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white leading-snug mb-3">{p.titre}</h3>
                  <p className="font-sans text-[13px] text-muted-foreground leading-relaxed font-light mb-5">{p.description}</p>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-[11px] text-text-dim">{formatDate(p.date)}</span>
                    {lien ? (
                      <a
                        href={lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] font-bold tracking-[.1em] uppercase px-4 py-2 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity"
                      >
                        {urlPage ? "Consulter la page →" : "Consulter →"}
                      </a>
                    ) : (
                      <span className="text-[11px] text-text-dim">En préparation</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">Aucun projet pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default ProjetsPage;
