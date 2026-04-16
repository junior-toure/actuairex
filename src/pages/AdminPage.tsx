import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import FileUpload from "@/components/admin/FileUpload";

type Tab = "articles" | "videos" | "glossaire" | "ressources" | "projets" | "abonnes";

const tabs: { key: Tab; label: string }[] = [
  { key: "articles", label: "Articles" },
  { key: "videos", label: "Vidéos" },
  { key: "glossaire", label: "Glossaire" },
  { key: "ressources", label: "Ressources" },
  { key: "projets", label: "Projets" },
  { key: "abonnes", label: "Abonnés" },
];

const AdminPage = () => {
  const { session, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("articles");
  const queryClient = useQueryClient();

  if (loading) return <div className="min-h-screen pt-12 flex items-center justify-center text-muted-foreground">Chargement...</div>;
  if (!session || !isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Administration</h1>
            <p className="text-xs text-muted-foreground mt-1">{session.user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="font-mono text-[11px] tracking-[.08em] uppercase px-4 py-2 border border-border text-muted-foreground no-underline hover:border-primary hover:text-primary transition-all">
              Voir le site
            </Link>
            <button onClick={() => signOut()} className="font-mono text-[11px] tracking-[.08em] uppercase px-4 py-2 border border-border text-muted-foreground hover:border-destructive hover:text-destructive cursor-pointer transition-all bg-transparent">
              Déconnexion
            </button>
          </div>
        </div>

        <div className="flex gap-0 border-b border-border mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 font-mono text-[11px] tracking-[.08em] uppercase cursor-pointer bg-transparent border-b-2 transition-colors ${
                tab === t.key ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "abonnes" ? <SubscribersPanel /> : <AdminTable table={tab as ContentTab} queryClient={queryClient} />}
      </div>
    </div>
  );
};

type ContentTab = Exclude<Tab, "abonnes">;

function AdminTable({ table, queryClient }: { table: ContentTab; queryClient: ReturnType<typeof useQueryClient> }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  const deleteItem = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await supabase.from(table).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: [table] });
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    if (table === "glossaire") return;
    await supabase.from(table).update({ published: !current } as any).eq("id", id);
    queryClient.invalidateQueries({ queryKey: [table] });
    load();
  };

  const fields = getFields(table);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-muted-foreground">{items.length} élément(s)</span>
        <button onClick={() => { setCreating(true); setEditing(getEmptyItem(table)); }} className="font-mono text-[11px] font-bold tracking-[.1em] uppercase px-5 py-2 bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-85 transition-opacity">
          + Ajouter
        </button>
      </div>

      {(editing || creating) && (
        <EditForm
          item={editing}
          fields={fields}
          table={table}
          onSave={async (item) => {
            if (creating) {
              const { id, created_at, updated_at, ...rest } = item;
              await supabase.from(table).insert(rest as any);
            } else {
              const { created_at, updated_at, ...rest } = item;
              await supabase.from(table).update(rest as any).eq("id", item.id);
            }
            setEditing(null);
            setCreating(false);
            queryClient.invalidateQueries({ queryKey: [table] });
            load();
          }}
          onCancel={() => { setEditing(null); setCreating(false); }}
        />
      )}

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : (
        <div className="space-y-px">
          {items.map((item) => (
            <div key={item.id} className="bg-surface-1 p-5 flex items-center gap-4 flex-wrap hover:bg-surface-2 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-serif text-base font-bold text-white truncate">{item.titre || item.terme}</div>
                <div className="text-xs text-muted-foreground mt-1 truncate">{item.resume || item.description || item.definition || ""}</div>
              </div>
              {"published" in item && (
                <span className={`text-[10px] tracking-[.1em] uppercase px-2 py-0.5 border ${item.published ? "text-primary border-green-glow" : "text-text-dim border-border"}`}>
                  {item.published ? "Publié" : "Brouillon"}
                </span>
              )}
              <div className="flex gap-2">
                {"published" in item && (
                  <button onClick={() => togglePublish(item.id, item.published)} className="text-[11px] text-muted-foreground hover:text-primary cursor-pointer bg-transparent border-none font-mono">
                    {item.published ? "Dépublier" : "Publier"}
                  </button>
                )}
                <button onClick={() => { setCreating(false); setEditing({ ...item }); }} className="text-[11px] text-muted-foreground hover:text-primary cursor-pointer bg-transparent border-none font-mono">
                  Modifier
                </button>
                <button onClick={() => deleteItem(item.id)} className="text-[11px] text-muted-foreground hover:text-destructive cursor-pointer bg-transparent border-none font-mono">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditForm({ item, fields, table, onSave, onCancel }: {
  item: any;
  fields: { key: string; label: string; type: "text" | "textarea" | "date" | "boolean" | "file" | "image" }[];
  table: string;
  onSave: (item: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(item);

  return (
    <div className="bg-surface-1 border border-border p-6 mb-6">
      <h3 className="font-mono text-xs tracking-[.1em] uppercase text-primary mb-4">{item.id ? "Modifier" : "Nouveau"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "file" || f.type === "image" ? "md:col-span-2" : ""}>
            <label className="block text-[11px] text-muted-foreground mb-1 font-mono tracking-[.05em] uppercase">{f.label}</label>
            {f.type === "boolean" ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[f.key] ?? false}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                  className="accent-primary"
                />
                <span className="text-xs text-foreground">{form[f.key] ? "Oui" : "Non"}</span>
              </label>
            ) : f.type === "textarea" ? (
              <textarea
                className="w-full bg-background border border-border px-3 py-2 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors resize-none h-32 placeholder:text-muted-foreground"
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ) : f.type === "file" ? (
              <FileUpload
                value={form[f.key] ?? ""}
                onChange={(url) => setForm({ ...form, [f.key]: url })}
                accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                folder={table}
                label="Upload fichier"
              />
            ) : f.type === "image" ? (
              <FileUpload
                value={form[f.key] ?? ""}
                onChange={(url) => setForm({ ...form, [f.key]: url })}
                accept="image/*"
                folder={`${table}/images`}
                label="Upload image"
              />
            ) : (
              <input
                className="w-full bg-background border border-border px-3 py-2 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                type={f.type}
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => onSave(form)} className="font-mono text-[11px] font-bold tracking-[.1em] uppercase px-5 py-2 bg-primary text-primary-foreground border-none cursor-pointer hover:opacity-85 transition-opacity">
          Sauvegarder
        </button>
        <button onClick={onCancel} className="font-mono text-[11px] tracking-[.1em] uppercase px-5 py-2 bg-transparent border border-border text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-all">
          Annuler
        </button>
      </div>
    </div>
  );
}

function getFields(table: ContentTab) {
  const common = { text: "text" as const, textarea: "textarea" as const, date: "date" as const, bool: "boolean" as const, file: "file" as const, image: "image" as const };
  switch (table) {
    case "articles":
      return [
        { key: "titre", label: "Titre", type: common.text },
        { key: "categorie", label: "Catégorie", type: common.text },
        { key: "tag", label: "Tag", type: common.text },
        { key: "lecture", label: "Temps de lecture", type: common.text },
        { key: "date", label: "Date", type: common.date },
        { key: "published", label: "Publié", type: common.bool },
        { key: "url_page", label: "🔗 URL page HTML complète (optionnel)", type: common.text },
        { key: "resume", label: "Résumé", type: common.textarea },
        { key: "contenu", label: "Contenu", type: common.textarea },
      ];
    case "videos":
      return [
        { key: "titre", label: "Titre", type: common.text },
        { key: "url", label: "URL vidéo", type: common.text },
        { key: "plateforme", label: "Plateforme", type: common.text },
        { key: "duree", label: "Durée", type: common.text },
        { key: "date", label: "Date", type: common.date },
        { key: "published", label: "Publié", type: common.bool },
        { key: "description", label: "Description", type: common.textarea },
      ];
    case "glossaire":
      return [
        { key: "terme", label: "Terme", type: common.text },
        { key: "categorie", label: "Catégorie", type: common.text },
        { key: "definition", label: "Définition", type: common.textarea },
        { key: "exemple", label: "Exemple", type: common.textarea },
      ];
    case "ressources":
      return [
        { key: "titre", label: "Titre", type: common.text },
        { key: "type", label: "Type", type: common.text },
        { key: "niveau", label: "Niveau", type: common.text },
        { key: "prix", label: "Prix", type: common.text },
        { key: "gratuit", label: "Gratuit", type: common.bool },
        { key: "telechargeable", label: "Téléchargeable", type: common.bool },
        { key: "published", label: "Publié", type: common.bool },
        { key: "type_fichier", label: "Type fichier", type: common.text },
        { key: "auteur", label: "Auteur", type: common.text },
        { key: "preview", label: "Image d'aperçu", type: common.image },
        { key: "lien_achat", label: "Lien achat", type: common.text },
        { key: "lien_lecture", label: "Fichier / Lien lecture", type: common.file },
        { key: "url_page", label: "🔗 URL page HTML complète (optionnel)", type: common.text },
        { key: "description", label: "Description", type: common.textarea },
      ];
    case "projets":
      return [
        { key: "titre", label: "Titre", type: common.text },
        { key: "categorie", label: "Catégorie", type: common.text },
        { key: "tag", label: "Tag", type: common.text },
        { key: "date", label: "Date", type: common.date },
        { key: "published", label: "Publié", type: common.bool },
        { key: "url_page", label: "🔗 URL page HTML complète (optionnel)", type: common.text },
        { key: "pdf", label: "Fichier PDF", type: common.file },
        { key: "img", label: "Image du projet", type: common.image },
        { key: "type_fichier", label: "Type fichier", type: common.text },
        { key: "description", label: "Description", type: common.textarea },
      ];
  }
}

function getEmptyItem(table: ContentTab) {
  switch (table) {
    case "articles":
      return { titre: "", resume: "", contenu: "", categorie: "Général", tag: "", lecture: "5 min", date: new Date().toISOString().split("T")[0], published: false, url_page: "" };
    case "videos":
      return { titre: "", description: "", url: "", plateforme: "YouTube", duree: "", date: new Date().toISOString().split("T")[0], published: false };
    case "glossaire":
      return { terme: "", categorie: "", definition: "", exemple: "" };
    case "ressources":
      return { titre: "", description: "", type: "", niveau: "", prix: "", gratuit: false, preview: "", lien_achat: "", lien_lecture: "", type_fichier: "", auteur: "ActuaireX", telechargeable: true, published: false, url_page: "" };
    case "projets":
      return { titre: "", description: "", categorie: "", tag: "", date: new Date().toISOString().split("T")[0], pdf: "", img: "", type_fichier: "", published: false, url_page: "" };
  }
}

function SubscribersPanel() {
  const [subs, setSubs] = useState<{ id: string; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
    setSubs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteSub = async (id: string) => {
    if (!confirm("Supprimer cet abonné ?")) return;
    await supabase.from("subscribers").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-muted-foreground">{subs.length} abonné(s)</span>
      </div>
      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : subs.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun abonné pour le moment.</p>
      ) : (
        <div className="space-y-px">
          {subs.map((s) => (
            <div key={s.id} className="bg-surface-1 p-5 flex items-center gap-4 hover:bg-surface-2 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm text-foreground">{s.email}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Inscrit le {new Date(s.created_at).toLocaleDateString("fr-FR")}
                </div>
              </div>
              <button onClick={() => deleteSub(s.id)} className="text-[11px] text-muted-foreground hover:text-destructive cursor-pointer bg-transparent border-none font-mono">
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
