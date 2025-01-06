import { Button } from "@mui/material";
import "./HeaderHomeLogin.css";
import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login'; // Icon đăng nhập từ Material UI
import React from "react";

export const HeaderHomeLogin = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  const handleShowForm = () => {
    setFormType('login');
    setShowForm(true);
  };

  const handleShowFormSignup = () => {
    setFormType('signup');
    setShowForm(true);
  };

  const handleOverlayClick = () => {
    setShowForm(false);
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="wrapper_formlogin">
      <div>
        <Button className="but_signup" variant="contained" color="success" size="medium" onClick={handleShowFormSignup}>
          Đăng ký
        </Button>
      </div>
      <div>
        <Button className="but_login" variant="contained" color="success" size="medium" onClick={handleShowForm}>
          <LoginIcon className="icon_login" /> {/* Icon hiển thị */}
        </Button>
      </div>
      {showForm && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="form" onClick={handleFormClick}>
            <FormLayout
              formType={formType}
              onLoginClick={handleShowForm}
              onSignUpClick={handleShowFormSignup}
              onCloseForm={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
