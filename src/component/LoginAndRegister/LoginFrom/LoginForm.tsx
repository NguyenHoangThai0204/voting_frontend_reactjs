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
import { useLocation } from "react-router-dom";
//Google login
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function LoginForm({
  onSignUpClick,
  onForgotPasswordClick,
}: {
  onSignUpClick: () => void;
  onForgotPasswordClick: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin từ location để trả về trang trước đó

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nhập tài khoản và mật khẩu!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        showClass: {
          popup: "swal2-no-animation",
        },
        hideClass: {
          popup: "",
        },
      });
      return;
    }
  
    try {
      const response = await loginUser({ email: username, password: password });
  
      // Xử lý phản hồi từ backend
      if (response.status === "Ok" && response.message === "Login success") {
        if (response.data.status === "active") {
          authContext?.login(response.data);
          const redirectTo = location.state?.from ; // Kiểm tra URL gốc từ state hoặc điều hướng mặc định
          navigate(redirectTo, { replace: true });
        }  else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tài khoản không còn hoạt động!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation",
            },
            hideClass: {
              popup: "",
            },
          });
        }
      } else if (response.message === "Email is not defined") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email không tồn tại!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation",
          },
          hideClass: {
            popup: "",
          },
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      // Kiểm tra thông tin lỗi từ response của backend
      if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản không tồn tại!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation",
          },
          hideClass: {
            popup: "",
          },
        });
      } else
      if (error.response?.status === 401) {
        const errorMessage = error.response.data?.message || "Unauthorized";
        if (errorMessage === "Password is incorrect") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu không đúng!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation",
            },
            hideClass: {
              popup: "",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showClass: {
              popup: "swal2-no-animation",
            },
            hideClass: {
              popup: "",
            },
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đăng nhập thất bại. Vui lòng thử lại!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: "swal2-no-animation",
          },
          hideClass: {
            popup: "",
          },
        });
      }
  
      console.error("Login error:", error);
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
          text: "Đăng nhập bị lỗi.",
          showConfirmButton: false,
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
        // Kiểm tra URL gốc từ state hoặc điều hướng mặc định
        const redirectTo = location.state?.from ;
        navigate(redirectTo, { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đăng nhập bị lỗi.",
          showConfirmButton: false,
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
        text: "Đăng nhập bị lỗi.",
        showConfirmButton: false,
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
            onForgotPasswordClick();
          }}
          style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
        >
          Quên mật khẩu?
        </a>
      </div>

      <div className="button">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </div>

      <div className="signup">
        <p>Đăng kí ngay nhé? </p>
        <Button variant="text" onClick={onSignUpClick}>
          Đăng kí
        </Button>
      </div>
      <div
        className="forgot_button"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
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
