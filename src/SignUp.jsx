import  { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const SignUp = () => {
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Sign up successful');
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError('Invalid registration, try again');
      });
  };

  return (
    <>
      <div className='login' data-testid="signup-container">
        <h2>CREATE AN ACCOUNT</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>UserName:</label>
            <input
              type="email"
              value={email}
              placeholder='Enter your Email'
              onChange={(e) => setUserName(e.target.value)}
              required
              data-testid="signup-email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder='Enter your Password'
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="signup-password"
            />
          </div>
          <button type="submit" data-testid="signup-button">Register</button>
        </form>
        {error && <div style={{ color: 'red' }} data-testid="signup-error">{error}</div>}
      </div>
    </>
  );
};

export default SignUp;
