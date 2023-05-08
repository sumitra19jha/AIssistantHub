import React from "react";

const MessageForm = ({ userInput, setUserInput, handleSubmit }) => {
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <form className="ai-bot-for-seo__input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="ai-bot-for-seo__user-input"
                value={userInput}
                onChange={handleUserInputChange}
                placeholder="Type your message here..."
            />
            <button type="submit" className="ai-bot-for-seo__submit-button">
                Send
            </button>
        </form>
    );
};

export default MessageForm;
