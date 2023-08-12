import constants from "@/constants/constants";


const Keys = {
  USER : constants.USER, 
  TOKEN: constants.TOKEN
};

export default {

  Keys,

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },

  get(key: string): string | null {
    return window.localStorage.getItem(key);
  },
  
  remove(key: string) {
    window.localStorage.removeItem(key);
  }

}