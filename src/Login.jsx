import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className='login mt-10 h-4/5'>
      <div className="mx-auto  grid grid-cols-3 w-60 text-center mb-4">
        <span className=' col-span-2 font-bold'>LOGIN INTO ACCOUNT</span>
        <Link to="/" className="button p-2 rounded bg-rose-700 text-white">
          Home
        </Link>
      </div>
      <form onSubmit={handleLogin} className='h-4/5 grid grid-cols-1 md:w-2/4 lg:w-2/4 rounded mx-auto text-center p-10 bg-rose-700 text-white'>
        <div>
          <label className='font-bold'>UserName:</label>
          <input
            type="email"
            value={email}
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className='rounded-lg ml-2 pl-[14px] focus:outline-none text-gray-900 w-full lg:w-1/2'
          />
        </div>
        <div className=''>
          <label className='font-bold'>Password:</label>
          <input
            type="password"
            value={password}
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='rounded-lg ml-2 pl-[14px] focus:outline-none text-gray-900 w-full lg:w-1/2 '
          />
        </div>
        <div>
          <button className="button bg-blue-400" type="submit" disabled={isLoading}>
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
