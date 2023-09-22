import LogIn from "./Login";
import { Link } from "react-router-dom";


 


function Authenticationpage() {
  return (
     <>
        <div className=" homepage  h-screen " data-testid="authentication-page">
        <div className="grid grid-cols-2 w-5/6 mx-auto py-8 font-bold">
           <div className="justify-self-start">
              <span className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2" data-testid="homepage-logo"><Link to={"/"}>DropImagery</Link></span>
            </div>

           <div className="justify-self-end"> 
             <span className="bg-gradient-to-r from-green-400 to-blue-400 rounded hover:from-pink-500 hover:to-rose-500 cursor-pointer p-2">
               <Link to={"/"} data-testid="homepage-login-link">Home</Link>              
             </span>
           </div>

         </div>

       <LogIn />
        {/* <SignUp /> */}
        </div>
     </>
  )
}

export default Authenticationpage;
