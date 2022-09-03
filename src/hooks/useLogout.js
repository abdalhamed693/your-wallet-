import { useState ,useEffect} from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/firebase";


export const useLogout = ()=>{
    const [isPinding , setIsPinding] = useState(false)
    const [isCanselled , setIsCanselled] = useState(false)
    const [error , setError] = useState(null)
    const {dispatch} = useAuthContext()

    const logout = async ()=>{
     setError(null)
     setIsPinding(true)

     try {
        await projectAuth.signOut()
        dispatch({type : 'LOGOUT'})
        if (!isCanselled) {
            setIsPinding(false)
            setError(null)
        }

     } catch (err) {
        if (!isCanselled) {
        setIsPinding(false)
        setError(err.massege)
        }
        console.log(err);
     }
    }
    useEffect(() => {
      return () => {
        setIsCanselled(true)
      }
    }, [])
    

    return {isPinding , error , logout}
}