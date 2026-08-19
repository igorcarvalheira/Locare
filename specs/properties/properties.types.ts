/**
 * Tipagem gerada a partir da especificação SDD: spec-properties.md
 * Entidade: Imóveis (properties)
 *
 * Mantenha este arquivo sincronizado manualmente com o schema até que o
 * projeto adote geração automática via `supabase gen types typescript`.
 */

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'commercial'
  | 'studio'
  | 'other';

export type PropertyStatus =
  | 'vacant'
  | 'rented'
  | 'maintenance'
  | 'inactive';

export interface Property {
  id: string; // uuid
  owner_id: string; // uuid — referencia auth.users(id)

  nickname: string;
  address_street: string;
  address_number: string | null;
  address_complement: string | null;
  neighborhood: string | null;
  city: string;
  state: string; // UF, 2 caracteres
  zip_code: string | null;

  property_type: PropertyType;
  area_m2: number | null;
  bedrooms: number;
  bathrooms: number;

  rent_value: number;
  iptu_value: number;
  status: PropertyStatus;

  notes: string | null;

  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Payload de criação. Campos gerados pelo banco (id, timestamps) são
 * omitidos; campos com DEFAULT no schema ficam opcionais no client.
 */
export type PropertyInsert = Omit<
  Property,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'property_type'
  | 'bedrooms'
  | 'bathrooms'
  | 'rent_value'
  | 'iptu_value'
  | 'status'
> &
  Partial<
    Pick<
      Property,
      | 'property_type'
      | 'bedrooms'
      | 'bathrooms'
      | 'rent_value'
      | 'iptu_value'
      | 'status'
    >
  >;

/**
 * Payload de atualização. Tudo opcional, exceto que `id` e `owner_id`
 * nunca devem ser alterados por essa via (o segundo é imutável por regra
 * de negócio — trocar o dono de um imóvel exige um fluxo próprio).
 */
export type PropertyUpdate = Partial<
  Omit<Property, 'id' | 'owner_id' | 'created_at' | 'updated_at'>
>;
