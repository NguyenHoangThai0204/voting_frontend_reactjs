
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignUpForm() {
    return (

        <form action="login">
            <h1>Sign Up</h1>
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
                    type='password'
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <VisibilityOffIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <br />
                <TextField
                    id="standard-basic"
                    label="Confirm Password"
                    type='password'
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <VisibilityOffIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div className="button">
                <Button variant="contained" color="primary" href='/login'>Sign Up</Button>
            </div>
        </form> 
    );
}
