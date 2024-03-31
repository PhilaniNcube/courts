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
      admins: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courts: {
        Row: {
          court_type: Database["public"]["Enums"]["court_type"]
          created_at: string
          district: string
          id: string
          lat: number | null
          lng: number | null
          location: unknown | null
          office: string
          postal_address: string | null
          province: Database["public"]["Enums"]["province"]
          street_address: string | null
          tel: string | null
        }
        Insert: {
          court_type: Database["public"]["Enums"]["court_type"]
          created_at?: string
          district: string
          id?: string
          lat?: number | null
          lng?: number | null
          location?: unknown | null
          office: string
          postal_address?: string | null
          province: Database["public"]["Enums"]["province"]
          street_address?: string | null
          tel?: string | null
        }
        Update: {
          court_type?: Database["public"]["Enums"]["court_type"]
          created_at?: string
          district?: string
          id?: string
          lat?: number | null
          lng?: number | null
          location?: unknown | null
          office?: string
          postal_address?: string | null
          province?: Database["public"]["Enums"]["province"]
          street_address?: string | null
          tel?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          court_id: string
          created_at: string
          id: string
          notes: string | null
          requested_by: string
          serve_by_date: string | null
        }
        Insert: {
          court_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          requested_by?: string
          serve_by_date?: string | null
        }
        Update: {
          court_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          requested_by?: string
          serve_by_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sherrifs: {
        Row: {
          address: string
          cell_number: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          location: unknown
          phone_contact: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          cell_number?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          location: unknown
          phone_contact?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          cell_number?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: unknown
          phone_contact?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sherrifs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      court_types_view: {
        Row: {
          court_count: number | null
          court_type: Database["public"]["Enums"]["court_type"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_court_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          court_type: string
          count: number
        }[]
      }
      group_courts_by_type: {
        Args: Record<PropertyKey, never>
        Returns: {
          court_type: string
          count: number
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      court_type: "Magistrate" | "Branch" | "Detached" | "Periodical"
      province:
        | "North West"
        | "Mpumalanga"
        | "Gauteng"
        | "Eastern Cape"
        | "Free State"
        | "Limpopo"
        | "KwaZulu-Natal"
        | "Northern Cape"
        | "Western Cape"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
