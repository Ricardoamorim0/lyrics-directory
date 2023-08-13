import LocalStorage from "./LocalStorage";

const Keys = {
  USER: 'user', 
  TOKEN: 'jwt_token',
  USER_LOGGED_IN: 'user_logged_in'
};

export default {

  setUser(value: string): void {
    LocalStorage.set(Keys.USER, value);
  },
  setToken(value: string): void {
    LocalStorage.set(Keys.TOKEN, value);
  },
  setUserLoggedIn(value: boolean): void {
    LocalStorage.set(Keys.USER_LOGGED_IN, value);
  },

  getToken(): string {
    return LocalStorage.getString(Keys.TOKEN) || '';
  },
  getUserLoggedIn(): boolean {
    return LocalStorage.getBoolean(Keys.USER_LOGGED_IN) || false;
  },

  removeUserData(): void {
    LocalStorage.remove(Keys.USER);
    LocalStorage.remove(Keys.TOKEN);
    LocalStorage.set(Keys.USER_LOGGED_IN, false);
  }

}