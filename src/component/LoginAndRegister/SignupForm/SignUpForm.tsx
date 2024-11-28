import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
// import { auth } from "./firebase";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { loginGoogle } from "../../../api/CallApi"; // Thêm API kiểm tra email
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextapi/AuthContext";
import { registerUser } from "../../../api/CallApi";
import "./SignUpForm.css";

declare global {
}

interface SignUpFormProps {
  onLoginClick: () => void;
}

export default function SignUpForm({ onLoginClick }: SignUpFormProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  const validateUsername = (name: string): string => {
    if (!name) return "Tên người dùng không được để trống.";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email) return "Email không được để trống.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Email không hợp lệ.";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Mật khẩu không được để trống.";
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(password))
      return "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ và số.";
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (!confirmPassword) return "Mật khẩu xác nhận không được để trống.";
    if (password !== confirmPassword) return "Mật khẩu xác nhận không khớp.";
    return "";
  };
  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form gửi đi và tải lại trang
    // Kiểm tra lỗi cho từng trường
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
   
    // Cập nhật state lỗi
    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
  
    // Nếu có lỗi, dừng lại và không thực hiện hành động tiếp theo
    if (usernameError || emailError || passwordError || confirmPasswordError) {
        return;
    }
    else {
        // Gọi API đăng ký người dùng
        const dataUser ={
            email: email,
            password: password,
            fullName: username,
        }
        const response = await registerUser(dataUser);
        console.log("response:" + response);
        if (!response) {
            alert("Đăng ký thất bại. Vui lòng thử lại.");
            return;
        }
        
        alert("Đăng ký thành công!");
        // setIsPopupOpen(false);
        navigate("/home");
    }
  };
  

  // Google login
  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      // Lấy idToken từ Google response
      const token = response.credential;
      if (!token) {
        console.error("No idToken found in the response.");
        alert("Login failed. Please try again.");
        return;
      }
      console.log("Credential token:", token);
      const user = await loginGoogle(token);
      if (user) {
        console.log("authContext" + user.data);
        authContext?.login(user.data); // Truyền toàn bộ dữ liệu người dùng vào context
        navigate("/home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while trying to log in.");
    }
  };

  return (
    <form
    >
      <h2>Đăng Ký</h2>
      <div className="form_signup">
        <div className="additional-info">
          <TextField
            id="username"
            label="Tên đầy đủ"
            fullWidth
            variant="standard"
            className="inputTextField"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
          className="inputTextField"
            id="email"
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
          className="inputTextField"
            id="password"
            label="Mật khẩu"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
          className="inputTextField"
            id="confirm-password"
            label="Nhập lại mật khẩu"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handlePopupSubmit}
          >
            ĐĂNG KÝ
          </Button>
        </div>
        </div>

      <div className="button">
        <Button variant="text" onClick={onLoginClick}>
          Đăng nhập
        </Button>
      </div>

      <div className="forgot">
      <GoogleLogin
  onSuccess={handleGoogleLogin}
  containerProps={{
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: "200px",
    },
  }}
/>

      </div>
    </form>
  );
}
