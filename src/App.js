import { Navigate, Route , Routes} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./commponets/Navbar";
//compponets
import Home from './pages/home/Home'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
function App() {

   const {user , authIsReady} = useAuthContext()
  return (
    
    <div className="App">
    {authIsReady&& (
       <>
       <Navbar/>
        <Routes>
         <Route path="/" element={user? <Home/> : <Navigate to="/login"/>}/>
         <Route path="/login" element={user? <Navigate to="/"/> :<Login/>}/>
         <Route path="/signup" element={user? <Navigate to="/"/> : <Signup/>}/>
        </Routes>   
        </>
    )}
    
    </div>
  );
}

export default App;
