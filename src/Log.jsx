import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className='login bg-black opacity-80 rounded  w-3/4 md:w-2/4 lg:w-1/3  h-4/5'>
      
      <form onSubmit={handleLogin} className='h-full  grid grid-cols-1 rounded mx-auto text-center p-10  text-white'>
      <div className="mx-auto  text-center ">
        <span className='  text-3xl font-extrabold'>Sign In</span>
      </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className='rounded h-10  pl-[14px] focus:outline-none text-gray-900 w-full '
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='rounded h-10  pl-[14px] focus:outline-none text-gray-900 w-full'
          />
        </div>
        <div>
          <button className=" bg-blue-400 rounded w-5/6 py-2" type="submit" disabled={isLoading}>
            {authUser ? 'Log Out' : 'Log In'}
          </button>
          </div>
          <div className= " bg-red-900  grid grid-cols-2 ">
           <div> <input  id = "checkbox" type="checkbox" /> <label className='' htmlFor="checkbox"> Remember me</label></div>
            <span className='lg:ml-10'>Need Help?</span>          
          </div>

        <div className='text-start'>
          <span className='text-gray-300 '>New to DropImagery? <span className='font-semibold '><Link to={'/'}  className='text-white'>Sign Up Now</Link></span>.</span></div>
      </form>
      {authUser && <p>{`Logged in as ${authUser.email}`}</p>}
      {isLoading && <p>Loading...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>

      );
};

export default LogIn;
