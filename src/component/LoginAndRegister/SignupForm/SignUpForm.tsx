import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
// import { auth } from "./firebase";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { confirmGmail, loginGoogle, registerUser } from "../../../api/CallApi"; // Thêm API kiểm tra email
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextapi/AuthContext";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   ConfirmationResult,
// } from "firebase/auth";

declare global {}

interface SignUpFormProps {
  onLoginClick: () => void;
}

export default function SignUpForm({ onLoginClick }: SignUpFormProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // Trạng thái hiện/ẩn mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false); // Trạng thái hiện/ẩn mật khẩu xác nhận

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

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
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password))
      return "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.";
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
    try {
      // Kiểm tra lỗi cho từng trường
      const usernameError = validateUsername(username);
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      const confirmPasswordError = validateConfirmPassword(
        password,
        confirmPassword
      );
  
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
  
      // Gọi API đăng ký người dùng
      const dataUser = {
        email: email,
        password: password,
        fullName: username,
      };
  
      const response = await registerUser(dataUser);
      console.log("response", response);
  
      // Thông báo thành công
      if(response.status === 200){
      alert(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản."
      );
      // Nếu đăng ký thành công, gửi email xác nhận
      const res = await confirmGmail({ userMail: email });
  
      // Kiểm tra phản hồi từ API gửi email xác nhận
      if (!res) {
        alert("Gửi email xác nhận thất bại. Vui lòng thử lại.");
        return;
      }
      authContext?.logout(); // Đăng xuất người dùng hiện tại
      navigate("/home"); // Điều hướng sau khi đăng ký thành công
    }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
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
        // thông báo đăng nhập bằng google thành công
        const res = await confirmGmail({ userMail: user.data.email });
        if (!res) {
          alert("Gửi email xác nhận thất bại. Vui lòng thử lại.");
          return;
        }
        alert(
          "Đăng nhập thành công! Vui lòng kiểm tra email để xác nhận tài khoản."
        );
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
    <form>
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
            id="password"
            label="Mật khẩu"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="confirm-password"
            label="Nhập lại mật khẩu"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
