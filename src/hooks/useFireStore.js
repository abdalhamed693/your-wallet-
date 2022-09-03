import { projectFireStore , timeStamp} from "../firebase/firebase";
import { useEffect ,useState , useReducer } from "react";


let initialState = {
    document : null ,
    isPending : false , 
    error : null ,
    success : null
}
const fireStoreReducer = (state , action) =>{
     switch (action.type) {
          case('IS_PENNDING'):
          return {isPending: true , document : null , error : null , success : null}
          case('ADDED_DOCUMENT') :
          return {isPending: false , document: action.payload , error:null , success: true}
          case('DELETED_DOCUMENT'):
          return {isPending: false , document: null , error:null , success: true}
          case('ERROR') : 
          return {isPending : false , document : null , error: action.payload , success: false  }
        default:
           return state
     }
}
export const useFireStor = (collection)=>{
  const [response , dispatch] = useReducer(fireStoreReducer , initialState)
  const [isCancelled , setisCancelled] = useState(false) 
  
  // collection refrance 
  const ref = projectFireStore.collection(collection)

  // add document 
  const addDocument = async (doc)=>{
     dispatch({type : 'IS_PENNDING'})
     try {
        const createdAt = timeStamp.fromDate(new Date())
        const addedDocument = await ref.add({...doc , createdAt})
       if (!isCancelled) {
        dispatch({type:'ADDED_DOCUMENT' , payload: addedDocument})
       } 
     } catch (error) {
       if (!isCancelled) {
        dispatch({type:'ERROR' , payload : error.message})
       }
        
     }
  }

  // delete document 
  const deleteDocument = async (id)=>{
    if (!isCancelled) {
      dispatch({type:'IS_PENNDING'})
    }

    try {
      await ref.doc(id).delete()
      if (!isCancelled) {
       dispatch({type: 'DELETED_DOCUMENT'})
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({type:'ERROR' , payload : error.message})
      }
    }
    
  }

  // cleanup function 
  useEffect(() => {

    return () => setisCancelled(true)
  }, [])
  
  return {addDocument , deleteDocument , response}
}