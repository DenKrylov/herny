import React from 'react';
import './App.css';
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "./auth/auth.context";
import { Login } from './components/Login/Login';
import { Profile } from "./components/Profile/Profile";
import { TopPanel } from "./components/TopPanel/TopPanel";
import { NotFound } from "./components/NotFound/NotFound";
import { Channels } from "./components/Channel/Channels";
import { Unauthorized } from "./components/Unauthorized/Unauthorized";
import { Home } from "./components/Home/Home";
import { Channel } from "./components/Channel/Channel";
import { Contacts } from "./components/Contacts/Contacts";
import { Settings } from "./components/Settings/Settings";
import { Game } from "./components/Game/Game";
import { SecondFa } from "./components/2fa/2Fa";
import { Logout } from "./components/Login/Logout";
import { Admin } from "./components/admin/Admin";
import { AdminChannelView } from "./components/AdminChannelView/AdminChannelView";
import { LoginSettings } from "./components/Login/LoginSettings";


function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (auth.user.isTwoFactorAuthenticationEnable && !auth.user.isTwoFactorAuthenticationValid) {
        return <Navigate to="/2fa" state={{ from: location }} replace />;
    }
    return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (auth.user.isTwoFactorAuthenticationEnable && !auth.user.isTwoFactorAuthenticationValid) {
        return <Navigate to="/2fa" state={{ from: location }} replace />;
    }
    if (auth.user.role !== 'Admin' && auth.user.role !== 'PO')
        return <Navigate to="/login" />;
    return children;
}

function App()
{
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/401" element={<Unauthorized />} />
            <Route path="/2fa" element={<SecondFa />} />

            <Route path="/logout" element={
                <RequireAuth>
                    <Logout/>
                </RequireAuth>
            } />

            <Route path="/login/settings" element={
                <RequireAuth>
                    <LoginSettings/>
                </RequireAuth>
            } />

            <Route path="/game" element={
                <RequireAuth>
                    <Game />
                </RequireAuth>
            } />

            <Route element={<TopPanel/>}>
                <Route path="/admin" element={
                    <RequireAdmin>
                        <Admin/>
                    </RequireAdmin>
                } />
                    <Route path="/admin/channel/:id" element={
                        <RequireAdmin>
                            <AdminChannelView/>
                        </RequireAdmin>
                    } />
                <Route path="/" element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />
                <Route path="/profile" element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                } />
                <Route path="/profile/:id" element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                } />
                <Route path="/channels" element={
                    <RequireAuth>
                        <Channels />
                    </RequireAuth>
                } />
                <Route path="/channel" element={
                    <RequireAuth>
                        <Channel />
                    </RequireAuth>
                } />
                    <Route path="/channel/:id" element={
                        <RequireAuth>
                            <Channel />
                        </RequireAuth>
                    } />
                <Route path="/contacts" element={
                    <RequireAuth>
                        <Contacts />
                    </RequireAuth>
                } />
                <Route path="/settings" element={
                    <RequireAuth>
                        <Settings />
                    </RequireAuth>
                } />
                <Route path="*" element={<NotFound />}/>
            </Route>

        </Routes>
    )
}

export default App;
