import { Button } from "@mui/material";
import "./HeaderHomeLogin.css";
import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout";
import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

export const HeaderHomeLogin = () => {

  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Đăng nhập");

  const handleShowForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setButtonText("Login");
      } else {
        setButtonText("Login");
      }
    };
    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="but_login">
        <Button variant="contained" size="small" onClick={handleShowForm}>
          {buttonText}
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
    </div>
  );
}
