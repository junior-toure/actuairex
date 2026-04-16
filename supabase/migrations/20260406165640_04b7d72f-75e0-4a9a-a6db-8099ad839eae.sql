
-- Create storage bucket for content files (PDFs, images)
INSERT INTO storage.buckets (id, name, public) VALUES ('content', 'content', true);

-- Allow anyone to view files in the content bucket
CREATE POLICY "Anyone can view content files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'content');

-- Allow admins to upload files
CREATE POLICY "Admins can upload content files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update files
CREATE POLICY "Admins can update content files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete files
CREATE POLICY "Admins can delete content files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));
