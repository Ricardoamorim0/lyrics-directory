export default {

  set(key: string, value: string | number | boolean): void {
    try {
      window.localStorage.setItem(key, typeof value === 'string' ? value : value.toString());
    } catch (error) {
      console.log(error);
    }
  },

  getString(key: string, def: string | null = null): string | null {
    const item = window.localStorage.getItem(key);
    return item ? window.localStorage.getItem(key) : def;
  },
  getNumber(key: string, def: number | null = null): number | null {
    const item = window.localStorage.getItem(key);
    return item ? Number(item) : def;
  },
  getBoolean(key: string, def: boolean | null = null): boolean | null {
    const item = window.localStorage.getItem(key);
    return item ? (item.toLowerCase() === 'false' ? false : true) : def;
  },
  
  remove(key: string) {
    window.localStorage.removeItem(key);
  },

  clear(): void {
    window.localStorage.clear();
  }

}