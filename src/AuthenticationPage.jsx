import LogIn from "./Login";
import { Link } from "react-router-dom";


 


function Authenticationpage() {
  return (
     <>
        <div className=" bg-blue-100 h-screen" data-testid="authentication-page">
        <div className= 'grid place-items-center'>
          <span 
            className="m-4 cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 text-3xl font-extrabold hover:from-pink-500 hover:to-rose-500 rounded px-6 py-2"
            data-testid="drop-imagery-text"
          >
            <Link to="/">DropImagery</Link>
          </span>
        </div>
       <LogIn />
        {/* <SignUp /> */}
        </div>
     </>
  )
}

export default Authenticationpage;
