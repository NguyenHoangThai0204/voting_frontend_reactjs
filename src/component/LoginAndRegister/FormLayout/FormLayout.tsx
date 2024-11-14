// FormLayout.js
import React from 'react';
import LoginForm from '../LoginFrom/LoginForm';
import SignUpForm from '../SignupForm/SignUpForm';
import './FormLayout.css';

export const FormLayout = ({ formType, onLoginClick, onSignUpClick }) => {
  return (
    <div className="body">
      <div className="wrapper">
        <div className="content_login_right">
          <h1>
            Chào mừng bạn đến với cuộc biểu tình
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio nihil in. Veritatis voluptatem labore odio eveniet, maiores doloribus alias!
          </p>
        </div>
        <div className="content_login_left">
          {formType === 'signup' ? (
            <SignUpForm onLoginClick={onLoginClick} />
          ) : (
            <LoginForm onSignUpClick={onSignUpClick} />
          )}
        </div>
      </div>
    </div>
  );
};
