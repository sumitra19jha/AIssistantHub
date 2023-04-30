import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, CircularProgress } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

import api from "../../services/api";
import VerifyOTPDialog from "../CreateAccount/VerifyOTPDialog";

export default function ForgetPassword({ open, handleClose, setSession }) {
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
            const response = await api.post('/user/forget-password', {
                email
            });

            const data = await response.data;
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
                <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                    <DialogTitle>Forget Password</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleForgetPassword}>
                            <Box mb={2}>
                                <Typography variant="body2">
                                    Enter your email address and we will send you an OTP to reset your password.
                                </Typography>
                            </Box>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                                autoFocus
                                error={Boolean(error)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Send OTP"}
                            </Button>
                            {error && (
                                <Box mt={2}>
                                    <Alert severity="error">{error}</Alert>
                                </Box>
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
                setSession={setSession}
            />
        </>
    );
}