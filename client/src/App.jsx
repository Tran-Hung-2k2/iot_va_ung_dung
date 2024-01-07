import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import adminRoutes from './routes/admin.route';
import managerRoutes from './routes/manager.route';
import userRoutes from './routes/user.route';

import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifySignup from './pages/VerifySignup';
import ForgetPassword from './pages/ForgetPassword';
import VerifyForgetPassword from './pages/VerifyForgetPassword';
import NotFound from './pages/NotFound';

import Loader from './components/Loader';
import HomeNavigate from './components/HomeNavigate';
import RequireAdminUser from './components/RequireAdminUser';
import RequireAdmin from './components/RequireAdmin';
import RequireManager from './components/RequireManager';
import RequireUser from './components/RequireUser';
import RequireSignin from './components/RequireSignin';

const UserProfile = lazy(() => import('./pages/UserProfile'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const CardManager = lazy(() => import('./pages/CardManager'));
const RecordManager = lazy(() => import('./pages/RecordManager'));
const ParkingInfo = lazy(() => import('./pages/ParkingInfo'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>
                <Route path="/" element={<HomeNavigate />} />
                <Route path="/verify_signup" element={<VerifySignup />} />

                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forget_passord" element={<ForgetPassword />} />
                    <Route path="/verify_forget_password" element={<VerifyForgetPassword />} />

                    {/* Yêu cầu đăng nhập */}
                    <Route element={<RequireSignin />}>
                        <Route
                            path="/change_password"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ChangePassword />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>

                <Route element={<RequireSignin />}>
                    <Route element={<MainLayout />}>
                        {/* Yêu cầu đăng nhập */}
                        <Route
                            path="/profile"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <UserProfile />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/parking/info"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ParkingInfo />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/record/manager"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <RecordManager />
                                </Suspense>
                            }
                        />

                        {/* Admin Routes */}
                        <Route element={<RequireAdmin />}>
                            {adminRoutes.map((route, index) => {
                                const { path, component: Component } = route;
                                return (
                                    <Route
                                        key={index}
                                        path={path}
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Component />
                                            </Suspense>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        {/* Manager Routes */}
                        <Route element={<RequireManager />}>
                            {managerRoutes.map((route, index) => {
                                const { path, component: Component } = route;
                                return (
                                    <Route
                                        key={index}
                                        path={path}
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Component />
                                            </Suspense>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        {/* User Routes */}
                        <Route element={<RequireUser />}>
                            {userRoutes.map((route, index) => {
                                const { path, component: Component } = route;
                                return (
                                    <Route
                                        key={index}
                                        path={path}
                                        element={
                                            <Suspense fallback={<Loader />}>
                                                <Component />
                                            </Suspense>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        {/* Admin and User Routes */}
                        <Route element={<RequireAdminUser />}>
                            <Route
                                path="/card/manager"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <CardManager />
                                    </Suspense>
                                }
                            />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
