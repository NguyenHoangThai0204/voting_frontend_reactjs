// // import { TextField, InputAdornment, Button } from '@mui/material';
// // import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// // import React, { useState, useEffect } from 'react';
// // import { initializeApp } from "firebase/app";
// // import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// // import GoogleIcon from '@mui/icons-material/Google';

// // declare global {
// //   interface Window {
// //     recaptchaVerifier: RecaptchaVerifier;
// //     confirmationResult: import("firebase/auth").ConfirmationResult;
// //   }
// // }

// // const firebaseConfig = {
// //     apiKey: "AIzaSyCLXYNeeK0K-mKjwZa6MelAFQPCCjCGKzM",
// //     authDomain: "phonepollweb.firebaseapp.com",
// //     projectId: "phonepollweb",
// //     storageBucket: "phonepollweb.firebasestorage.app",
// //     messagingSenderId: "714332797208",
// //     appId: "1:714332797208:web:6903537c85ae7454adc66d",
// //     measurementId: "G-3YQ69W0S5X"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// // export default function SignUpForm({ onLoginClick }: { onLoginClick: () => void }) {
// //     const [phoneNumber, setPhoneNumber] = useState<string>('');
// //     const [otpCode, setOtpCode] = useState<string>('');
// //     const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

// //     useEffect(() => {
// //         // Khởi tạo reCAPTCHA chỉ một lần khi component render lần đầu
// //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
// //             size: 'invisible',
// //             callback: () => {
// //                 console.log('Recaptcha resolved');
// //             }
// //         });
// //         window.recaptchaVerifier.render();
// //     }, []);

// //     const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setPhoneNumber(event.target.value);
// //     };

// //     const handleCall = () => {
// //         if (!phoneNumber) {
// //             alert("Vui lòng nhập số điện thoại.");
// //             return;
// //         }

// //         const appVerifier = window.recaptchaVerifier;
// //         const formattedPhoneNumber = `${phoneNumber}`;

// //         signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
// //             .then((confirmationResult) => {
// //                 window.confirmationResult = confirmationResult;
// //                 setIsCodeSent(true);
// //                 alert("Mã xác thực đã được gửi đến số điện thoại của bạn.");
// //             })
// //             .catch((error) => {
// //                 console.error("Lỗi gửi mã: ", error);
// //                 alert("Đã xảy ra lỗi khi gửi mã xác thực.");
// //             });
// //     };

// //     const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setOtpCode(event.target.value);
// //     };

// //     const handleVerifyOtp = () => {
// //         const confirmationResult = window.confirmationResult;
// //         if (!confirmationResult) {
// //             alert("Vui lòng yêu cầu mã xác thực trước.");
// //             return;
// //         }
// //         confirmationResult.confirm(otpCode)
// //             .then(() => {
// //                 alert("Xác thực thành công!");
// //                 // Handle successful authentication here
// //             })
// //             .catch((error) => {
// //                 console.error("Lỗi xác thực: ", error);
// //                 alert("Mã xác thực không đúng hoặc đã hết hạn.");
// //             });
// //     };

// //     return (
// //         <form>
// //             <h2>Sign Up</h2>
// //             <div className="form_login">
// //                 <TextField
// //                     id="phone-number"
// //                     label="Phone number"
// //                     variant="standard"
// //                     size="small"
// //                     value={phoneNumber}
// //                     onChange={handlePhoneNumberChange}
// //                     InputProps={{
// //                         endAdornment: (
// //                             <InputAdornment position="end">
// //                                 <PhoneAndroidIcon />
// //                             </InputAdornment>
// //                         )
// //                     }}
// //                 />
// //                 <br />
// //                 <br />
// //                 {phoneNumber && !isCodeSent && (
// //                     <Button variant="contained" color="primary" onClick={handleCall}>
// //                         Gửi mã OTP
// //                     </Button>
// //                 )}
// //                 {isCodeSent && (
// //                     <>
// //                         <TextField
// //                             id="otp-code"
// //                             label="Nhập OTP"
// //                             variant="standard"
// //                             type="tel"
// //                             size="small"
// //                             style={{ marginTop: '10px' }}
// //                             value={otpCode}
// //                             onChange={handleOtpChange}
// //                         />
// //                         <Button variant="contained" style={{ marginTop: '10px' }} color="primary" onClick={handleVerifyOtp}>
// //                             Xác thực OTP
// //                         </Button>
// //                     </>
// //                 )}
// //                 <br />
// //                 <br />
// //                 <div id="recaptcha-container"></div>
// //             </div>

