import  { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (authUser) {
      try {
        await signOut(auth);
        console.log('Sign out successful');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        setError(null);
        navigate('/imagegallery');
      } catch (error) {
        console.error(error);
        setError('Email or Password invalid');
      }
    }

    setIsLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <div className=" homepage  h-screen " data-testid="login-page">
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

        <div className='login bg-black  rounded w-3/4 md:w-2/4 lg:w-1/3 h-4/5'>
          <form onSubmit={handleLogin} className='h-full grid grid-cols-1 rounded mx-auto text-center  p-4  md:p-10 lg:p-10 text-white'>
            <div className="mx-auto text-center ">
              <span className=' text-lg font-extrabold'><span className='block text-3xl'>Welcome back,</span > sign  in to your Account</span>
            </div>
            <div>
              <input
                type="email"
                value={email}
                placeholder='Enter your Email'
                onChange={(e) => setEmail(e.target.value)}
                required
                className=' border-2 border-blue-700 rounded h-10 pl-[14px] focus:outline-none text-gray-900 w-full'
              />
            </div>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder='Enter your Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='border-2 border-blue-700 rounded h-10 pl-[14px] pr-10 focus:outline-none text-gray-900 w-full'
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-0 mr-2 mt-1 text-blue-700 outline-none"
              >
                 <FontAwesomeIcon  className='text-xl' icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div>
              <button className= " button bg-blue-700  hover:bg-blue-800 rounded  py-2" type="submit" disabled={isLoading}>
                {authUser ? 'Sign Out' : 'Sign In'}
              </button>
            </div>
            <div className= " text-xs grid grid-cols-2">
              <div className='justify-self-start'>
                <input id="checkbox" type="checkbox" />
                <label className='' htmlFor="checkbox"> Remember me</label>
              </div>
              <span className='lg:ml-10 justify-self-end'><Link to={'/'}>Need Help?</Link></span>          
            </div>
            <div className=' text-xs text-start'>
              <span className='text-gray-300 '>New to DropImagery? <span className='font-semibold '><Link to={'/sign-up'} className='text-white'>Sign Up Now</Link></span>.</span>
            </div>
          </form>
          {authUser && <p className='text-black'>{`Signed in as ${authUser.email}`}</p>}
          {isLoading && <p>Loading...</p>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Login;
