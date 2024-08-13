import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./HeaderHomeLoggedin.css";
export const HeaderHomeLoggedin = () => {
  const user = "User";
  return (
    <div className="wrapper">
      <div className="header__home_icon">
        <AccountCircleIcon sx={{ fontSize: 40 }} />
      </div>
      <div className="header__home_name">
        {user}
      </div>
    </div>
  )
}
