import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlockChainProject_backend } from '../../../declarations/BlockChainProject_backend/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setCookie } from './Helper';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const loginResult = await finalproject_backend.login(email, {
        userEmail: email,
        userPassword: password,
      });
      
      console.log("Login successful:", loginResult);

      
      if (loginResult === 'Login success') {
        
        setCookie('userEmail', email);
        navigate('/comments');
       
        toast.success('Login successful');
      } else {
        
        toast.error(loginResult);
      }

    } catch (error) {
      console.error("Login failed:", error);
      
      toast.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 5px 0px #ccc' }}>
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <p>Not a user? <Link to="/">Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;