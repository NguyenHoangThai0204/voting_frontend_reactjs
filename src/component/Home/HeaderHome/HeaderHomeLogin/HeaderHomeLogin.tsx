
import { Button } from "@mui/material"
import "./HeaderHomeLogin.css"
import { FormLayout } from "../../../LoginAndRegister/FormLayout/FormLayout"
import { useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';

export const HeaderHomeLogin = () => {

  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
    setShowForm(true)
  }

  return (
    <div className="wrapper">
        <div className="but_signup">
          <Button variant="text" onClick={handleShowForm} >Đăng kí</Button>
        </div>
        <div className="but_login">
        <Button variant="contained" size="small" onClick={handleShowForm} >Đăng nhập</Button>
        </div>

        {showForm && (
      <div className="overlay">
        <div className="close">
          <CancelIcon onClick={() => setShowForm(false)} />
        </div>
        <div className="form">
          <FormLayout />
        </div>
      </div>
    )}
    </div>
  )
}
