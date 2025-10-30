
import type { LocalStorageSchema, LocalStorageKey, LocalStorageValue } from './local-storage-schema';

export class LocalStorage {
  private static getFullKey<K extends LocalStorageKey>(key: K): `local:${K}` {
    return `local:${key}`;
  }
  
  static async getItem<K extends LocalStorageKey>(
    key: K
  ): Promise<LocalStorageValue<K> | null> {
    return await storage.getItem<LocalStorageValue<K>>(this.getFullKey(key));
  }
  
  static async setItem<K extends LocalStorageKey>(
    key: K, 
    value: LocalStorageValue<K>
  ): Promise<void> {
    await storage.setItem(this.getFullKey(key), value);
  }
  
  static async removeItem<K extends LocalStorageKey>(key: K): Promise<void> {
    await storage.removeItem(this.getFullKey(key));
  }
  
  // 带默认值的获取
  static async getItemWithDefault<K extends LocalStorageKey>(
    key: K,
    defaultValue: LocalStorageValue<K>
  ): Promise<LocalStorageValue<K>> {
    const value = await this.getItem(key);
    return value ?? defaultValue;
  }
  
  // 检查key是否存在
  static async hasItem<K extends LocalStorageKey>(key: K): Promise<boolean> {
    const value = await this.getItem(key);
    return value !== null;
  }
  

}