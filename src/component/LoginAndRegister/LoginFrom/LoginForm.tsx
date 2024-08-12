import { useState } from 'react';
import './LoginForm.css';
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm({ onSignUpClick }: { onSignUpClick: () => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if(  !username || !password ){
            alert("Username and Password cannot be empty")
            return;
        }

        window.location.href = '/login';
    };

    return (
        <form action="login">
            <h1>Login</h1>
            <div className="form_login">
                <TextField
                    id="standard-basic"
                    label="Username"
                    variant="standard"
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
                    onChange={(e)=> setPassword(e.target.value)}
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
                <Button variant="text"  onClick={onSignUpClick} >Sign up</Button>
            </div>
        </form>
    );
}