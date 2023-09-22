import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

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
    <div className='login bg-black opacity-80 rounded md:w-2/4 lg:w-1/4 mt-10 h-4/5'>
      
      <form onSubmit={handleLogin} className='h-4/5 grid grid-cols-1  rounded mx-auto text-center p-10  text-white'>
      <div className="mx-auto   w-60 text-center mb-4">
        <span className=' col-span-2  text-3xl font-extrabold'>Sign In</span>
      </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className='rounded h-10 ml-2 pl-[14px] focus:outline-none text-gray-900 w-full '
          />
        </div>
        <div className=''>
          <input
            type="password"
            value={password}
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='rounded h-10 ml-2 pl-[14px] focus:outline-none text-gray-900 w-full  '
          />
        </div>
        <div>
          <button className="button bg-blue-400  w-70" type="submit" disabled={isLoading}>
            {authUser ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </form>
      {authUser && <p>{`Logged in as ${authUser.email}`}</p>}
      {isLoading && <p>Loading...</p>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default LogIn;
