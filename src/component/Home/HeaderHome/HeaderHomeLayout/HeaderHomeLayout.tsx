import { useState } from "react";
import "./HeaderHomeLayout.css"
import { InputAdornment, TextField } from '@mui/material';
import { HeaderHomeLogin } from "../HeaderHomeLogin/HeaderHomeLogin";
import SearchIcon from '@mui/icons-material/Search';
import { HeaderHomeLoggedin } from "../HeaderHomeLoggedin/HeaderHomeLoggedin";

export const HeaderHomeLayout = () => {

  const [isLogged, setIsLogged] = useState(false);

  const handleIsLogged = () => {
    setIsLogged(true);
  }

  return (
    <div className="header_home">
      <div className="header_home_content">
        <div className="header_home_title">
          <h1 >Voting App</h1>
          <p >Chọn theo cách của bạn</p>
        </div>
        <div className="inputSearch">
          <TextField id="outlined-basic" className="search" label="Search" variant="outlined" size="small" 
          InputProps={{ 
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          />
        </div>
        <div className="formLogin">
          {
            isLogged ? <HeaderHomeLoggedin /> : <HeaderHomeLogin onLogin={handleIsLogged} />
          }      
        </div>
      </div>
    </div>
  )
}
