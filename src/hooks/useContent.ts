import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useArticle = (id: string | undefined) =>
  useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useVideos = () =>
  useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useGlossaire = () =>
  useQuery({
    queryKey: ["glossaire"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("glossaire")
        .select("*")
        .order("terme", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useRessources = () =>
  useQuery({
    queryKey: ["ressources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ressources")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useProjets = () =>
  useQuery({
    queryKey: ["projets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projets")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
