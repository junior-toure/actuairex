import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleReaderPage from "./pages/ArticleReaderPage";
import VideosPage from "./pages/VideosPage";
import ProjetsPage from "./pages/ProjetsPage";
import AProposPage from "./pages/AProposPage";
import DevenirActuairePage from "./pages/DevenirActuairePage";
import GlossairePage from "./pages/GlossairePage";
import RessourcesPage from "./pages/RessourcesPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleReaderPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/projets" element={<ProjetsPage />} />
          <Route path="/apropos" element={<AProposPage />} />
          <Route path="/devenir-actuaire" element={<DevenirActuairePage />} />
          <Route path="/glossaire" element={<GlossairePage />} />
          <Route path="/ressources" element={<RessourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/confidentialite" element={<LegalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
