import { useState } from 'react';

export default function useSession() {
    const getSession = () => {
        const sessionId = localStorage.getItem('session_id');
        return sessionId
    };

    const [session, setSession] = useState(getSession());

    const saveSession = userSession => {
        localStorage.setItem('session_id', userSession);
        setSession(userSession);
    };

    return {
        setSession: saveSession,
        session
    }
}