import { Button } from "@mui/material";
import "./HeaderHomeLogin.css";
import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout";
import { useState } from "react";
// import CancelIcon from '@mui/icons-material/Cancel';
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

  // Hàm đóng form khi click vào overlay
  const handleOverlayClick = () => {
    setShowForm(false);
  };

  // Ngừng sự kiện click khi người dùng nhấp vào form để tránh form bị đóng
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className="overlay" onClick={handleOverlayClick}> {/* Khi click vào overlay, đóng form */}
          <div className="form" onClick={handleFormClick}> {/* Ngừng sự kiện click lan rộng */}
            {/* <div className="close">
              <CancelIcon onClick={() => setShowForm(false)} style={{ color: 'red', cursor: 'pointer' }} />
            </div> */}
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



// import { Button } from "@mui/material";
// import "./HeaderHomeLogin.css";
// import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout";
// import { useState } from "react";


// export const HeaderHomeLogin = () => {

//   const [showForm, setShowForm] = useState(false);
//   const [formType, setFormType] = useState<'login' | 'signup'>('login');

//   const handleShowForm = () => {
//     setFormType('login');
//     setShowForm(true);
//   };

//   const handleShowFormSignup = () => {
//     setFormType('signup');
//     setShowForm(true);
//   };

//   return (
//     <div className="wrapper">
//       <div>
//         <Button className="but_signup" variant="contained" color="success" size="medium" onClick={handleShowFormSignup}>
//           Đăng ký
//         </Button>
//       </div>
//       <div>
//         <Button className="but_login" variant="contained" color="success" size="medium" onClick={handleShowForm}>
//           Đăng nhập
//         </Button>
//       </div>
//       {showForm && (
//         <div className="overlay">
//           <div className="form">
//             <FormLayout 
//               formType={formType} 
//               onLoginClick={handleShowForm} 
//               onSignUpClick={handleShowFormSignup} 
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
