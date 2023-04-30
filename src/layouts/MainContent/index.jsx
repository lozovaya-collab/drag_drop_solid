import { createEffect } from 'solid-js';
import { Router, Route, Routes, useNavigate } from "@solidjs/router";

import { apiService } from '../../shared/api/swagger/swagger.js';

import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';

const MainContent = () => {
    const navigate = useNavigate();

    const getAuth = async () => {
        try {
            await apiService.me.Me().then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
            })
        } catch (err) {
            if(err.response.status === 401) navigate('/auth')
        }
    }

    createEffect(() => {
        getAuth();
    })
    return (
        <Router>
            <Routes>
                <Route path="/" component={HomePage} /> 
                <Route path="/auth" component={AuthPage} /> 
            </Routes>
        </Router>
    )
}

export { MainContent }