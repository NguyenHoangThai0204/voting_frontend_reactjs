import { Link } from "react-router-dom";
import "./FormMenuSetting.css"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../contextapi/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';


export function FormMenuSetting() {

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (window.ethereum) {
      // Lắng nghe sự kiện thay đổi tài khoản
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          const newWalletAddress = accounts[0];
          authContext?.setWalletAddress(newWalletAddress); // Cập nhật địa chỉ ví mới
        } else {
          authContext?.setWalletAddress("không có tài khoản"); // Nếu không có tài khoản, set null
        }
      });
    }

    // Dọn dẹp sự kiện khi component unmount (không cần thiết nữa)
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, [authContext]); // Chỉ chạy một lần khi component được mount

  const handleListMenuSetting = async (index: number) => {
    if (index === 3) {
      authContext?.logout();
    }
    if (index === 1) {
      // Kết nối MetaMask
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0]; // Địa chỉ ví được trả về
        authContext?.setWalletAddress(walletAddress); // Lưu địa chỉ ví vào AuthContext
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
    }
  }

  const listItemMenuSetting = [
    {
      icon: <AccountCircleIcon sx={{ fontSize: 18 }} />,
      name: "Personal page",
      link: "/personal-page"
    }, {
      icon: <CurrencyBitcoinIcon sx={{ fontSize: 18 }} />,
      name: authContext?.walletAddress ? `Connected: ${authContext.walletAddress}` : "Connect wallet", // Sử dụng walletAddress ở đây
      link: "#"
    },

    {
      icon: <SettingsIcon sx={{ fontSize: 18 }} />,
      name: "Setting",
      link: "/setting"
    },
    {
      icon: <LogoutIcon sx={{ fontSize: 18 }} />,
      name: "Log out",
      link: "/"
    }
  ];


  return (
    <div className="menu_layout_setting">
      <ul className="menu_content">
        {
          listItemMenuSetting.map((item, index) => (
            <Link to={item.link} key={index} onClick={() => handleListMenuSetting(index)} >
              <li className="menu_item">
                <div className="icon">
                  {item.icon}
                </div>
<div className="name_setting">
                  {item.name}
                </div>
              </li>
            </Link>
          ))

        }
      </ul>
    </div>
  );
}