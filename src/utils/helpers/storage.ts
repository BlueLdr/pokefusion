export const loadStorage = <T>(key: string, def?: T): T | undefined => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) || def;
    } catch {
      return def;
    }
  }
  return def;
};

export const setStorage = (key: string, value: any) => {
  if (value == null || value === "") {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
