import { projectAuth } from "../firebase/firebase";
import { useState , useEffect} from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = ()=>{
     
    const [isPinding , setIsPinding] = useState(false)
    const [error , setError] = useState(null)
    const [isCanselled , setIsCanselled] = useState(false)
    const {dispatch} = useAuthContext()
    const login = async (email , password )=>{
      setError(null)
      setIsPinding(true)

      try{
        const res = await projectAuth.signInWithEmailAndPassword(email,password)
     
        if (!res) {
            throw new Error ('Could Not Compleat The Singup')
        }
        
        dispatch({type : 'LOGIN' , payload: res.user})
        if (!isCanselled) {
          setIsPinding(false)
          setError(null)
        }
      }catch(err){
          if (!isCanselled) {
            setIsPinding(false)
            setError(err.message)
            console.log(err.message);
          }
      }
    }


    useEffect(() => {
      return () =>  setIsCanselled(true)
      
    }, [])
    

    return{error,isPinding,login}

}