import { createContext ,useReducer } from "react";
import { projectAuth } from "../firebase/firebase";
import { useEffect } from "react";
export const AuthContext = createContext()

export const authReducer = (state , action)=>{
    switch (action.type) {
        case 'LOGIN' : 
        return {...state , user: action.payload}
        case 'LOGOUT' : 
        return { ...state , user:null} 
        case 'IS_LOGIN' : 
        return {...state , authIsReady : true , user : action.payload}   
        default: return state
         
    }
}

export const AuthContextProvider = ({children})=>{

   
    const [state , dispatch]=useReducer(authReducer,{
        user: null,
        authIsReady: false
    })
    useEffect(() => {
        const unsup =  projectAuth.onAuthStateChanged((user)=>{
           dispatch({type : 'IS_LOGIN' , payload: user  })
           unsup()
         })
        
    }, [])
    
      console.log({AuthContextState : state.user, isLogin: state.authIsReady });
    return (
        <AuthContext.Provider value={{...state , dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}