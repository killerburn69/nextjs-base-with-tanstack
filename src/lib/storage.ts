// simple wrapper around localStorage (can be swapped later)
export const storage = {
    get(key: string) {
      if (typeof window === "undefined") return null;
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      } catch {
        return null;
      }
    },
    set(key: string, value: any) {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string) {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  };
  