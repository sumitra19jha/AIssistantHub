import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        // Implement the password reset link sending logic here
        console.log("Sending password reset link to:", email);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center">
                    Forgot Password
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleForgotPassword}
                sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Send Password Reset Link
                </Button>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
