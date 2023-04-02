import React, { useState, useEffect } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Link,
} from "@mui/material";
import VerifyOTPDialog from "./VerifyOTPDialog";

/**
 * Component for creating a new user account
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog should be open or not
 * @param {function} props.handleClose - Function to handle closing the dialog
 * @param {function} props.onShowLoginForm - Function to show the login form
 */
export default function CreateAccount({ open, handleClose, showLoginFormHandler }) {


    // State variables for form input values and loading state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // State variable for showing/hiding the create account dialog
    const [showCreateAccount, setShowCreateAccount] = useState(true);

    // State variable for showing/hiding the OTP verification dialog
    const [verifyOTPDialogOpen, setVerifyOTPDialogOpen] = useState(false);

    // Effect to show the create account dialog when `open` prop changes
    useEffect(() => {
        if (open) {
            setShowCreateAccount(true);
        }
    }, [open]);

    /**
     * Function to handle user registration form submission
     * @param {Object} e - Event object
     */
    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Send registration request to server
            const response = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success) {
                // Show OTP verification dialog if registration is successful
                setVerifyOTPDialogOpen(true);
                setShowCreateAccount(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    /**
     * Function to handle closing the OTP verification dialog
     */
    const handleVerifyOTPClose = () => {
        setVerifyOTPDialogOpen(false);
    };

    return (
        <>
            {showCreateAccount && (
                // Create account dialog
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create Account</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleRegister}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                required
                                autoFocus
                                margin="dense"
                            />
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            Already have an account?{" "}
                            <Link color="primary" onClick={showLoginFormHandler}>
                                Log in
                            </Link>
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}
            {/* OTP verification dialog */}
            <VerifyOTPDialog
                open={verifyOTPDialogOpen}
                handleClose={handleVerifyOTPClose}
                email={email}
            />
        </>
    );
}