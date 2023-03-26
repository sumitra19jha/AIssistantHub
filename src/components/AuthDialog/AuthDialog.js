import React, { useState, useEffect } from "react";
import LoginForm from "./../LoginForm/LoginForm";
import CreateAccount from "./../CreateAccount/CreateAccount";

export default function AuthDialog({ open, handleClose }) {
    const [formType, setFormType] = useState("login");

    useEffect(() => {
        if (!open) {
            setFormType("login");
        }
    }, [open]);

    const handleShowCreateAccount = () => {
        setFormType("createAccount");
    };

    const handleShowLoginForm = () => {
        setFormType("login");
    };

    const renderForm = () => {
        if (formType === "login") {
            return <LoginForm open={open} handleClose={handleClose} onShowCreateAccount={handleShowCreateAccount} />;
        } else if (formType === "createAccount") {
            return <CreateAccount open={open} handleClose={handleClose} onShowLoginForm={handleShowLoginForm} />;
        }
    };

    return <>{renderForm()}</>;
}
