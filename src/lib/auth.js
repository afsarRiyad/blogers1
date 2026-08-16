const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const authService = {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser = {
            id: 'admin',
            email: ADMIN_EMAIL,
            name: 'Admin',
            role: 'admin'
          };
          
          localStorage.setItem('adminUser', JSON.stringify(adminUser));
          localStorage.setItem('isAdmin', 'true');
          
          resolve(adminUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout() {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdmin');
  },

  isAuthenticated() {
    return localStorage.getItem('isAdmin') === 'true';
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAdmin() {
    return this.isAuthenticated();
  }
};

export const requireAdminAuth = () => {
  if (!authService.isAdmin()) {
    window.location.href = '/admin/login';
    return false;
  }
  return true;
};