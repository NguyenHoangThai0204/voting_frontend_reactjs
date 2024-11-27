// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import { auth } from "./firebase";
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { loginGoogle } from "../../../api/CallApi"; // Thêm API kiểm tra email
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../contextapi/AuthContext";

// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   ConfirmationResult,
// } from "firebase/auth";

// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//     confirmationResult: ConfirmationResult;
//   }
// }

// interface SignUpFormProps {
//   onLoginClick: () => void;
// }

// export default function SignUpForm({ onLoginClick }: SignUpFormProps) {
//   const [phone, setPhone] = useState<string>("+84");
//   const [otp, setOtp] = useState<string>("");
//   const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
//   const [confirmationResult, setConfirmationResult] =
//     useState<ConfirmationResult | null>(null);

//   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Trạng thái mở popup
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const authContext = React.useContext(AuthContext);
//   const navigate = useNavigate();

//   const setUpRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response: string) => {
//           console.log("reCAPTCHA solved:", response);
//         },
//         "expired-callback": () => {
//           console.error("reCAPTCHA expired. Please try again.");
//         },
//         defaultCountry: "VN",
//       }
//     );
//   };

//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phone.startsWith("+84") || phone.length < 11) {
//       alert(
//         "Vui lòng nhập số điện thoại đúng định dạng quốc tế (VD: +84123456789)."
//       );
//       return;
//     }

//     setUpRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const result = await signInWithPhoneNumber(auth, phone, appVerifier);
//       setConfirmationResult(result);
//       window.confirmationResult = result;
//       setIsOtpSent(true);
//     } catch (error) {
//       alert(`Không thể gửi OTP. Chi tiết: ${(error as Error).message}`);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (confirmationResult && otp) {
//       try {
//         await confirmationResult.confirm(otp);
//         alert("Xác minh thành công!");
//         setIsPopupOpen(true); // Hiện popup sau khi xác thực thành công
//       } catch (error) {
//         alert("OTP không chính xác hoặc đã hết hạn.");
//         console.error("Error verifying OTP:", error);
//       }
//     } else {
//       alert("Vui lòng nhập mã OTP hợp lệ.");
//     }
//   };

//   const validateUsername = (name: string): string => {
//     if (!name) return "Tên người dùng không được để trống.";
//     const regex = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơư ]+$/;
//     if (!regex.test(name))
//       return "Tên người dùng phải bắt đầu bằng chữ in hoa.";
//     return "";
//   };

//   const validateEmail = (email: string): string => {
//     if (!email) return "Email không được để trống.";
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!regex.test(email)) return "Email không hợp lệ.";
//     return "";
//   };

//   const validatePassword = (password: string): string => {
//     if (!password) return "Mật khẩu không được để trống.";
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     if (!regex.test(password))
//       return "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ và số.";
//     return "";
//   };

//   const validateConfirmPassword = (
//     password: string,
//     confirmPassword: string
//   ): string => {
//     if (!confirmPassword) return "Mật khẩu xác nhận không được để trống.";
//     if (password !== confirmPassword) return "Mật khẩu xác nhận không khớp.";
//     return "";
//   };
//   const handlePopupSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Ngăn form gửi đi và tải lại trang
//     // Kiểm tra lỗi cho từng trường
//     const usernameError = validateUsername(username);
//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);
//     const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  
//     // Cập nhật state lỗi
//     setErrors({
//       username: usernameError,
//       email: emailError,
//       password: passwordError,
//       confirmPassword: confirmPasswordError,
//     });
  
//     // Nếu có lỗi, dừng lại và không thực hiện hành động tiếp theo
//     if (usernameError || emailError || passwordError || confirmPasswordError) {
//         return;
//     }
//     else {
//         alert("Đăng ký thành công!");
//         setIsPopupOpen(false);
//         navigate("/home");
//     }
//   };
  

//   // Google login
//   const handleGoogleLogin = async (response: CredentialResponse) => {
//     try {
//       // Lấy idToken từ Google response
//       const token = response.credential;
//       if (!token) {
//         console.error("No idToken found in the response.");
//         alert("Login failed. Please try again.");
//         return;
//       }
//       console.log("Credential token:", token);
//       const user = await loginGoogle(token);
//       if (user) {
//         console.log("authContext" + user.data);
//         authContext?.login(user.data); // Truyền toàn bộ dữ liệu người dùng vào context
//         navigate("/home");
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred while trying to log in.");
//     }
//   };

//   return (
//     <form
//     >
//       <h2>Đăng Ký</h2>
//       <div className="form_login">
//         {!isOtpSent ? (
//           <>
//             {/* Nhập số điện thoại */}
//             <TextField
//               id="phone"
//               label="Số điện thoại"
//               variant="standard"
//               size="small"
//               value={phone}
//               onChange={(e) => {
//                 let input = e.target.value;
//                 if (!input.startsWith("+84")) input = "+84";
//                 if (input.length <= 12) setPhone(input);
//               }}
//               inputProps={{ maxLength: 12 }}
//             />
//             <div id="recaptcha-container"></div>
//             <br />
//             <Button variant="contained" color="primary" type="button" onClick={handleSendOtp}>
//               Gửi OTP
//             </Button>
//           </>
//         ) : (
//           <>
//             {/* Nhập OTP - chỉ hiển thị khi isPopupOpen = false */}
//             {!isPopupOpen && (
//               <>
//                 <TextField
//                   id="otp"
//                   label="Nhập mã OTP"
//                   variant="standard"
//                   size="small"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//                 <br />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="button"
//                   onClick={handleVerifyOtp} // Xác minh OTP trước khi mở các trường bổ sung
//                 >
//                   Xác minh OTP
//                 </Button>
//               </>
//             )}
//           </>
//         )}
//       </div>

//       {/* Các trường bổ sung thông tin người dùng */}
//       {isPopupOpen && (
//         <div className="additional-info">
//           <h3>Thông tin bổ sung</h3>
//           <TextField
//             id="username"
//             label="Tên người dùng"
//             fullWidth
//             variant="standard"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             error={!!errors.username}
//             helperText={errors.username}
//           />
//           <TextField
//             id="email"
//             label="Email"
//             fullWidth
//             variant="standard"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={!!errors.email}
//             helperText={errors.email}
//           />
//           <TextField
//             id="password"
//             label="Mật khẩu"
//             fullWidth
//             variant="standard"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             error={!!errors.password}
//             helperText={errors.password}
//           />
//           <TextField
//             id="confirm-password"
//             label="Xác nhận mật khẩu"
//             fullWidth
//             variant="standard"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             type="password"
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword}
//           />
//           <Button
//             type="button"
//             variant="contained"
//             color="primary"
//             style={{ marginTop: "1rem" }}
//             onClick={handlePopupSubmit}
//           >
//             ĐĂNG KÝ
//           </Button>
//         </div>
//       )}

//       <div className="button">
//         <Button variant="text" onClick={onLoginClick}>
//           Login
//         </Button>
//       </div>

//       <div className="forgot">
//         <GoogleLogin onSuccess={handleGoogleLogin} />
//       </div>
//     </form>
//   );
// }
