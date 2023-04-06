export const API_BASE_URL = 'http://localhost:5000/';
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