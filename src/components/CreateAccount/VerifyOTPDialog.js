import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Link, CircularProgress } from "@mui/material";
import api from "../../services/api";
import SnackbarMessage from "../SnackbarMessage";

export default function VerifyOTPDialog({ open, handleClose, email, setSession }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/user/verify-otp", {
                email,
                otp,
            });
            const data = await response.data;

            setLoading(false);
            if (data.success) {
                setSession(data.session_id);
                handleClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error verifying OTP:", error);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            const response = await api.post("/user/resend-otp", { email });
            const data = await response.data;

            if (data.success) {
                setSnackbarMessage("OTP has been resent to your email.");
                setSnackbarOpen(true);
                setResendDisabled(true);
                setTimer(30);
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message);
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
        } finally {
            setResendLoading(false);
        }
    };

    useEffect(() => {
        let intervalId;
        if (timer > 0 && resendDisabled) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && resendDisabled) {
            setResendDisabled(false);
        }
        return () => clearInterval(intervalId);
    }, [timer, resendDisabled]);

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Verify OTP</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleVerifyOTP}>
                        <TextField
                            label="OTP"
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            fullWidth
                            required
                            autoFocus
                            margin="dense"
                            error={Boolean(error)}
                            helperText={error}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        {resendDisabled ? (
                            `Resend OTP in ${timer} seconds`
                        ) : (
                            resendLoading ? (
                                <CircularProgress size={24} />
                            ) : (
                                <Link color="primary" onClick={handleResendOTP}>
                                    Resend OTP
                                </Link>
                            )
                        )}
                    </Typography>
                </DialogContent>
            </Dialog>
            <SnackbarMessage
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
}