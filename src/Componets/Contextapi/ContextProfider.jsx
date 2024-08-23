import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export let auth = createContext(null)

export default function ContextProfider({children}){
    let [islogin, setlogin] = useState(null)
    useEffect(()=>{
        if (localStorage.getItem('usertoken')) {
            setlogin(jwtDecode(localStorage.getItem('usertoken')))
        }
    },[])
    
    return <auth.Provider value={{islogin,setlogin}}>
        {children}
    </auth.Provider>
}
