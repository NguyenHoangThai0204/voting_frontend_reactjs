import React from 'react';
import LoginForm from '../LoginFrom/LoginForm';
import SignUpForm from '../SignupForm/SignUpForm';
import './FormLayout.css';

// Định nghĩa kiểu dữ liệu cho props
interface FormLayoutProps {
  formType: 'login' | 'signup'; // Chỉ cho phép 'login' hoặc 'signup'
  onLoginClick: () => void; // Hàm không có tham số, trả về void
  onSignUpClick: () => void;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ formType, onLoginClick, onSignUpClick }) => {
  return (
    <div className="body">
      <div className="wrapper">
        {/* Phần nội dung bên phải */}
        <div className="content_login_right">
          <h1>Chào mừng bạn đến với cuộc biểu tình</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio nihil in. Veritatis voluptatem labore odio eveniet, maiores doloribus alias!
          </p>
        </div>

        {/* Phần nội dung bên trái */}
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