// //             <div className="button">
// //                 <Button variant="text" onClick={onLoginClick}>Login</Button>
// //             </div>
// //             <div className="forgot">
// //                 <Button
// //                     variant="outlined"
// //                     startIcon={<GoogleIcon />}
// //                     href="https://accounts.google.com/signin"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                 >
// //                     Đăng ký với Google
// //                 </Button>
// //             </div>
// //         </form>
// //     );
// // }

// import { TextField, InputAdornment, Button } from '@mui/material';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import React, { useState, useEffect } from 'react';
// // import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { RecaptchaVerifier } from "firebase/auth";
// import GoogleIcon from '@mui/icons-material/Google';

// declare global {
//     interface Window {
//         recaptchaVerifier: RecaptchaVerifier;
//         confirmationResult: import("firebase/auth").ConfirmationResult;
//     }
// }

// import firebase from "./firebase";

// export default function SignUpForm({ onLoginClick }: { onLoginClick: () => void }) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [phoneNumber, setPhoneNumber] = useState<string>('');
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [otpCode, setOtpCode] = useState<string>('');
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

//     const setUpRecaptcha = () => {
//         window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//             "recaptcha-container",
//             {
//                 size: "invisible",
//                 defaultCountry: 'VN',

//             }
//         );
//     }

//     const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPhoneNumber(event.target.value);
//     };

//     const handleCall = async() => {
//             // setPhoneNumber(event.target.value);
//             const appVerifier = window.recaptchaVerifier;
//             await firebase
//             .auth()
//             .signInWithPhoneNumber(phoneNumber, appVerifier)
//             .then((confirmationResult)=>{
//                 window.confirmationResult = confirmationResult;
//                 alert("OTP đã được gửi đến số điện thoại của bạn.");
//             })
//         };

//     useEffect(() => {
//         setUpRecaptcha();
//     }, []);

//     return (
//         <form>
//             <h2>Sign Up</h2>
//             <div className="form_login">
//                 <TextField
//                     id="phone-number"
//                     label="Phone number"
//                     variant="standard"
//                     size="small"
//                     value={phoneNumber}
//                     onChange={handlePhoneNumberChange}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <PhoneAndroidIcon />
//                             </InputAdornment>
//                         )
//                     }}
//                 />
//                 <br />
//                 <br />
//                 {phoneNumber && !isCodeSent && (
//                     <Button variant="contained" color="primary" onClick={handleCall}>
//                     {/* <Button variant="contained" color="primary" > */}
//                         Gửi mã OTP
//                     </Button>
//                 )}
//                 {isCodeSent && (
//                     <>
//                         <TextField
//                             id="otp-code"
//                             label="Nhập OTP"
//                             variant="standard"
//                             type="tel"
//                             size="small"
//                             style={{ marginTop: '10px' }}
//                             value={otpCode}
//                             // onChange={handleOtpChange}
//                         />
//                         <Button variant="contained" style={{ marginTop: '10px' }} color="primary">
//                             {/* <Button variant="contained" style={{ marginTop: '10px' }} color="primary" onClick={handleVerifyOtp}> */}
//                             Xác thực OTP
//                         </Button>
//                     </>
//                 )}
//                 <br />
//                 <br />
//                 <div id="recaptcha-container"></div>
//             </div>

//             <div className="button">
//                 <Button variant="text" onClick={onLoginClick}>Login</Button>
//             </div>
//             <div className="forgot">
//                 <Button
//                     variant="outlined"
//                     startIcon={<GoogleIcon />}
//                     href="https://accounts.google.com/signin"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Đăng ký với Google
//                 </Button>
//             </div>
//         </form>
//     );
// }
