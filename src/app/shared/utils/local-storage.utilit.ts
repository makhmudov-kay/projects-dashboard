export class LocalStorageUtilit {
  public static get(key: string) {
    return localStorage.getItem(key);
  }

  public static set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
