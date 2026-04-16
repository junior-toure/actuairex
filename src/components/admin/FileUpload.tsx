import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
  label?: string;
}

const FileUpload = ({ value, onChange, accept = "image/*,application/pdf", folder = "uploads", label = "Fichier" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("content")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("content")
      .getPublicUrl(fileName);

    onChange(publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="font-mono text-[11px] tracking-[.08em] uppercase px-4 py-2 border border-border text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-all bg-transparent disabled:opacity-50"
        >
          {uploading ? "Upload..." : `📁 ${label}`}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-mono text-[10px] text-muted-foreground hover:text-destructive cursor-pointer bg-transparent border-none"
          >
            ✕ Retirer
          </button>
        )}
      </div>

      {value && (
        <div className="flex items-center gap-2">
          {value.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i) ? (
            <img src={value} alt="preview" className="h-12 w-12 object-cover border border-border" />
          ) : (
            <span className="text-[11px] text-primary font-mono">📄 Fichier uploadé</span>
          )}
          <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">{value.split("/").pop()?.split("?")[0]}</span>
        </div>
      )}

      {/* Fallback: manual URL input */}
      <input
        type="text"
        placeholder="...ou collez une URL externe"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border px-3 py-2 font-mono text-[13px] text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
      />

      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
};

export default FileUpload;
