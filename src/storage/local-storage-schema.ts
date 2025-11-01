// local-storage-schema.ts

export enum Behavior {
  drag = "drag",
  longPress = "long-press",
  altClick = "alt-click",
}

export enum ThemeId {
  Light = 'light',
  Dark = 'dark',
  Glass = 'glass',
  Indigo = 'indigo',
  Purple = 'purple',
  Bubblegum = 'bubblegum'
}

export interface LocalStorageSchema {
  /**
   * 插件安装时间
   */
  installDate: string;
  /**
   * 记录用户阅读方式
   */
  behavior: Behavior;
  /**
   * 主题色
   */
  theme: ThemeId | string;
}

export type LocalStorageKey = keyof LocalStorageSchema;
export type LocalStorageValue<K extends LocalStorageKey> =
  LocalStorageSchema[K];
