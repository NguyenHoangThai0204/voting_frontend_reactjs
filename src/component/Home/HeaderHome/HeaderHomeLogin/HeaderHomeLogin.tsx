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

  return (
    <div className="wrapper">
      <div>
        <Button className="but_login" variant="contained" color="success" size="small" onClick={handleShowForm}>
          Login
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
