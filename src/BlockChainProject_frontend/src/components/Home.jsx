import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import phonebookImage from '../photos/phonebookImage';
// import Register from './Register';
import { isAuth } from './Helper';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  // const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  // const openRegisterModal = () => {
  //   setIsRegisterOpen(true);
  // };

  // const closeRegisterModal = () => {
  //   setIsRegisterOpen(false);
  // };

  // const isAuthenticated = isAuth();

  const handleContacts = () => {
    if (isAuthenticated) {
      navigate('/userpost'); 
    } else {
      openRegisterModal(); 
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="#contacts" className="navbar-brand d-flex align-items-center">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
              className="h-8 mr-3 text-slate-500"
              alt=""
            />
            <span className="navbar-text text-2xl font-weight-bold whitespace-nowrap text-gray-500">
              Media App
            </span>
          </a>
          <div className="d-flex align-items-center">
           
            {isAuthenticated && (
              <button
                className="btn btn-primary my-4"
                onClick={handleContacts}
              >
                Post
              </button>
            )}
            {!isAuthenticated && (
              <button
                className="btn btn-primary my-4"
                onClick={openRegisterModal}
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </nav>

      
      
    </div>
  );
}