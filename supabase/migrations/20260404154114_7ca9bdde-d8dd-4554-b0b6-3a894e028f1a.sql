
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  resume TEXT NOT NULL DEFAULT '',
  contenu TEXT NOT NULL DEFAULT '',
  categorie TEXT NOT NULL DEFAULT 'Général',
  tag TEXT NOT NULL DEFAULT '',
  lecture TEXT NOT NULL DEFAULT '5 min',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT USING (published = true);

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Videos
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  plateforme TEXT NOT NULL DEFAULT 'YouTube',
  duree TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published videos" ON public.videos FOR SELECT USING (published = true);

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Glossaire
CREATE TABLE public.glossaire (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terme TEXT NOT NULL,
  categorie TEXT NOT NULL DEFAULT '',
  definition TEXT NOT NULL DEFAULT '',
  exemple TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.glossaire ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view glossaire" ON public.glossaire FOR SELECT USING (true);

CREATE TRIGGER update_glossaire_updated_at BEFORE UPDATE ON public.glossaire FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ressources
CREATE TABLE public.ressources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT '',
  niveau TEXT NOT NULL DEFAULT '',
  prix TEXT NOT NULL DEFAULT '',
  gratuit BOOLEAN NOT NULL DEFAULT false,
  preview TEXT,
  lien_achat TEXT,
  lien_lecture TEXT,
  type_fichier TEXT NOT NULL DEFAULT '',
  auteur TEXT NOT NULL DEFAULT 'ActuaireX',
  telechargeable BOOLEAN NOT NULL DEFAULT true,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ressources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published ressources" ON public.ressources FOR SELECT USING (published = true);

CREATE TRIGGER update_ressources_updated_at BEFORE UPDATE ON public.ressources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projets
CREATE TABLE public.projets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  categorie TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  pdf TEXT,
  img TEXT,
  type_fichier TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published projets" ON public.projets FOR SELECT USING (published = true);

CREATE TRIGGER update_projets_updated_at BEFORE UPDATE ON public.projets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Subscribers (for notifications)
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Admin role setup
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for content tables
CREATE POLICY "Admins can manage articles" ON public.articles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage videos" ON public.videos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage glossaire" ON public.glossaire FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage ressources" ON public.ressources FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage projets" ON public.projets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view user_roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view subscribers" ON public.subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete subscribers" ON public.subscribers FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
