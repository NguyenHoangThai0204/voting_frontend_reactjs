import React from 'react';
import { TextField, InputAdornment, Button, IconButton} from '@mui/material';
// import { TextField, InputAdornment, Button, IconButton, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import MailIcon from '@mui/icons-material/Mail';
// import TransgenderIcon from '@mui/icons-material/Transgender';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "../LoginFrom/LoginForm.css";
import GoogleIcon from '@mui/icons-material/Google';

export default function SignUpForm({onLoginClick}: {onLoginClick: () => void}) {
    // const [gender, setGender] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Định nghĩa kiểu cho event là SelectChangeEvent
    // const handleChange = (event: SelectChangeEvent<string>) => {
    //     setGender(event.target.value);
    // };

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
                    id="username"
                    label="Username ( Last name )"
                    variant="standard"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <PersonIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <br />
                {/* <TextField
                    id="email"
                    label="Email"
                    type='email'
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <MailIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <br /> */}
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
                {/* <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
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
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        value={gender}
                        onChange={handleChange}  // Đảm bảo sử dụng đúng hàm handleChange
                        renderValue={(selected) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TransgenderIcon style={{ marginRight: '8px' }} />
                                {selected}
                            </div>
                        )}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>*/}
            </div>

            <div className="button">
            <Button variant="text" onClick={onLoginClick}>Login</Button>
            <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                        
            </div>
            <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    href="https://accounts.google.com/signin" // Thay thế bằng liên kết đăng nhập Google của bạn
                    target="_blank" // Mở liên kết trong tab mới
                    rel="noopener noreferrer" // Bảo mật liên kết
                >
                    Đăng kí với Google
                </Button>
        </form>
    );
}
