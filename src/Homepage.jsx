import './index.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function Homepage() {


  return (
    <>
     
       <div className="homepage  h-screen grid grid-rows-3 lg:grid-rows-4 lazy " data-testid="homepage-container">

         <div className="grid grid-cols-2 w-5/6 mx-auto py-8 font-bold">
           <div className="justify-self-start">
              <span className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2" data-testid="homepage-logo">DropImagery</span>
            </div>

           <div className="justify-self-end"> 
             <span className="bg-gradient-to-r from-green-400 to-blue-400 rounded hover:from-pink-500 hover:to-rose-500 cursor-pointer p-2">
               <Link to={"/login"} data-testid="homepage-login-link">Sign In</Link>              
             </span>
           </div>

         </div>

         <div className="w-4/5 lg:w-1/2 mx-auto text-center welcome">
          <h1 className="my-2 text-rose-600 z-50 font-medium text-3xl" data-testid="homepage-welcome-header">
            Hello there, warm welcome to <span className="font-extrabold">DropImagery</span>
          </h1>
            <p className="bg-black p-2 bg-opacity-50 text-white" data-testid="homepage-description">
              DropImagery is an image space where some stunning camera moments captured by awesome photographers are displayed, feel free to move the pictures around and you can also save them to your devices.
            </p>
           
            <Link className='text-white' to={"/login"}>
            <span className="px-8 py-1 cursor-pointer rounded mt-2 inline-block bg-rose-700" data-testid="homepage-get-started-button">
              Get Started  <FontAwesomeIcon icon={faAnglesRight} />
            </span>
            </Link>
            
         </div>

       </div>
    
    </>
  )
}

export default Homepage;
