import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const user = useSelector(state => state.authentication.user);

    return (
        <div>
            <h1>Hi {user.user.username}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}