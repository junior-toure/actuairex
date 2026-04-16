interface SectionHeaderProps {
  tag: string;
  title: string;
}

const SectionHeader = ({ tag, title }: SectionHeaderProps) => (
  <div className="flex items-baseline gap-6 mb-12 pb-4 border-b border-border">
    <span className="text-[11px] tracking-[.2em] uppercase text-primary whitespace-nowrap">
      {tag}
    </span>
    <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white">
      {title}
    </h2>
    <div className="flex-1 h-px bg-border" />
  </div>
);

export default SectionHeader;
