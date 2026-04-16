import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import { useArticles } from "@/hooks/useContent";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const ArticlesPage = () => {
  const { data: articles, isLoading } = useArticles();
  const [cat, setCat] = useState("Tous");

  const categories = ["Tous", ...new Set(articles?.map((a) => a.categorie) ?? [])];
  const filtered = cat === "Tous" ? articles : articles?.filter((a) => a.categorie === cat);

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Articles" title="Actuariat expliqué simplement" />
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`bg-transparent border px-3 py-1 font-mono text-[11px] tracking-[.1em] uppercase cursor-pointer transition-all ${
                cat === c ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {filtered.map((a) => (
              <Link key={a.id} to={`/articles/${a.id}`} className="bg-surface-1 p-7 no-underline relative overflow-hidden group hover:bg-surface-2 transition-colors">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-primary scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />
                <div className="text-[10px] tracking-[.15em] uppercase text-primary mb-3">{a.categorie} — {a.tag}</div>
                <h3 className="font-serif text-lg font-bold text-white leading-snug mb-3">{a.titre}</h3>
                <p className="font-sans text-[13px] text-muted-foreground leading-relaxed font-light">{a.resume}</p>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-border text-[11px] text-text-dim">
                  <span>{formatDate(a.date)}</span>
                  <span className="text-primary">{a.lecture} →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">Aucun article dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
