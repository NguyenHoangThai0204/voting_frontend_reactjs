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
import Swal from "sweetalert2";
//Google login
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nhập tài khoản và mật khẩu!", showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        showClass: {
          popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
        },
        hideClass: {
          popup: "", // Tắt hiệu ứng biến mất
        },
      });

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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tài khoản không còn hoạt động!", showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
            },
            hideClass: {
              popup: "", // Tắt hiệu ứng biến mất
            },
          });

        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản hoặc mật khẩu không đúng!", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lỗi trong quá trình đăng nhập.", showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        showClass: {
          popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
        },
        hideClass: {
          popup: "", // Tắt hiệu ứng biến mất
        },
      });

    }
  };
  // Google login
  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      // Lấy idToken từ Google response
      const token = response.credential;
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đăng nhập bị lỗi.", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });

        return;
      }
      console.log("Credential token:", token);
      const user = await loginGoogle(token);
      if (user) {
        console.log("authContext" + user.data);
        authContext?.login(user.data); // Truyền toàn bộ dữ liệu người dùng vào context
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đăng nhập bị lỗi.", showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
          },
          hideClass: {
            popup: "", // Tắt hiệu ứng biến mất
          },
        });

      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đăng nhập bị lỗi.", showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        showClass: {
          popup: "swal2-no-animation", // Tắt hiệu ứng xuất hiện
        },
        hideClass: {
          popup: "", // Tắt hiệu ứng biến mất
        },
      });
    }
  };
  return (
    <form action="login">
      <h2>Đăng nhập</h2>
      <div className="form_login">
        <TextField
          id="username"
          label="Nhập gmail"
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
          label="Nhập mật khẩu"
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
        <a href="/forget_password">Quên mật khẩu</a>
      </div>

      <div className="button">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </div>

      <div className="signup">
        <p>Đăng kí ngây nhé? </p>
        <Button variant="text" onClick={onSignUpClick}>
          Đăng kí
        </Button>
      </div>
      <div className="forgot_button" style={{display:"flex", justifyContent:"center", marginBottom:"10px"}}>
      <GoogleLogin
  onSuccess={handleGoogleLogin}
  containerProps={{
    style: {
      marginTop: "1.5rem",
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
