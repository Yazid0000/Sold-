// Sélecteur à segments (Cordial / Neutre / Ferme, Mensuel / Annuel).
// De vrais boutons radio cachés : le navigateur gère seul les flèches du clavier et la sélection.
// Pas de "use client" ici : ce fichier n'est importé que par des composants client, il en devient un.
type Props<T extends string> = {
  name: string;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function Segments<T extends string>({ name, label, options, value, onChange, className = "" }: Props<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={`inline-flex gap-1 rounded-md border border-border p-1 ${className}`}>
      {options.map((o) => (
        <label key={o.value} className="relative">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={o.value === value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span className="flex h-11 cursor-pointer items-center whitespace-nowrap rounded-md px-4 font-medium peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}
