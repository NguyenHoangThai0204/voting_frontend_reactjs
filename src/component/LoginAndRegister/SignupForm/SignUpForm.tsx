import React from 'react';
import { TextField, InputAdornment, Button, IconButton} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "../LoginFrom/LoginForm.css";
import GoogleIcon from '@mui/icons-material/Google';

export default function SignUpForm({onLoginClick}: {onLoginClick: () => void}) {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignUp = () => {
        window.location.href = '/login';
    };
    return (
        <form action="login">
            <h2>Sign Up</h2>
            <div className="form_login">
                <TextField
                    id="phone-number"
                    label="Phone number"
                    variant="standard"
                    type='number'
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PhoneAndroidIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <br />
                <TextField
                    id="password"
                    size="small"
                    label="Password"
                    type={showPassword ? 'text' :'password' }
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <br />
               
            </div>

            <div className="button">
            <Button variant="text" onClick={onLoginClick}>Login</Button>
            <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                        
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
