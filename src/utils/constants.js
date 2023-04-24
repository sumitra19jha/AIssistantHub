export const API_BASE_URL = "http://3.13.43.214:5000/";
export const SOCKET_API_BASE_URL = "http://3.13.43.214:3001/";
export const AUTH_TOKEN = localStorage.getItem('session_id');

export const CONTENT_TYPES = {
    "Social Media Post": {
        platformOptions: [
            "LinkedIn",
            "Twitter",
            "Facebook",
            "Instagram"
        ]
    },
    "Blog Post": {
        purposeOptions: [
            "Educate",
            "Entertain",
            "Inform"
        ]
    },
    "Article": {
        purposeOptions: [
            "Educate",
            "Entertain",
            "Inform"
        ]
    },
    "Email Marketing": {
        purposeOptions: [
            "Updates",
            "Promotions",
            "Industry News"
        ]
    },
    "Newsletter": {
        purposeOptions: [
            "Updates",
            "Promotions",
            "Industry News"
        ]
    },
    "Product Description": {
        purposeOptions: [
            "Features",
            "Benefits",
            "Encouraging potential customers to make a purchase"
        ]
    },
    "Case Study": {
        purposeOptions: [
            "Topic",
            "Problem",
            "Solution"
        ]
    },
    "Whitepaper": {
        purposeOptions: [
            "Topic",
            "Problem",
            "Solution"
        ]
    },
    "Video Script": {
        purposeOptions: [
            "Promotional",
            "Educational",
            "Entertaining"
        ]
    }
};


export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
};