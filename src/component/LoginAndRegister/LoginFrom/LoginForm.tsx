import { useState } from "react";
import "./LoginForm.css";
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextapi/AuthContext";
import { useContext } from "react";
import { loginUser, loginGoogle } from "../../../api/CallApi";
//Google login
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function LoginForm({
  onSignUpClick,
}: {
  onSignUpClick: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username and Password cannot be empty");
      return;
    }

    try {
      const response = await loginUser({ email: username, password: password });
      // Kiểm tra và lấy dữ liệu người dùng từ response.data
      if (response.message === "Login success") {
        if (response.data.status === "active") {
          authContext?.login(response.data);
          navigate("/home");
        } else {
          alert(
            "Your account is not active. Please check your email to active your account."
          );
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while trying to log in.");
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
    <form action="login">
      <h2>Login</h2>
      <div className="form_login">
        <TextField
          id="username"
          label="Username"
          variant="standard"
          size="small"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          size="small"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="forgot">
        <a href="/forget_password">Forgot Password?</a>
      </div>

      <div className="button">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>

      <div className="signup">
        <p>Don't have an account? </p>
        <Button variant="text" onClick={onSignUpClick}>
          Sign up
        </Button>
      </div>
      <div className="forgot">
        {/* <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    href="https://accounts.google.com/signin" // Thay thế bằng liên kết đăng nhập Google của bạn
                    target="_blank" // Mở liên kết trong tab mới
                    rel="noopener noreferrer" // Bảo mật liên kết
                >
                    Đăng nhập với Google
                </Button>
                */}
        <GoogleLogin onSuccess={handleGoogleLogin} />
      </div>
    </form>
  );
}
