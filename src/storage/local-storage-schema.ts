// local-storage-schema.ts
export interface LocalStorageSchema {
  installDate: string;

}

export type LocalStorageKey = keyof LocalStorageSchema;
export type LocalStorageValue<K extends LocalStorageKey> = LocalStorageSchema[K];