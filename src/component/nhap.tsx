// .wrapper_form_login {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//     position: relative;
//   }
  
//   .wrapper_form_login .header__home_name {
//     margin-right: 5px;
//   }
  
//   .wrapper_form_login .header__home_icon {
//     cursor: pointer;
//     position: relative; /* Định vị để thêm trạng thái chấm tròn */
//   }
  
//   .wrapper_form_login .header__home_icon img {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     margin-left: 15px;
//   }
  
//   .wrapper_form_login .header__home_icon .status-indicator {
//     position: absolute;
//     bottom: 2px;
//     right: 2px;
//     width: 12px;
//     height: 12px;
//     background-color: #027306; /* Màu xanh lá thể hiện trạng thái hoạt động */
//     border: 2px solid #fff; /* Viền trắng để nổi bật */
//     border-radius: 50%;
//     box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); /* Tạo hiệu ứng bóng nhẹ */
//     animation: ripple-effect 2s infinite; /* Gọi hiệu ứng tỏa */
//   }
  
//   /* Tạo hiệu ứng lan tỏa */
//   .wrapper_form_login .header__home_icon .status-indicator::before {
//     content: "";
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 12px;
//     height: 12px;
//     background-color: rgba(6, 197, 12, 0.5); /* Màu sắc nhạt hơn */
//     border-radius: 50%;
//     transform: translate(-50%, -50%);
//     animation: ripple-effect 2s infinite;
//   }
  
//   /* Định nghĩa animation tỏa */
//   @keyframes ripple-effect {
//     0% {
//       transform: translate(-50%, -50%) scale(1);
//       opacity: 0.8;
//     }
//     50% {
//       opacity: 0.5;
//     }
//     100% {
//       transform: translate(-50%, -50%) scale(1.5); /* Thu nhỏ từ 2.5 xuống 1.5 */
//       opacity: 0;
//     }
//   }
  
  
//   .wrapper_form_login .overlay {
//     position: fixed;
//     top: 55px;
//     right: 0;
//     margin-right: 100px;
//     width: 100%;
//     height: 100%;
//     padding: 70px;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     z-index: 1000;
//   }
  
//   .wrapper_form_login:hover .menu_layout_logged {
//     display: block;
//   }
  
//   @media screen and (max-width: 900px) {
//     .wrapper_form_login {
//       flex-direction: column;
//     }
  
//     .wrapper_form_login .header__home_icon {
//       display: flex;
//       justify-content: flex-end;
//     }
  
//     .wrapper_form_login .header__home_name {
//       display: none;
//     }
  
//     .wrapper_form_login .overlay {
//       margin-right: 0;
//       padding: 0;
//       top: 55px;
//       right: 0;
//       width: 100%;
//       height: 100%;
//       padding: 75px 20px 0 0;
//       display: flex;
//       justify-content: flex-end;
//       align-items: center;
//       z-index: 1000;
//     }
  
//     .wrapper_form_login .header__home_icon img {
//       margin-left: 0;
//     }
//   }
  