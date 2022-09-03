import { projectAuth } from "../firebase/firebase";
import { useState , useEffect} from "react";
import { useAuthContext } from "./useAuthContext";
export const useSingup = ()=>{
  
    const [isPinding , setIsPinding] = useState(false)
    const [error , setError] = useState(null)
    const [isCanselled , setIsCanselled] = useState(false)
    const {dispatch} = useAuthContext()
    const singup = async (email , password , displayName)=>{
      setError(null)
      setIsPinding(true)

      try{
        const res = await projectAuth.createUserWithEmailAndPassword(email,password)
     
        if (!res) {
            throw new Error ('Could Not Compleat The Singup')
        }
        await res.user.updateProfile({displayName})
        
        dispatch({type : 'LOGIN' , payload: res.user})
        if (!isCanselled) {
          setIsPinding(false)
          setError(null)
        }
      }
      catch(err){
          if (!isCanselled) {
            console.log(err.message);
            setIsPinding(false)
            setError(err.message)
          }
      }
    }
    useEffect(() => {
      return () => setIsCanselled(true)
    }, [])
    

    return{error,isPinding,singup}

}