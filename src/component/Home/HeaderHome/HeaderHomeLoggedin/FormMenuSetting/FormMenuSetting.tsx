import { Link } from "react-router-dom";
import "./FormMenuSetting.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../contextapi/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import Swal from "sweetalert2";
import {logout} from "../../../../../api/CallApi";

export function FormMenuSetting() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Kiểm tra ví trong localStorage khi trang được load lại
    const savedWalletAddress = localStorage.getItem("walletAddress");
  
    // Nếu có ví lưu trong localStorage và không rỗng, cập nhật vào AuthContext
    if (savedWalletAddress && savedWalletAddress !== "") {
      authContext?.setWalletAddress(savedWalletAddress);
    } else {
      // Nếu không có ví trong localStorage, xóa khỏi AuthContext
      authContext?.setWalletAddress("");
    }
  
    if (window.ethereum) {
      // Lắng nghe sự kiện thay đổi tài khoản
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          const newWalletAddress = accounts[0];
          authContext?.setWalletAddress(newWalletAddress);
          localStorage.setItem("walletAddress", newWalletAddress); // Lưu địa chỉ ví mới vào localStorage
        } else {
          authContext?.setWalletAddress(""); // Nếu không có tài khoản, xóa ví khỏi AuthContext
          localStorage.removeItem("walletAddress"); // Xóa ví khỏi localStorage
        }
      });
    }
  
    // Dọn dẹp sự kiện khi component unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, [authContext]);
  

  const handleListMenuSetting = async (index: number) => {
    if (index === 2) { // Log out
      await logout(authContext?.user?._id || ""); // Gọi hàm logout từ CallApi

      authContext?.logout(); // Gọi hàm logout từ AuthContext
      localStorage.removeItem("walletAddress"); // Xóa ví khỏi localStorage
      authContext?.setWalletAddress(""); // Xóa ví khỏi AuthContext

      
    }

    if (index === 1) { // Connect wallet
      if (window.ethereum) {
        try {
          // Yêu cầu quyền truy cập tài khoản và lấy danh sách tài khoản
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (accounts.length > 0) {
            const walletAddress = accounts[0];
            authContext?.setWalletAddress(walletAddress); // Lưu địa chỉ ví vào AuthContext
            localStorage.setItem("walletAddress", walletAddress); // Lưu địa chỉ ví vào localStorage

            // Thực hiện yêu cầu permissions để kết nối ví
            await window.ethereum.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            });

            Swal.fire("Success", "Connected to MetaMask.", "success");
          } else {
            Swal.fire({
              title: "Oops...",
              text: "No account selected. Please choose an account to connect.",
              icon: "warning",
            });
          }
        } catch (error) {
          console.error("User denied account access", error);
          Swal.fire({
            title: "Oops...",
            text: "You denied account access to MetaMask!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "MetaMask not detected!",
          footer: '<a href="https://metamask.io/download.html">Download MetaMask</a>',
        });
      }
    }
  };

  const listItemMenuSetting = [
    {
      icon: <AccountCircleIcon sx={{ fontSize: 18 }} />,
      name: "Personal page",
      link: "/personal-page",
    },
    {
      icon: <CurrencyBitcoinIcon sx={{ fontSize: 18 }} />,
      name: authContext?.walletAddress
        ? `Connected: ${authContext.walletAddress}`
        : "Connect wallet",
      link: "#",
    },
    {
      icon: <LogoutIcon sx={{ fontSize: 18 }} />,
      name: "Log out",
      link: "/",
    },
  ];

  return (
    <div className="menu_layout_setting">
      <ul className="menu_content">
        {listItemMenuSetting.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            onClick={() => handleListMenuSetting(index)}
          >
            <li className="menu_item">
              <div className="icon">{item.icon}</div>
              <div className="name_setting">{item.name}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
