import React, { useState, useEffect } from "react";

import LoginForm from "./../LoginForm/LoginForm";
import CreateAccount from "./../CreateAccount/CreateAccount";
import ForgetPassword from "./../LoginForm/ForgetPassword";

export default function AuthDialog({ open, handleClose, setSession }) {
    const [currentForm, setCurrentForm] = useState("login");

    useEffect(() => {
        if (!open) {
            setCurrentForm("login");
        }
    }, [open]);

    const showCreateAccountHandler = () => {
        setCurrentForm("createAccount");
    };

    const showForgetPasswordHandler = () => {
        setCurrentForm("forgetPassword");
    };

    const showLoginFormHandler = () => {
        setCurrentForm("login");
    };

    const FormComponent = {
        login: LoginForm,
        createAccount: CreateAccount,
        forgetPassword: ForgetPassword,
    }[currentForm];

    return FormComponent ? (
        <FormComponent
            key={currentForm} // Add this line
            {...{
                open,
                handleClose,
                showCreateAccountHandler,
                showForgetPasswordHandler,
                showLoginFormHandler,
                setSession,
            }}
        />
    ) : null;
}