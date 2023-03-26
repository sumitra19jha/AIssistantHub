import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Link,
} from "@mui/material";

export default function CreateAccount({ open, handleClose, onShowLoginForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.success) {
                alert("Registration successful. Please check your email for verification.");
                handleClose();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Account</DialogTitle>
            <DialogContent>
                <form onSubmit={handleRegister}>
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
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        required
                        margin="dense"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Create Account
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link href="#" color="primary" onClick={onShowLoginForm}>
                        Log in
                    </Link>
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
