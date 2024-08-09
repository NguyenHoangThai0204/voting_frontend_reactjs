import React from 'react';
import { TextField, InputAdornment, Button, IconButton, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailIcon from '@mui/icons-material/Mail';
import TransgenderIcon from '@mui/icons-material/Transgender';

export default function SignUpForm() {
    const [gender, setGender] = React.useState<string>('');

    // Định nghĩa kiểu cho event là SelectChangeEvent
    const handleChange = (event: SelectChangeEvent<string>) => {
        setGender(event.target.value);
    };

    return (
        <form action="login">
            <h1>Sign Up</h1>
            <div className="form_login">
                <TextField
                    id="phone-number"
                    label="Phone number"
                    variant="standard"
                    type='number'
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
                    id="full-name"
                    label="Full Name"
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
                <br />
                <TextField
                    id="password"
                    label="Password"
                    type='password'
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <VisibilityOffIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <br />
                <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type='password'
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <VisibilityOffIcon />
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
                </FormControl>
            </div>

            <div className="button">
                <Button variant="text" href='/loadLo'>Login </Button>
                <Button variant="contained" color="primary" href='/login'>Sign Up</Button>

            </div>
        </form>
    );
}
