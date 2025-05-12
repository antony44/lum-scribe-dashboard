export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          alt_img: string | null
          clients_id: string
          commandes_id: string
          Fichier_docx: string | null
          fichier_html: string | null
          fichier_pdf: string | null
          html: string | null
          id_articles: string
          intention_de_recherche: string | null
          lien_image: string | null
          logs_erreur: string | null
          meta_description: string | null
          mots_cles_principaux: string | null
          mots_cles_secondaires: string | null
          niveau_de_concurence: string | null
          objectif_article: string | null
          potentiel_seo: string | null
          slug: string | null
          statut: string | null
          temps_lecture: string | null
          titre: string | null
          titre_seo: string | null
          trigger_statut_article: string | null
          volume_de_recherche: string | null
        }
        Insert: {
          alt_img?: string | null
          clients_id?: string
          commandes_id?: string
          Fichier_docx?: string | null
          fichier_html?: string | null
          fichier_pdf?: string | null
          html?: string | null
          id_articles?: string
          intention_de_recherche?: string | null
          lien_image?: string | null
          logs_erreur?: string | null
          meta_description?: string | null
          mots_cles_principaux?: string | null
          mots_cles_secondaires?: string | null
          niveau_de_concurence?: string | null
          objectif_article?: string | null
          potentiel_seo?: string | null
          slug?: string | null
          statut?: string | null
          temps_lecture?: string | null
          titre?: string | null
          titre_seo?: string | null
          trigger_statut_article?: string | null
          volume_de_recherche?: string | null
        }
        Update: {
          alt_img?: string | null
          clients_id?: string
          commandes_id?: string
          Fichier_docx?: string | null
          fichier_html?: string | null
          fichier_pdf?: string | null
          html?: string | null
          id_articles?: string
          intention_de_recherche?: string | null
          lien_image?: string | null
          logs_erreur?: string | null
          meta_description?: string | null
          mots_cles_principaux?: string | null
          mots_cles_secondaires?: string | null
          niveau_de_concurence?: string | null
          objectif_article?: string | null
          potentiel_seo?: string | null
          slug?: string | null
          statut?: string | null
          temps_lecture?: string | null
          titre?: string | null
          titre_seo?: string | null
          trigger_statut_article?: string | null
          volume_de_recherche?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Articles_clients_id_fkey"
            columns: ["clients_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id_clients"]
          },
          {
            foreignKeyName: "Articles_commandes_id_fkey"
            columns: ["commandes_id"]
            isOneToOne: true
            referencedRelation: "commandes"
            referencedColumns: ["id_commandes"]
          },
        ]
      }
      clients: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_plan: string | null
          email: string
          first_name: string | null
          id_clients: string
          last_name: string | null
          plans_id: string
          stripe_customer_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_plan?: string | null
          email: string
          first_name?: string | null
          id_clients?: string
          last_name?: string | null
          plans_id?: string
          stripe_customer_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_plan?: string | null
          email?: string
          first_name?: string | null
          id_clients?: string
          last_name?: string | null
          plans_id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Clients_plans_id_fkey"
            columns: ["plans_id"]
            isOneToOne: true
            referencedRelation: "plans"
            referencedColumns: ["id_plans"]
          },
        ]
      }
      commandes: {
        Row: {
          autorite: string | null
          categorie: string | null
          clients_id: string
          company_name: string | null
          contexte: string | null
          created_at: string
          emoji: string | null
          html_complet: string | null
          id_commandes: string
          lien_blog_site: string | null
          liens_internes: string | null
          logs_erreur: string | null
          objectif: string | null
          plans_id: string
          statut: string | null
          subject_ban: string | null
          sujet: string | null
          ton: string | null
          trigger_statut: string
          type_de_contenu: string | null
        }
        Insert: {
          autorite?: string | null
          categorie?: string | null
          clients_id?: string
          company_name?: string | null
          contexte?: string | null
          created_at?: string
          emoji?: string | null
          html_complet?: string | null
          id_commandes?: string
          lien_blog_site?: string | null
          liens_internes?: string | null
          logs_erreur?: string | null
          objectif?: string | null
          plans_id?: string
          statut?: string | null
          subject_ban?: string | null
          sujet?: string | null
          ton?: string | null
          trigger_statut?: string
          type_de_contenu?: string | null
        }
        Update: {
          autorite?: string | null
          categorie?: string | null
          clients_id?: string
          company_name?: string | null
          contexte?: string | null
          created_at?: string
          emoji?: string | null
          html_complet?: string | null
          id_commandes?: string
          lien_blog_site?: string | null
          liens_internes?: string | null
          logs_erreur?: string | null
          objectif?: string | null
          plans_id?: string
          statut?: string | null
          subject_ban?: string | null
          sujet?: string | null
          ton?: string | null
          trigger_statut?: string
          type_de_contenu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Commandes_clients_id_fkey"
            columns: ["clients_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id_clients"]
          },
          {
            foreignKeyName: "Commandes_plans_id_fkey"
            columns: ["plans_id"]
            isOneToOne: true
            referencedRelation: "plans"
            referencedColumns: ["id_plans"]
          },
        ]
      }
      factures: {
        Row: {
          commandes_id: string
          created_at: string
          date_emission: string | null
          id_factures: string
          montant: number | null
          pdf_url: string | null
          stripe_invoice_id: string | null
        }
        Insert: {
          commandes_id?: string
          created_at?: string
          date_emission?: string | null
          id_factures?: string
          montant?: number | null
          pdf_url?: string | null
          stripe_invoice_id?: string | null
        }
        Update: {
          commandes_id?: string
          created_at?: string
          date_emission?: string | null
          id_factures?: string
          montant?: number | null
          pdf_url?: string | null
          stripe_invoice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "factures_commandes_id_fkey"
            columns: ["commandes_id"]
            isOneToOne: true
            referencedRelation: "commandes"
            referencedColumns: ["id_commandes"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          cycle: string | null
          economie_annuelle: number | null
          id_plans: string
          nom: string | null
          prix_annuel: number | null
          prix_mensuel: number | null
          prix_unitaire: number | null
          prix_unitaire_annuel: number | null
          statut: string | null
          stripe_plan_id: string | null
          type: string | null
          volume_mensuel: number | null
        }
        Insert: {
          created_at?: string
          cycle?: string | null
          economie_annuelle?: number | null
          id_plans?: string
          nom?: string | null
          prix_annuel?: number | null
          prix_mensuel?: number | null
          prix_unitaire?: number | null
          prix_unitaire_annuel?: number | null
          statut?: string | null
          stripe_plan_id?: string | null
          type?: string | null
          volume_mensuel?: number | null
        }
        Update: {
          created_at?: string
          cycle?: string | null
          economie_annuelle?: number | null
          id_plans?: string
          nom?: string | null
          prix_annuel?: number | null
          prix_mensuel?: number | null
          prix_unitaire?: number | null
          prix_unitaire_annuel?: number | null
          statut?: string | null
          stripe_plan_id?: string | null
          type?: string | null
          volume_mensuel?: number | null
        }
        Relationships: []
      }
      quotas: {
        Row: {
          articles_restants: number
          clients_id: string
          created_at: string
          dernier_reset: string | null
          id_quotas: string
          plans_id: string
          prochain_reset: string | null
          quota_initial: number
        }
        Insert: {
          articles_restants: number
          clients_id?: string
          created_at?: string
          dernier_reset?: string | null
          id_quotas?: string
          plans_id?: string
          prochain_reset?: string | null
          quota_initial: number
        }
        Update: {
          articles_restants?: number
          clients_id?: string
          created_at?: string
          dernier_reset?: string | null
          id_quotas?: string
          plans_id?: string
          prochain_reset?: string | null
          quota_initial?: number
        }
        Relationships: [
          {
            foreignKeyName: "Quotas_clients_id_fkey"
            columns: ["clients_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id_clients"]
          },
          {
            foreignKeyName: "Quotas_plans_id_fkey"
            columns: ["plans_id"]
            isOneToOne: true
            referencedRelation: "plans"
            referencedColumns: ["id_plans"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
