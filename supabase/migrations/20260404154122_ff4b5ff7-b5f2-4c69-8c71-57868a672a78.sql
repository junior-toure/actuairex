
DROP POLICY "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe with valid email" ON public.subscribers FOR INSERT WITH CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
