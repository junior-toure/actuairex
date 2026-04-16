import SectionHeader from "@/components/SectionHeader";
import { useVideos } from "@/hooks/useContent";
import { siteConfig } from "@/data/config";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const VideosPage = () => {
  const { data: videos, isLoading } = useVideos();

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Vidéos" title="Contenus vidéo" />
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Chargement...</p>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {videos.map((v) => (
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
        ) : (
          <p className="text-muted-foreground text-center py-12">Aucune vidéo pour le moment.</p>
        )}

        {/* TikTok / YouTube CTA */}
        <div className="bg-surface-1 border border-border p-8 mt-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-serif text-base font-bold text-white mb-2">Suivre ActuaireX sur TikTok</p>
            <p className="font-sans text-sm text-muted-foreground font-light">Vidéos courtes sur l'actuariat. Nouveau contenu chaque semaine.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-bold tracking-[.1em] uppercase px-5 py-2.5 bg-primary text-primary-foreground no-underline hover:opacity-85 transition-opacity">
              Voir sur TikTok →
            </a>
            <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[.1em] uppercase px-5 py-2.5 bg-transparent text-foreground border border-border-bright no-underline hover:border-primary hover:text-primary transition-colors">
              Voir sur YouTube →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
