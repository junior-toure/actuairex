import { useParams, Link } from "react-router-dom";
import { useArticle } from "@/hooks/useContent";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const ArticleReaderPage = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useArticle(id);

  if (isLoading) return <div className="min-h-screen pt-12 flex items-center justify-center text-muted-foreground">Chargement...</div>;
  if (!article) return <div className="min-h-screen pt-12 flex items-center justify-center text-muted-foreground">Article introuvable.</div>;

  const paragraphs = article.contenu?.split("\n\n") ?? [];
  const hasFullPage = (article as any).url_page;

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[760px] mx-auto px-8 py-20">
        <Link to="/articles" className="inline-flex items-center gap-2 text-muted-foreground text-xs tracking-[.1em] uppercase mb-12 no-underline hover:text-primary transition-colors">
          ← Retour aux articles
        </Link>
        <div className="flex gap-4 items-center mb-6 flex-wrap">
          <span className="text-[10px] tracking-[.15em] uppercase text-primary border border-green-glow px-2.5 py-0.5">{article.categorie}</span>
          <span className="text-[10px] tracking-[.15em] uppercase text-muted-foreground border border-border px-2.5 py-0.5">{article.tag}</span>
          <span className="text-xs text-text-dim">{formatDate(article.date)}</span>
          <span className="text-xs text-text-dim">{article.lecture} de lecture</span>
        </div>
        <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight mb-6">{article.titre}</h1>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-12 pb-12 border-b border-border">{article.resume}</p>

        {/* Bouton page HTML complète */}
        {hasFullPage && (
          <div className="bg-surface-1 border border-primary/30 p-6 mb-10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[10px] tracking-[.15em] uppercase text-primary mb-1">// Version complète disponible</div>
              <p className="font-sans text-sm text-muted-foreground font-light">
                Cet article inclut des graphiques, tableaux et code interactif dans sa version complète.
              </p>
            </div>
            <a
              href={(article as any).url_page}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold tracking-[.1em] uppercase px-5 py-2.5 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              Lire la version complète →
            </a>
          </div>
        )}

        {/* Contenu texte */}
        {paragraphs.length > 0 && paragraphs[0] !== "" && (
          <div className="font-sans text-base font-light text-foreground leading-relaxed space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleReaderPage;
