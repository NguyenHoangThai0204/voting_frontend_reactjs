import { useState } from 'react';
import './LoginForm.css';
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contextapi/AuthContext';
import { useContext } from 'react';
import { loginUser } from '../../../api/userApi';

export default function LoginForm({ onSignUpClick }: { onSignUpClick: () => void}) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            const response = await loginUser({ gmail: username, password: password });
      
            console.log('Login response:', response); // Xem phản hồi từ API
      
            // Kiểm tra và lấy dữ liệu người dùng từ response.data
            if (response.message === "Login success") {
              authContext?.login(response.data); // Truyền toàn bộ dữ liệu vào context
              console.log('Navigating to /home');
              navigate('/home');
            } else {
              alert(response.message);
            }
          } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred while trying to log in.');
          }
        };
    
    
    // const handleLogin = () => {
    //     if (!username || !password) {
    //         alert("Username and Password cannot be empty")
    //         return;
    //     }
    //     if (username === "admin" && password === "123") {
    //         authContext?.login();
    //         navigate('/home'); 
    //     } else {

    //         alert("Invalid credentials");
    //     }
    // };

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
                        )
                    }}
                />
                <br />
                <TextField
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="standard"
                    size="small"
                    autoComplete='current-password'
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div className="forgot">
                <a href='/forget_password'>Forgot Password?</a>
            </div>

            <div className="button">
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            </div>

            <div className="signup">
                <p>Don't have an account? </p>
                <Button variant="text" onClick={onSignUpClick} >Sign up</Button>
            </div>
            <div className="forgot">
                <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    href="https://accounts.google.com/signin" // Thay thế bằng liên kết đăng nhập Google của bạn
                    target="_blank" // Mở liên kết trong tab mới
                    rel="noopener noreferrer" // Bảo mật liên kết
                >
                    Đăng nhập với Google
                </Button>
            </div>
        </form>
    );
}