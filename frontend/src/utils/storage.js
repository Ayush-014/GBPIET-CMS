// Safe storage helpers
export const storage = {
  getUser: () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) return JSON.parse(userData);
    } catch (err) {
      console.error("Error parsing user:", err);
    }
    return null;
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
  },
  clear: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};
