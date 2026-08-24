export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          blurb: string
          created_at: string
          id: string
          image_key: string | null
          image_url: string | null
          name: string
          slug: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          blurb?: string
          created_at?: string
          id?: string
          image_key?: string | null
          image_url?: string | null
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          blurb?: string
          created_at?: string
          id?: string
          image_key?: string | null
          image_url?: string | null
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          deposit_cents: number | null
          id: string
          name: string
          notes: string | null
          options: Json
          order_id: string
          pricing_mode: Database["public"]["Enums"]["pricing_mode"]
          product_id: string | null
          product_slug: string | null
          quantity: number
          unit_price_cents: number | null
        }
        Insert: {
          created_at?: string
          deposit_cents?: number | null
          id?: string
          name: string
          notes?: string | null
          options?: Json
          order_id: string
          pricing_mode?: Database["public"]["Enums"]["pricing_mode"]
          product_id?: string | null
          product_slug?: string | null
          quantity?: number
          unit_price_cents?: number | null
        }
        Update: {
          created_at?: string
          deposit_cents?: number | null
          id?: string
          name?: string
          notes?: string | null
          options?: Json
          order_id?: string
          pricing_mode?: Database["public"]["Enums"]["pricing_mode"]
          product_id?: string | null
          product_slug?: string | null
          quantity?: number
          unit_price_cents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          allergies: string | null
          checkout_method: string
          created_at: string
          customer_name: string
          delivery_area: string | null
          due_now_cents: number
          email: string | null
          fulfilment: string
          has_quote_items: boolean
          heard_from: string | null
          id: string
          notes: string | null
          occasion: string | null
          payer_name: string | null
          payment_provider: string | null
          payment_reference: string | null
          payment_status: string
          phone: string
          pickup_date: string | null
          pickup_window: string | null
          reference: string
          slip_path: string | null
          status: string
          subtotal_cents: number
          transfer_date: string | null
          transfer_reference: string | null
          updated_at: string
        }
        Insert: {
          allergies?: string | null
          checkout_method?: string
          created_at?: string
          customer_name: string
          delivery_area?: string | null
          due_now_cents?: number
          email?: string | null
          fulfilment?: string
          has_quote_items?: boolean
          heard_from?: string | null
          id?: string
          notes?: string | null
          occasion?: string | null
          payer_name?: string | null
          payment_provider?: string | null
          payment_reference?: string | null
          payment_status?: string
          phone: string
          pickup_date?: string | null
          pickup_window?: string | null
          reference: string
          slip_path?: string | null
          status?: string
          subtotal_cents?: number
          transfer_date?: string | null
          transfer_reference?: string | null
          updated_at?: string
        }
        Update: {
          allergies?: string | null
          checkout_method?: string
          created_at?: string
          customer_name?: string
          delivery_area?: string | null
          due_now_cents?: number
          email?: string | null
          fulfilment?: string
          has_quote_items?: boolean
          heard_from?: string | null
          id?: string
          notes?: string | null
          occasion?: string | null
          payer_name?: string | null
          payment_provider?: string | null
          payment_reference?: string | null
          payment_status?: string
          phone?: string
          pickup_date?: string | null
          pickup_window?: string | null
          reference?: string
          slip_path?: string | null
          status?: string
          subtotal_cents?: number
          transfer_date?: string | null
          transfer_reference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          available: boolean
          category_id: string | null
          created_at: string
          deposit_cents: number | null
          description: string
          id: string
          image_key: string | null
          image_url: string | null
          includes: Json
          lead_time: string
          name: string
          options: Json
          price_band: string | null
          price_cents: number | null
          price_note: string | null
          pricing_mode: Database["public"]["Enums"]["pricing_mode"]
          serves: string | null
          short: string
          slug: string
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          available?: boolean
          category_id?: string | null
          created_at?: string
          deposit_cents?: number | null
          description?: string
          id?: string
          image_key?: string | null
          image_url?: string | null
          includes?: Json
          lead_time?: string
          name: string
          options?: Json
          price_band?: string | null
          price_cents?: number | null
          price_note?: string | null
          pricing_mode?: Database["public"]["Enums"]["pricing_mode"]
          serves?: string | null
          short?: string
          slug: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          available?: boolean
          category_id?: string | null
          created_at?: string
          deposit_cents?: number | null
          description?: string
          id?: string
          image_key?: string | null
          image_url?: string | null
          includes?: Json
          lead_time?: string
          name?: string
          options?: Json
          price_band?: string | null
          price_cents?: number | null
          price_note?: string | null
          pricing_mode?: Database["public"]["Enums"]["pricing_mode"]
          serves?: string | null
          short?: string
          slug?: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          bank_account_name: string
          bank_account_number: string
          bank_name: string
          bank_note: string
          created_at: string
          id: string
          singleton: boolean
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          bank_account_name?: string
          bank_account_number?: string
          bank_name?: string
          bank_note?: string
          created_at?: string
          id?: string
          singleton?: boolean
          updated_at?: string
          whatsapp_number?: string
        }
        Update: {
          bank_account_name?: string
          bank_account_number?: string
          bank_name?: string
          bank_note?: string
          created_at?: string
          id?: string
          singleton?: boolean
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_order: {
        Args: { _items: Json; _order: Json }
        Returns: {
          id: string
          reference: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff"
      pricing_mode: "fixed" | "deposit" | "quote"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      pricing_mode: ["fixed", "deposit", "quote"],
    },
  },
} as const
