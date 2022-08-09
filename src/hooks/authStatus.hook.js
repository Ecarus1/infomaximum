import { useCallback, useState } from "react";
import jwtDecode from "jwt-decode";

export const useAuthStatus = () =>  {
    let isOnline = false;

    const checkToken = () => {
        try {
            const data = localStorage.getItem('token');
            console.log(data ? "true" : "false");
            // console.log(isOnline)

            if(data) {
                isOnline = true;
            }
            return;
        } catch (error) {
            isOnline = false
        }
    }
    console.log(isOnline)
    
    return {isOnline, checkToken}
}

