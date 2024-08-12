
import { Button } from "@mui/material"
import "./HeaderHomeLogin.css"

export const HeaderHomeLogin = () => {
  return (
    <div className="wrapper">
        <div className="but_signup">
          <Button variant="text">Đăng kí</Button>
        </div>
        <div className="but_login">
        <Button variant="contained" size="small">Đăng nhập</Button>
        </div>
    </div>
  )
}
