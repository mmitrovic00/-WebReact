import jwt_decode from "jwt-decode";
import {atom} from "recoil";


export const getTokenExpiration = () => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        return decodedToken.exp * 1000;
    }
    return null;
};


export const isAuthAtom = atom({
    key: "isAuthAtom",
    default: getTokenExpiration() ? true : false,
});
