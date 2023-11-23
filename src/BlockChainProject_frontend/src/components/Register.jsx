import React, { useState } from 'react';
import { BlockChainProject_backend } from '../../../declarations/BlockChainProject_backend';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    try {
      const result = await finalproject_backend.signUp(
        email,
        {
          userName: name,
          userEmail: email,
          userPassword: password,
        }
      );
  
      console.log("Registration successful:", result); 
  
      toast.success(result);
    } catch (error) {
      console.error( error);
      toast.error(error);
    }
  };
  return (
    <div>
      <ToastContainer />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 5px 0px #ccc' }}>
          <h2>Register</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
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
            <button type="button" className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
            <p>Already a user? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Register;