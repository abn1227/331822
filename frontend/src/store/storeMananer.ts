import { store } from "./store";

export class StoreManager {
  static getState() {
    return store.getState();
  }

  static getAuthToken() {
    return this.getState().auth.token;
  }
}
