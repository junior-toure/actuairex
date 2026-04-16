import { Link } from "react-router-dom";
import { siteConfig } from "@/data/config";
import SubscribeWidget from "@/components/SubscribeWidget";
import { useArticles, useVideos, useGlossaire, useProjets } from "@/hooks/useContent";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const HomePage = () => {
  const { data: articles } = useArticles();
  const { data: videos } = useVideos();
  const { data: glossaire } = useGlossaire();
  const { data: projets } = useProjets();

  return (
    <div className="min-h-screen pt-12">
      {/* Hero */}
      <section className="min-h-[calc(100vh-48px)] grid grid-rows-[1fr_auto] px-8 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full top-[5%] left-[25%] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(150 100% 45% / 0.05) 0%, transparent 70%)" }} />

        <div className="relative max-w-[900px] mx-auto text-center flex flex-col justify-center">
          <div className="inline-block text-[11px] tracking-[.2em] uppercase text-primary border border-green-glow px-4 py-1 mb-8 mx-auto">
            Côte d'Ivoire · Afrique Francophone · Actuariat
          </div>
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-black leading-[.95] text-white mb-4">
            Actuaire<em className="text-primary">X</em><span className="cursor-blink" />
          </h1>
          <p className="font-serif text-[clamp(1rem,2vw,1.5rem)] font-bold text-muted-foreground mb-6 italic">
            {siteConfig.slogan}
          </p>
          <p className="font-sans text-base font-light text-muted-foreground max-w-[540px] mx-auto mb-10 leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/articles" className="inline-block font-mono text-xs font-bold tracking-[.1em] uppercase px-7 py-3 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity">
              Lire les articles
            </Link>
            <Link to="/devenir-actuaire" className="inline-block font-mono text-xs tracking-[.1em] uppercase px-7 py-3 bg-transparent text-foreground border border-border-bright no-underline hover:border-primary hover:text-primary transition-colors">
              Devenir actuaire
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-12 flex-wrap pt-12 border-t border-border max-w-[900px] mx-auto w-full">
          {[
            { n: articles?.length ?? 0, label: "Articles" },
            { n: videos?.length ?? 0, label: "Vidéos" },
            { n: projets?.length ?? 0, label: "Projets" },
            { n: glossaire?.length ?? 0, label: "Définitions" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.n}<span className="text-primary">+</span></div>
              <div className="text-[11px] tracking-[.1em] uppercase text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      {articles && articles.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-8 py-16">
          <div className="flex items-baseline gap-6 mb-8 pb-4 border-b border-border">
            <span className="text-[11px] tracking-[.2em] uppercase text-primary">// Derniers articles</span>
            <h2 className="font-serif text-2xl font-bold text-white">À lire</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {articles.slice(0, 3).map((a) => (
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
          <Link to="/articles" className="inline-flex items-center gap-2 text-primary text-xs tracking-[.1em] uppercase mt-8 no-underline hover:opacity-75 transition-opacity">
            Voir tous les articles →
          </Link>
        </div>
      )}

      {/* Latest Videos */}
      {videos && videos.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-8 pb-16">
          <div className="flex items-baseline gap-6 mb-8 pb-4 border-b border-border">
            <span className="text-[11px] tracking-[.2em] uppercase text-primary">// Dernières vidéos</span>
            <h2 className="font-serif text-2xl font-bold text-white">À regarder</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {videos.slice(0, 4).map((v) => (
              <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" className="bg-surface-1 p-7 no-underline hover:bg-surface-2 transition-colors">
                <div className="w-full aspect-video bg-surface-3 border border-border flex items-center justify-center mb-5 relative">
                  <span className="text-2xl text-primary opacity-80">{v.plateforme === "TikTok" ? "♪" : "▶"}</span>
                  <span className="absolute top-2 right-2 text-[10px] tracking-[.1em] uppercase bg-background text-primary border border-green-glow px-2 py-0.5">{v.plateforme}</span>
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 text-muted-foreground px-1.5 py-0.5">{v.duree}</span>
                </div>
                <div className="font-serif text-lg font-bold text-white leading-snug mb-2">{v.titre}</div>
                <div className="font-sans text-xs text-muted-foreground leading-relaxed font-light">{v.description}</div>
                <div className="text-[11px] text-text-dim mt-3">{formatDate(v.date)}</div>
              </a>
            ))}
          </div>
          <Link to="/videos" className="inline-flex items-center gap-2 text-primary text-xs tracking-[.1em] uppercase mt-8 no-underline hover:opacity-75 transition-opacity">
            Voir toutes les vidéos →
          </Link>
        </div>
      )}

      <SubscribeWidget />
    </div>
  );
};

export default HomePage;
