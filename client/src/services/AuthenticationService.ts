import Api from '@/services/Api';

export default {

  register(credentials: { name: string, email: string, password: string }) {
    return Api().post('register', credentials);
  },

  login(credentials: { email: string, password: string }) {
    return Api().post('login', credentials);
  },

  auth(token: string) {
    return Api().post('auth', { token: token });
  }
};