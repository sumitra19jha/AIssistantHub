import React, { useState } from "react";
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
    Link,
} from "@mui/material";

import "./LoginForm.css";
import ForgotPassword from "./ForgetPassword";

export default function LoginForm({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate and authenticate the user here
        // If successful, update your app's state and redirect to a protected page

        if (email === "user@example.com" && password === "password") {
            console.log("User logged in");
            navigate("/dashboard");
            handleClose();
        } else {
            console.log("Invalid credentials");
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log("Google login successful:", response);
        navigate("/dashboard");
        handleClose();
    };

    const handleGoogleLoginFailure = (error) => {
        console.log("Google login failed:", error);
    };

    const handleForgotPasswordClick = () => {
        setForgotPassword(true);
    };

    if (forgotPassword) {
        return <ForgotPassword />;
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleLogin}>
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
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        margin="dense"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Login
                    </Button>
                    <Typography variant="body2" align="right" sx={{ mt: 1 }}>
                        <Link href="/" color="primary" onClick={handleForgotPasswordClick}>
                            Forgot password?
                        </Link>
                    </Typography>
                </form>
                <div className="divider">
                    <Divider sx={{ my: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                            Other Login Methods
                        </Typography>
                    </Divider>
                </div>
                <div className="google-login">
                    <GoogleLogin
                        clientId="YOUR_GOOGLE_CLIENT_ID"
                        buttonText="Login with Google"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        style={{ width: "100%" }}
                    />
                </div>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{" "}
                    <Link color="primary" onClick={() => console.log("Create account clicked")}>
                        Create your account
                    </Link>
                </Typography>
            </DialogContent>
        </Dialog>
    );
}