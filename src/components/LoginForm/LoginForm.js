import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Divider,
    Typography,
    CircularProgress,
    Link,
    IconButton,
    InputAdornment,
    Snackbar,
    SnackbarContent,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./LoginForm.css";

function LoginFormUI({
    email,
    setEmail,
    password,
    setPassword,
    loading,
    onSubmit,
    onShowForgetPassword,
    onShowCreateAccount,
    passwordVisible,
    togglePasswordVisibility,
    googleLogin,
}) {
    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                autoFocus
                margin="dense"
            />
            <TextField
                label="Password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="dense"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                                {passwordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2" align="right" sx={{ mt: 1 }}>
                <Link color="primary" onClick={onShowForgetPassword}>
                    Forgot password?
                </Link>
            </Typography>
            <div className="divider">
                <Divider sx={{ my: 2 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ px: 1, py: 0.5 }}
                    >
                        Other Login Methods
                    </Typography>
                </Divider>
            </div>
            {googleLogin}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link color="primary" onClick={onShowCreateAccount}>
                    Create your account
                </Link>
            </Typography>
        </form>
    );
}

export default function LoginForm({ open, handleClose, showCreateAccountHandler, showForgetPasswordHandler }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                setSnackbarOpen(true);
                setSnackbarMessage("Login successful!");
                handleClose();
            } else {
                setSnackbarOpen(true);
                setSnackbarMessage(data.message);
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error logging user:", error);
            setSnackbarOpen(true);
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarSeverity("error");
        }
    };

    const googleLogin = useMemo(
        () => {
            const handleGoogleLoginSuccess = (response) => {
                console.log("Google login successful:", response);
                navigate("/dashboard");
                handleClose();
            };

            const handleGoogleLoginFailure = (error) => {
                console.log("Google login failed:", error);
            };

            return (
                <div className="google-login">
                    <GoogleLogin
                        clientId="1018941777246-aslpbg70n0nk7aa25616g5jf71mmcdhj.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        style={{ width: "100%" }}
                    />
                </div>
            );
        },
        [navigate, handleClose]
    );

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <LoginFormUI
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    onSubmit={handleLogin}
                    onShowForgetPassword={showForgetPasswordHandler}
                    onShowCreateAccount={showCreateAccountHandler}
                    passwordVisible={passwordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                    googleLogin={googleLogin}
                />
            </DialogContent>
            <Snackbar autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={snackbarOpen} onClose={handleSnackbarClose}>
                <SnackbarContent
                    message={snackbarMessage}
                    severity={snackbarSeverity} />
            </Snackbar>
        </Dialog>
    );
}