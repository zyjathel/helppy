import { UnauthenticatedState, createUseAppStore } from "./store";

describe("The app store", () => {
  it("should have authenticated = false in the initial state", () => {
    const store = createUseAppStore();
    expect(store.getState().authenticated).toBe(false);
  });

  describe("auth action should work properly", () => {
    const store = createUseAppStore();
    (store.getState() as UnauthenticatedState).auth("username");
    it("should set authenticated to true", () => {
      expect(store.getState().authenticated).toBe(true);
    });

    it("should set the username", () => {
      expect(store.getState().username).toBe("username");
    });
  });
});
