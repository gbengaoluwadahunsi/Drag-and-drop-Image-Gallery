import  { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

const SignUp = () => {
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Sign up successful');
        setError(null);
        navigate('/signin');
      })
      .catch((error) => {
        console.log(error);
        setError('Invalid registration, try again');
      });
  };

  return (
    <>
      <div className=" homepage  h-screen " data-testid="sign-page">
        <div className="grid grid-cols-2 w-5/6 mx-auto py-8 font-bold">
          <div className="justify-self-start">
            <span className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2" data-testid="homepage-logo">
              <Link to={"/"}>DropImagery</Link>
            </span>
          </div>

          <div className="justify-self-end"> 
            <span className="bg-gradient-to-r from-green-400 to-blue-400 rounded hover:from-pink-500 hover:to-rose-500 cursor-pointer p-2">
              <Link to={"/"} data-testid="homepage-login-link">Home</Link>              
            </span>
          </div>
        </div>

        <div className='login bg-black opacity-80 rounded w-3/4 md:w-2/4 lg:w-1/3 h-4/5'>
          <form onSubmit={handleSignUp}  className='h-full grid grid-cols-1 rounded mx-auto text-center gap-2 p-4 md:p-10 lg:p-10 text-white'>
            <div className="mx-auto text-center ">
              <span className=' md:text-2xl lg:text-3xl font-extrabold'>Create an  Account</span>
            </div>

            <div className='grid grid-rows-1  text-black gap-2 lg:grid-cols-2 rounded'>
              <div className=''>
                <input type="text" name="firstname" id="firstname" placeholder='First Name' className='rounded h-10 pl-[14px] focus:outline-none full  w-full' />
              </div>
              <div>
                <input type="text" name="lastname" id="lastname" placeholder='Last Name' className='rounded  h-10 pl-[14px] focus:outline-none   w-full' />
              </div>
            </div>

            <div>
              <input
                type="email"
                value={email}
                placeholder='Enter your Email'
                onChange={(e) => setUserName(e.target.value)}
                required
                data-testid="signup-email"
                className='rounded mt-1 h-10 pl-[14px] focus:outline-none text-gray-900 w-full'
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                placeholder='Enter your Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="signup-password"
                className='rounded h-10 pl-[14px] focus:outline-none text-gray-900 w-full'
              />
            </div>

            <div className='text-xs justify-self-start'>
              <input id="checkbox" type="checkbox" />
              <label className='' htmlFor="checkbox"> I agree to  DropImagery&apos;s <Link to={'/'}><span className='underline'>Terms of service</span></Link></label>
            </div>

            <div>
              <button className= " button bg-blue-400  hover:bg-blue-800 rounded  py-2" type="submit"  data-testid="signup-button">Sign Up</button>
            </div>

          </form>
          {error && <div style={{ color: 'red' }} data-testid="signup-error">{error}</div>}
        </div>

      </div>
    </>
  );
};

export default SignUp;
