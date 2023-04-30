import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle, TextField, Divider, Typography, CircularProgress, Link, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import api from "../../services/api";
import SnackbarMessage from "../SnackbarMessage";
import "./LoginForm.css";

function LoginFormUI({ email, setEmail, password, setPassword, loading, onSubmit, onShowForgetPassword, onShowCreateAccount, passwordVisible, togglePasswordVisibility, googleLogin }) {
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
                <Link className="cursor-pointer" color="primary" onClick={onShowForgetPassword}>
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
                <Link className="cursor-pointer" color="primary" onClick={onShowCreateAccount}>
                    Create your account
                </Link>
            </Typography>
        </form>
    );
}

export default function LoginForm({
    open,
    handleClose,
    showCreateAccountHandler,
    showForgetPasswordHandler,
    setSession,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
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

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/user/login', {
                email,
                password,
            });

            const data = response.data;

            if (data.success) {
                setSession(data.session_id);
                setLoading(false);
                navigate("/dashboard");
                handleClose();
            } else {
                setLoading(false);
                setSnackbarOpen(true);
                setSnackbarMessage(data.message);
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setLoading(false);
            setSnackbarOpen(true);
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarSeverity("error");
        }
    };

    const handleGoogleLogin = async (tokenId) => {
        setGoogleLoading(true);
        try {
            const response = await api.post('/user/oauth/google', {
                token_id: tokenId,
            });

            const data = response.data;
            if (data.success) {
                setSession(data.session_id);
                navigate("/dashboard");
                handleClose();
            } else {
                setSnackbarOpen(true);
                setSnackbarMessage(data.message);
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setSnackbarOpen(true);
            setSnackbarMessage("An Error occurred, Please try again!");
            setSnackbarSeverity("error");
        }
        finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleCallbackResponse = (response) => {
        const idToken = response.credential;
        handleGoogleLogin(idToken);
    };

    useEffect(() => {
        const loadGoogleApi = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: "1018941777246-aslpbg70n0nk7aa25616g5jf71mmcdhj.apps.googleusercontent.com",
                callback: handleGoogleCallbackResponse,
            });

            google.accounts.id.renderButton(document.getElementById("google-login-button"), {
                theme: "outline",
                size: "large",
            });
        };

        if (open) {
            if (window.gapi) {
                loadGoogleApi();
            } else {
                window.gapiLoadCallback = loadGoogleApi;
                const script = document.createElement("script");
                script.src = "https://apis.google.com/js/api.js?onload=gapiLoadCallback";
                document.head.appendChild(script);
            }
        }
    }, [open]);


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
                    googleLogin={
                        googleLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <div className="google-login-wrapper">
                                <div id="google-login-button" />
                            </div>
                        )
                    }
                />
            </DialogContent>
            <SnackbarMessage
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Dialog>
    );
}
