import React from 'react';
import AuthLayouts from '../Layouts/AuthLayouts';
import FormLogin from '../Fragmen/FormLogin';

const Login = () => {
    return (
        <AuthLayouts title="Login">
            <FormLogin />
        </AuthLayouts>
    );
};

export default Login;