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
      Articles: {
        Row: {
          "Analyse SEO": string | null
          "Article ID": number
          "Commande liée": number | null
          "Date de livraison": string | null
          "Fichier .docx": string | null
          HTML: string | null
          "Statut (from Statue)": string | null
          Sujet: string | null
          Version: number | null
        }
        Insert: {
          "Analyse SEO"?: string | null
          "Article ID": number
          "Commande liée"?: number | null
          "Date de livraison"?: string | null
          "Fichier .docx"?: string | null
          HTML?: string | null
          "Statut (from Statue)"?: string | null
          Sujet?: string | null
          Version?: number | null
        }
        Update: {
          "Analyse SEO"?: string | null
          "Article ID"?: number
          "Commande liée"?: number | null
          "Date de livraison"?: string | null
          "Fichier .docx"?: string | null
          HTML?: string | null
          "Statut (from Statue)"?: string | null
          Sujet?: string | null
          Version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Articles_Commande liée_fkey"
            columns: ["Commande liée"]
            isOneToOne: false
            referencedRelation: "Commandes"
            referencedColumns: ["Commande ID"]
          },
        ]
      }
      Clients: {
        Row: {
          "Articles Restants": number | null
          "Articles Restants (from Articles Restants)": number | null
          "Articles Restants (from Articles Restants) 2": number | null
          "Client ID": number
          "Date de création": string | null
          Email: string | null
          Entreprise: string | null
          Factures: number | null
          Nom: string | null
          "Nom du plan (from Plan actif)": string | null
          Prénom: string | null
          "Quota ID (from Articles Restants)": number | null
          Statut: string | null
          "Stripe Customer ID": string | null
        }
        Insert: {
          "Articles Restants"?: number | null
          "Articles Restants (from Articles Restants)"?: number | null
          "Articles Restants (from Articles Restants) 2"?: number | null
          "Client ID": number
          "Date de création"?: string | null
          Email?: string | null
          Entreprise?: string | null
          Factures?: number | null
          Nom?: string | null
          "Nom du plan (from Plan actif)"?: string | null
          Prénom?: string | null
          "Quota ID (from Articles Restants)"?: number | null
          Statut?: string | null
          "Stripe Customer ID"?: string | null
        }
        Update: {
          "Articles Restants"?: number | null
          "Articles Restants (from Articles Restants)"?: number | null
          "Articles Restants (from Articles Restants) 2"?: number | null
          "Client ID"?: number
          "Date de création"?: string | null
          Email?: string | null
          Entreprise?: string | null
          Factures?: number | null
          Nom?: string | null
          "Nom du plan (from Plan actif)"?: string | null
          Prénom?: string | null
          "Quota ID (from Articles Restants)"?: number | null
          Statut?: string | null
          "Stripe Customer ID"?: string | null
        }
        Relationships: []
      }
      Commandes: {
        Row: {
          "Article généré": number | null
          Autorité: string | null
          Catégorie: string | null
          "Client ID (from Clients)": number | null
          Clients: number | null
          "Commande ID": number
          Contexte: string | null
          "Date commande": string | null
          Emoji: string | null
          "HTML Complet": string | null
          "Lien blog/site": string | null
          "Liens internes à privilégier": string | null
          Objectif: string | null
          Statut: string | null
          Sujet: string | null
          "Sujet à bannir": string | null
          "Titre d’article": string | null
          "Ton souhaité": string | null
          "Type de contenu": string | null
        }
        Insert: {
          "Article généré"?: number | null
          Autorité?: string | null
          Catégorie?: string | null
          "Client ID (from Clients)"?: number | null
          Clients?: number | null
          "Commande ID": number
          Contexte?: string | null
          "Date commande"?: string | null
          Emoji?: string | null
          "HTML Complet"?: string | null
          "Lien blog/site"?: string | null
          "Liens internes à privilégier"?: string | null
          Objectif?: string | null
          Statut?: string | null
          Sujet?: string | null
          "Sujet à bannir"?: string | null
          "Titre d’article"?: string | null
          "Ton souhaité"?: string | null
          "Type de contenu"?: string | null
        }
        Update: {
          "Article généré"?: number | null
          Autorité?: string | null
          Catégorie?: string | null
          "Client ID (from Clients)"?: number | null
          Clients?: number | null
          "Commande ID"?: number
          Contexte?: string | null
          "Date commande"?: string | null
          Emoji?: string | null
          "HTML Complet"?: string | null
          "Lien blog/site"?: string | null
          "Liens internes à privilégier"?: string | null
          Objectif?: string | null
          Statut?: string | null
          Sujet?: string | null
          "Sujet à bannir"?: string | null
          "Titre d’article"?: string | null
          "Ton souhaité"?: string | null
          "Type de contenu"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Commandes_Client ID (from Clients)_fkey"
            columns: ["Client ID (from Clients)"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["Client ID"]
          },
        ]
      }
      Factures: {
        Row: {
          "Client ID (from Client)": number | null
          "Date facture": string | null
          "Facture ID": number
          "Fichier PDF": string | null
          Montant: number | null
          Plan: number | null
          "Stripe Invoice ID": string | null
        }
        Insert: {
          "Client ID (from Client)"?: number | null
          "Date facture"?: string | null
          "Facture ID": number
          "Fichier PDF"?: string | null
          Montant?: number | null
          Plan?: number | null
          "Stripe Invoice ID"?: string | null
        }
        Update: {
          "Client ID (from Client)"?: number | null
          "Date facture"?: string | null
          "Facture ID"?: number
          "Fichier PDF"?: string | null
          Montant?: number | null
          Plan?: number | null
          "Stripe Invoice ID"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Factures_Client ID (from Client)_fkey"
            columns: ["Client ID (from Client)"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["Client ID"]
          },
          {
            foreignKeyName: "Factures_Plan_fkey"
            columns: ["Plan"]
            isOneToOne: false
            referencedRelation: "Plans"
            referencedColumns: ["Plan ID"]
          },
        ]
      }
      Plans: {
        Row: {
          "Avantages principaux": string | null
          "Économie annuelle (€)": string | null
          "Nom du plan": string | null
          "Plan ID": number
          "Premium activé": string | null
          "Prix annuel (€)": string | null
          "Prix mensuel (€)": string | null
          "Prix unitaire (€)": string | null
          "Stripe Product ID": string | null
          Type: string | null
          "Volume/mois": string | null
        }
        Insert: {
          "Avantages principaux"?: string | null
          "Économie annuelle (€)"?: string | null
          "Nom du plan"?: string | null
          "Plan ID": number
          "Premium activé"?: string | null
          "Prix annuel (€)"?: string | null
          "Prix mensuel (€)"?: string | null
          "Prix unitaire (€)"?: string | null
          "Stripe Product ID"?: string | null
          Type?: string | null
          "Volume/mois"?: string | null
        }
        Update: {
          "Avantages principaux"?: string | null
          "Économie annuelle (€)"?: string | null
          "Nom du plan"?: string | null
          "Plan ID"?: number
          "Premium activé"?: string | null
          "Prix annuel (€)"?: string | null
          "Prix mensuel (€)"?: string | null
          "Prix unitaire (€)"?: string | null
          "Stripe Product ID"?: string | null
          Type?: string | null
          "Volume/mois"?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      Quotas: {
        Row: {
          "Articles Restants": number | null
          Client: number | null
          "Client ID (from Client)": number | null
          "Dernier reset": string | null
          "Prochain reset": string | null
          "Quota ID": number | null
        }
        Insert: {
          "Articles Restants"?: number | null
          Client?: number | null
          "Client ID (from Client)"?: number | null
          "Dernier reset"?: string | null
          "Prochain reset"?: string | null
          "Quota ID"?: number | null
        }
        Update: {
          "Articles Restants"?: number | null
          Client?: number | null
          "Client ID (from Client)"?: number | null
          "Dernier reset"?: string | null
          "Prochain reset"?: string | null
          "Quota ID"?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Quotas_Client_fkey"
            columns: ["Client"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["Client ID"]
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
