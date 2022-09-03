import { useEffect , useState , useRef} from "react";
import { projectFireStore } from "../firebase/firebase";


export const useColloction = (collection , _qurey , _order)=>{
  const [documents , setDocuments] = useState(null)
  const [error , setError] = useState(null)
  const qurey = useRef(_qurey).current
  const order = useRef(_order).current
    useEffect(() => {
      let ref = projectFireStore.collection(collection)
      
      if (qurey) {
        ref = ref.where(...qurey)
      }

      if (order) {
        ref = ref.orderBy(...order)
      }

      const unsup = ref.onSnapshot((snapshot)=>{
         let resulte = []
         snapshot.docs.forEach(doc=>{
           resulte.push({...doc.data() , id : doc.id})
         })
         setDocuments(resulte)
         setError(null)
      } , (error)=>{
        console.log(error);
        setError(error.message)
      })
    
      return () => unsup()
    }, [collection , qurey , order])
    
    return {documents , error }
}