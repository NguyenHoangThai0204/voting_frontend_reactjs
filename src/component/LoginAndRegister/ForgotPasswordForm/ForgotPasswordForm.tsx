import React, { useState } from "react";
import "./ForgotPasswordForm.css";
import { forgotPassword, resetPassword, verifyOtp } from "../../../api/CallApi";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void; // Callback để quay lại form đăng nhập
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [step, setStep] = useState<"email" | "otp" | "newPassword">("email"); // Theo dõi bước hiện tại
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false); // Trạng thái hiện/ẩn mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false); // Trạng thái hiện/ẩn mật khẩu xác nhận
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validatePassword = (password: string): string => {
    if (!password) return "Mật khẩu không được để trống.";
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password))
      return "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    return "";
  };
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (!confirmPassword) return "Mật khẩu xác nhận không được để trống.";
    if (password !== confirmPassword) return "Mật khẩu xác nhận không khớp.";
    return "";
  };
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email không được để trống.";
    if (!emailRegex.test(email)) return "Email không hợp lệ.";
    return "";
  };
  const handleSendOTP = async () => {
    
    const emailError = validateEmail(email);
    if (emailError) {
      alert(emailError);
      return;
    }
    setIsSubmitting(true);
    try {
      // Call API gửi OTP qua email
      const response = await forgotPassword(email);
      console.log(response);

      setTimeout(() => {
        setStep("otp");
        setIsSubmitting(false);
        alert("Mã OTP đã được gửi đến email của bạn.");
      }, 2000); // Giả lập API call
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.");
      console.log("Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại." + error);
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsSubmitting(true);
    try {
      // Call API xác thực OTP

      const isValid = await verifyOtp(email, otp);
      setTimeout(() => {
        setIsSubmitting(false);
        if (isValid) {
          setStep("newPassword");
        } else {
          alert("Mã OTP không đúng. Vui lòng thử lại.");
        }
      }, 1000); // Giả lập API call
    } catch (error) {
      alert("Có lỗi xảy ra khi xác thực OTP. Vui lòng thử lại.");
      console.log("Có lỗi xảy ra khi xác thực OTP. Vui lòng thử lại." + error);
      setIsSubmitting(false);
    }
  };

  const handleSavePassword = async () => {
    const passwordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(
      newPassword,
      confirmPassword
    );
  
    // Cập nhật lỗi
    setErrors({
      newPassword: passwordError,
      confirmPassword: confirmPasswordError,
    });
  
    // Nếu có lỗi, dừng logic
    if (passwordError || confirmPasswordError) {
      setIsSubmitting(false); // Đảm bảo trạng thái không bị treo
      return;
    }
  
    setIsSubmitting(true); // Bắt đầu gửi API
    try {
      const response = await resetPassword({ email, password: newPassword });
  
      if (response) {
        alert("Mật khẩu của bạn đã được đặt lại thành công.");
        setIsSubmitting(false);
        onBackToLogin(); // Quay lại đăng nhập
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
      console.error("Error resetting password:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-form">
     
      {step === "email" && (
        <form
        
          onSubmit={(e) => {
            e.preventDefault();
            handleSendOTP();
          }}
        >
         <h2>Quên mật khẩu</h2>
          <div className="form-group">
            <label htmlFor="email">Nhập email của bạn:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Gửi OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOTP();
          }}
        >
          <div className="form-group">
            <label htmlFor="otp">Nhập mã OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="otp-btn-link">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang xác thực..." : "Xác thực OTP"}
            </button>
            <p
              onClick={!isSubmitting ? handleSendOTP : undefined}
              className="resend-otp-link"
              style={{
                cursor: isSubmitting ? "not-allowed" : "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {isSubmitting ? "Đang gửi lại..." : "Gửi lại OTP"}
            </p>
          </div>
        </form>
      )}

      {step === "newPassword" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSavePassword();
          }}
        >
          <div className="form-group">
            <TextField
              id="password"
              label="Mật khẩu mới"
              fullWidth
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-group">
            <TextField
              id="confirm-password"
              label="Nhập lại mật khẩu mới"
              fullWidth
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : "Lưu mật khẩu mới"}
          </button>
        </form>
      )}

      <button onClick={onBackToLogin} className="back-to-login">
        Quay lại đăng nhập
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
