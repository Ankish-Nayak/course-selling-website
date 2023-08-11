import { atom } from "recoil";
const defaultValue : {isLoading: Boolean, userEmail: null | String} = {
    isLoading: true,
    userEmail: null
}
export const userState = atom({
    key: 'adminState',
    default: defaultValue
});