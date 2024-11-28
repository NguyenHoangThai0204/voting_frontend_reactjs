import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginFrom/LoginForm';
import SignUpForm from '../SignupForm/SignUpForm';
import './FormLayout.css';

interface FormLayoutProps {
  formType: 'login' | 'signup';
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onCloseForm: () => void; // Thêm prop này để đóng form
}

export const FormLayout: React.FC<FormLayoutProps> = ({ formType, onLoginClick, onSignUpClick, onCloseForm }) => {
  const [currentImage, setCurrentImage] = useState('/assets/nen1.png');
  const [nextImage, setNextImage] = useState('/assets/nen2.png');
  const [isSliding, setIsSliding] = useState(false);

  // Tự động chuyển đổi ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage((prevImage) =>
          prevImage === '/assets/nen1.png' ? '/assets/nen2.png' : '/assets/nen1.png'
        );
        setIsSliding(false);
      }, 1000); // Thời gian trượt ảnh
    }, 3000); // Đổi ảnh mỗi 3 giây

    return () => clearInterval(interval); // Xoá khi unmount để tránh rò rỉ bộ nhớ
  }, [nextImage]);

  // Hàm đóng form khi click vào overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Ngừng sự kiện nếu click vào trong form, nếu không thì đóng form
    e.stopPropagation();
    onCloseForm(); // Gọi hàm từ bên ngoài để đóng form
  };

  return (
    <div className="body">
      <div className="overlay" onClick={handleOverlayClick}> {/* Thêm sự kiện cho overlay */}
        <div className="wrapperFormLayout" onClick={(e) => e.stopPropagation()}> {/* Ngừng sự kiện click trên form */}
          <div className={`content_login_right ${isSliding ? 'sliding' : ''}`}>
            <img src={currentImage} alt="Background" />
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
    </div>
  );
};



// import React, { useState, useEffect } from 'react';
// import LoginForm from '../LoginFrom/LoginForm';
// import SignUpForm from '../SignupForm/SignUpForm';
// import './FormLayout.css';
// import CancelIcon from '@mui/icons-material/Cancel';

// interface FormLayoutProps {
//   formType: 'login' | 'signup';
//   onLoginClick: () => void;
//   onSignUpClick: () => void;
// }

// export const FormLayout: React.FC<FormLayoutProps> = ({ formType, onLoginClick, onSignUpClick }) => {
//   const [currentImage, setCurrentImage] = useState('/assets/nen1.png');
//   const [nextImage, setNextImage] = useState('/assets/nen2.png');
//   const [isSliding, setIsSliding] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsSliding(true);
//       setTimeout(() => {
//         setCurrentImage(nextImage);
//         setNextImage((prevImage) =>
//           prevImage === '/assets/nen1.png' ? '/assets/nen2.png' : '/assets/nen1.png'
//         );
//         setIsSliding(false);
//       }, 1000);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [nextImage]);

//   return (
//     <div className="body">
//       <div className="wrapperFormLayout">
//         {/* Cột phải - Hình ảnh */}
//         <div className={`content_login_right ${isSliding ? 'sliding' : ''}`}>
//           <img src={currentImage} alt="Background" />
//         </div>

//         {/* Cột trái - Form */}
//         <div className="content_login_left">
//           {/* Nút Cancel */}
//           <CancelIcon
//             className="close-icon"
//             onClick={() => console.log('Close Form')}
//           />

//           {/* Render form đăng nhập hoặc đăng ký */}
//           {formType === 'signup' ? (
//             <SignUpForm onLoginClick={onLoginClick} />
//           ) : (
//             <LoginForm onSignUpClick={onSignUpClick} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
