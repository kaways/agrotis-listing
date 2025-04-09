export const LocalStorageService = {
  getItem: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  setItem: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },

};
