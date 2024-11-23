import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from "firebase/app";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth, ConfirmationResult } from "firebase/auth";
import Swal from "sweetalert2";
const firebaseConfig = {
    apiKey: "AIzaSyCLXYNeeK0K-mKjwZa6MelAFQPCCjCGKzM",
    authDomain: "phonepollweb.firebaseapp.com",
    projectId: "phonepollweb",
    storageBucket: "phonepollweb.firebasestorage.app",
    messagingSenderId: "714332797208",
    appId: "1:714332797208:web:6903537c85ae7454adc66d",
    measurementId: "G-3YQ69W0S5X"
};

// Khởi tạo Firebase app
const app = initializeApp(firebaseConfig);

// Lấy đối tượng auth từ Firebase
const auth = getAuth(app);

// Khai báo các đối tượng toàn cục để dùng trong mã
declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult: ConfirmationResult;
    }
}

interface SignUpFormProps {
    onLoginClick: () => void;
}

export default function SignUpForm({ onLoginClick }: SignUpFormProps) {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        
        try {
            // Khởi tạo recaptchaVerifier
            const recaptchaVerifier = new RecaptchaVerifier(
                auth, // Sử dụng auth đúng
                "recaptcha-container", // ID của container reCAPTCHA
                {
                    size: "invisible", // Ẩn reCAPTCHA nếu cần
                    callback: () => {
                        console.log("reCAPTCHA resolved");
                    },
                }
            );

            // Đặt recaptchaVerifier vào window để có thể sử dụng ngoài phạm vi hàm
            window.recaptchaVerifier = recaptchaVerifier;

            // Gửi OTP qua số điện thoại với recaptchaVerifier đã khởi tạo
            const confirmationResult = await signInWithPhoneNumber(
                auth, // Tham số auth chính xác
                `+84${phoneNumber}`, // Số điện thoại với mã quốc gia
                recaptchaVerifier // recaptchaVerifier đã khởi tạo
            );

            // Lưu confirmationResult vào window để sử dụng khi xác minh OTP
            window.confirmationResult = confirmationResult;

            Swal.fire({
                icon: "success",
                title: "OTP sent",
                text: "OTP đã được gửi đến số điện thoại của bạn.",
                showClass: {
                    popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
                  },
                  hideClass: {
                    popup: "", // Tắt hiệu ứng biến mất
                  },
            });
            setIsCodeSent(true); // Cập nhật trạng thái là đã gửi mã OTP
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtpCode(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form_login">
                <TextField
                    id="phone-number"
                    label="Phone number"
                    variant="standard"
                    size="small"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PhoneAndroidIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <br />
                <br />
                <div id="recaptcha-container"></div>
                {phoneNumber && !isCodeSent && (
                    <>
                        <Button variant="contained" color="primary" type="submit">
                            Gửi mã OTP
                        </Button>
                        
                    </>
                )}
                {isCodeSent && (
                    <>
                        <TextField
                            id="otp-code"
                            label="Nhập OTP"
                            variant="standard"
                            type="tel"
                            size="small"
                            style={{ marginTop: '10px' }}
                            value={otpCode}
                            onChange={handleOTPChange}
                        />
                        <Button variant="contained" style={{ marginTop: '10px' }} color="primary">
                            Xác thực OTP
                        </Button>
                    </>
                )}
                <br />
                <br />
            </div>

            <div className="button">
                <Button variant="text" onClick={onLoginClick}>Login</Button>
            </div>
            <div className="forgot">
                <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    href="https://accounts.google.com/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Đăng ký với Google
                </Button>
            </div>
        </form>
    );
}
