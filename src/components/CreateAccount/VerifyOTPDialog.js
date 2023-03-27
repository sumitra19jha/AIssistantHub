import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Link,
    CircularProgress,
    Snackbar,
} from "@mui/material";

/**
 * VerifyOTPDialog is a dialog box that prompts the user to enter an OTP to verify their email address
 * @param {Boolean} open - determines whether the dialog box is open or closed
 * @param {Function} handleClose - function to close the dialog box
 * @param {String} email - email address to which the OTP was sent
 */
export default function VerifyOTPDialog({ open, handleClose, email }) {
    // State variables
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * handleVerifyOTP is called when the user submits the OTP verification form
     * @param {Object} e - form submit event object
     */
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/user/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            setLoading(false);

            if (data.success) {
                setSnackbarMessage("OTP verification successful!");
                setSnackbarOpen(true);
                handleClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error verifying OTP:", error);
        }
    };

    /**
     * handleResendOTP is called when the user clicks the "Resend OTP" link
     */
    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/user/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
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

    /**
     * useEffect hook to update the timer for resending OTP every second
     */
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

    /**
     * Snackbar to show success/error messages
     */

    const snackbar = (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
    );

    /**
     * JSX for the VerifyOTPDialog component
     */
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
            {snackbar}
        </>
    );
}