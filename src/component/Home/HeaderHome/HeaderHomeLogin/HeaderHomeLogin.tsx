import { Button } from "@mui/material";
import "./HeaderHomeLogin.css";
import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

export const HeaderHomeLogin = () => {

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };

  const [showFormSignup, setShowFormSignup] = useState(false);
  const handleShowFormSignup = () => {
    setShowFormSignup(true);
  };

  return (
    <div className="wrapper">
      <div>
        <Button className="but_signup" variant="contained" color="success" size="medium" onClick={handleShowFormSignup}>
          Đăng ký
        </Button>
      </div>
      <div>
        <Button className="but_login" variant="contained" color="success" size="medium" onClick={handleShowForm}>
          Đăng nhập
        </Button>
      </div>
      {showForm && (
        <div className="overlay">
          <div className="form">
            <div className="close">
              <CancelIcon onClick={() => setShowForm(false)} style={{ color: 'red', cursor: 'pointer' }} />
            </div>
            <FormLayout />
          </div>
        </div>
      )}
      {showFormSignup && (
        <div className="overlay">
          <div className="form">
            <div className="close">
              <CancelIcon onClick={() => setShowFormSignup(false)} style={{ color: 'red', cursor: 'pointer' }} />
            </div>
            <FormLayout />
          </div>
        </div>
      )}
    </div>
  );
}
