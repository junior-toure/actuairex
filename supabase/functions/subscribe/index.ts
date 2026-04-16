// ================================================================
// ActuaireX — Edge Function : subscribe
// Rôle : Ajouter un email dans Supabase + Brevo
// Déployée sur Supabase (côté serveur — clé API jamais exposée)
// ================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Headers CORS — permet au frontend d'appeler cette fonction
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gestion des requêtes OPTIONS (preflight CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Lire l'email envoyé par le formulaire
    const { email } = await req.json();

    // 2. Valider l'email
    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Email invalide." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailLower = email.toLowerCase().trim();

    // ============================================================
    // 3. SUPABASE — Sauvegarder l'email dans la table subscribers
    // ============================================================
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabase
      .from("subscribers")
      .insert({ email: emailLower });

    // Si l'email existe déjà (code 23505 = contrainte unique)
    if (dbError && dbError.code !== "23505") {
      console.error("Supabase error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur base de données." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dejaAbonne = dbError?.code === "23505";

    // ============================================================
    // 4. BREVO — Ajouter le contact + envoyer email confirmation
    // ============================================================
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") ?? "";
    const BREVO_LIST_ID = parseInt(Deno.env.get("BREVO_LIST_ID") ?? "1");

    if (BREVO_API_KEY && !dejaAbonne) {
      // 4a. Ajouter le contact dans la liste Brevo
      const brevoContact = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: emailLower,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true, // Met à jour si existe déjà
          attributes: {
            SOURCE: "ActuaireX Website",
          },
        }),
      });

      if (!brevoContact.ok) {
        const brevoError = await brevoContact.json();
        console.error("Brevo contact error:", brevoError);
        // On continue quand même — l'email est dans Supabase
      }

      // 4b. Envoyer l'email de confirmation (double opt-in)
      const brevoEmail = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "ActuaireX",
            email: "actuaire.xx@gmail.com", // Ton email expéditeur
          },
          to: [{ email: emailLower }],
          subject: "Bienvenue dans la communauté ActuaireX ! 🎓",
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8"/>
              <style>
                body { font-family: 'IBM Plex Sans', Arial, sans-serif; background: #050505; color: #e8e8e0; margin: 0; padding: 0; }
                .container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
                .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; margin-bottom: 32px; }
                .logo { font-family: monospace; font-size: 20px; font-weight: 700; color: #00e676; letter-spacing: .1em; }
                .logo span { color: #888880; font-weight: 400; }
                h1 { font-size: 24px; font-weight: 700; color: #ffffff; margin: 0 0 16px; }
                p { font-size: 14px; font-weight: 300; line-height: 1.8; color: #888880; margin: 0 0 16px; }
                .highlight { background: rgba(0,230,118,0.08); border-left: 3px solid #00e676; padding: 16px 20px; margin: 24px 0; }
                .highlight p { color: #e8e8e0; margin: 0; }
                .btn { display: inline-block; background: #00e676; color: #000000; font-family: monospace; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 12px 24px; text-decoration: none; margin: 8px 4px; }
                .footer { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px; margin-top: 40px; font-size: 11px; color: #444440; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">ACTUAIRE<span>X</span></div>
                </div>
                <h1>Bienvenue dans la communauté ! 🎓</h1>
                <p>Tu viens de t'abonner aux notifications <strong style="color:#fff">ActuaireX</strong>. Tu recevras un email dès qu'un nouvel article, vidéo ou ressource est publié.</p>
                <div class="highlight">
                  <p><strong>Ce que tu vas recevoir :</strong><br/>
                  → Articles de fond sur l'actuariat et l'assurance<br/>
                  → Nouveaux outils et ressources pratiques<br/>
                  → Actualités du secteur en Afrique francophone</p>
                </div>
                <p>En attendant, explore le site :</p>
                <a href="https://actuairex.netlify.app/articles" class="btn">Lire les articles →</a>
                <a href="https://actuairex.netlify.app/ressources" class="btn" style="background:transparent;color:#00e676;border:1px solid #00e676;">Voir les ressources</a>
                <div class="footer">
                  <p>ActuaireX — Côte d'Ivoire · Afrique francophone<br/>
                  Tu reçois cet email car tu t'es abonné(e) sur actuairex.netlify.app.<br/>
                  <a href="https://actuairex.netlify.app" style="color:#00e676">actuairex.netlify.app</a></p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      });

      if (!brevoEmail.ok) {
        const emailError = await brevoEmail.json();
        console.error("Brevo email error:", emailError);
        // L'email de confirmation a échoué mais l'abonnement est enregistré
      }
    }

    // 5. Réponse succès
    return new Response(
      JSON.stringify({
        success: true,
        message: dejaAbonne
          ? "Vous êtes déjà abonné(e) !"
          : "Abonnement confirmé ! Vérifie ta boîte email. 🎉",
        dejaAbonne,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur. Réessaie." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
