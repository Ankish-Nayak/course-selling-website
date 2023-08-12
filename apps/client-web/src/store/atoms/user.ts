import { atom } from "recoil";
const defaultValue: {
  isLoading: Boolean;
  userEmail: string | null;
} = {
  isLoading: true,
  userEmail: null,
};
export const userState = atom({
  key: "userState",
  default: defaultValue,
});
