import React from "react";

const MessageForm = ({ userInput, setUserInput, handleSubmit }) => {
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="user-input"
                value={userInput}
                onChange={handleUserInputChange}
                placeholder="Type your message here..."
            />
            <button type="submit" className="submit-button">
                Send
            </button>
        </form>
    );
};

export default MessageForm;
