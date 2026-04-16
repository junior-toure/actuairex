import SectionHeader from "@/components/SectionHeader";
import { devenirActuaire } from "@/data/devenir-actuaire";

const DevenirActuairePage = () => {
  const d = devenirActuaire;

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-20">
        <SectionHeader tag="// Orientation" title="Devenir actuaire" />
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-12 max-w-[700px]">
          {d.intro}
        </p>

        {/* Le métier */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-6 pb-3 border-b border-border">Le métier</h3>
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8">{d.metier.description}</p>
          <div className="bg-surface-1 border border-border p-8 flex items-center gap-8 flex-wrap mb-8">
            <div className="font-serif text-[2.5rem] font-black text-primary leading-none">★</div>
            <div className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              <strong className="text-white font-mono block mb-1">Salaire débutant</strong>
              {d.metier.salaire_debutant}
            </div>
          </div>
          <h4 className="font-mono text-xs tracking-[.1em] uppercase text-muted-foreground mb-4">Débouchés</h4>
          <div className="flex flex-wrap gap-2">
            {d.metier.debouches.map((x) => (
              <span key={x} className="text-xs border border-border text-muted-foreground px-3 py-1.5">{x}</span>
            ))}
          </div>
        </div>

        {/* Études */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-6 pb-3 border-b border-border">Études et formations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {d.etudes.map((e) => (
              <div key={e.niveau} className="bg-surface-1 p-6">
                <div className="text-xl text-primary mb-3">◆</div>
                <h4 className="font-mono text-[13px] font-bold text-white mb-2">{e.niveau}</h4>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed font-light mb-3">{e.description}</p>
                {e.exemples.map((ex) => (
                  <div key={ex} className="text-[11px] text-primary py-0.5">· {ex}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-6 pb-3 border-b border-border">Compétences clés</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {d.competences.map((c) => (
              <div key={c.domaine} className="bg-surface-1 p-6">
                <div className="text-xl text-primary mb-3">◉</div>
                <h4 className="font-mono text-[13px] font-bold text-white mb-2">{c.domaine}</h4>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed font-light">{c.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Matières */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-6 pb-3 border-b border-border">Matières étudiées</h3>
          <div className="flex flex-wrap gap-2">
            {d.matieres.map((m) => (
              <span key={m} className="text-xs border border-border text-muted-foreground px-3 py-1.5">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevenirActuairePage;
