import { useState } from 'react';
import './LoginForm.css';
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onSignUpClick , onLogin}: { onSignUpClick: () => void, onLogin: () => void  }) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if (!username || !password) {
            alert("Username and Password cannot be empty")
            return;
        }
        if (username === "admin" && password === "password") {
            onLogin(); // Gọi hàm onLogin để thông báo đăng nhập thành công
            navigate('/home'); // Chuyển hướng đến trang chủ
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <form action="login">
            <h2>Login</h2>
            <div className="form_login">
                <TextField
                    id="standard-basic"
                    label="Username"
                    variant="standard"
                    size="small"
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
                    id="standard-basic"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="standard"
                    size="small"
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