import { useState } from 'react';
import './LoginForm.css';
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
            <form action="login">
                <h1>Login</h1>
                <div className="form_login">
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
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
                    <Button variant="contained" color="primary" href='/login'>Login</Button>
                </div>

                <div className="signup">
                    <p>Don't have an account? </p>
                    <Button variant="text" href='/loadSignup'>Sign up</Button>
                </div>
            </form>
    );
}
