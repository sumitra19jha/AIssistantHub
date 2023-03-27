import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    InputLabel,
    FormControl,
} from "@mui/material";
import VerifyOTPDialog from "../CreateAccount/VerifyOTPDialog";

export default function ForgetPassword({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [verifyOTPDialogOpen, setVerifyOTPDialogOpen] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(true);

    // Handle forget password form submission
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:5000/user/forget-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            setLoading(false);

            if (data.success) {
                setVerifyOTPDialogOpen(true);
                setShowForgetPassword(false);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error verifying OTP:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    // Handle verify OTP dialog close
    const handleVerifyOTPClose = () => {
        setVerifyOTPDialogOpen(false);
    };

    return (
        <>
            {showForgetPassword ? (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Forget Password</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleForgetPassword}>
                            <FormControl fullWidth margin="dense" error={Boolean(error)}>
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    autoFocus
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Send OTP"}
                            </Button>
                            {error && (
                                <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
                            )}
                        </form>
                    </DialogContent>
                </Dialog>
            ) : null}
            <VerifyOTPDialog
                open={verifyOTPDialogOpen}
                handleClose={handleVerifyOTPClose}
                email={email}
                setError={setError}
            />
        </>
    );
}