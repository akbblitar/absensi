import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useState, useRef, useEffect } from "react";
import { login } from "../../services/auth.service";

const FormLogin = () => {
    const [loginFailed, setLoginFailed] = useState(false);
    const usernameRef = useRef(null);

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        console.log(data);
        login(data, (status, res) => {
            if (status) {
                console.log("Login successful:", res);
                localStorage.setItem("token", res.token);
                if (res.role === 'Admin') {
                    window.location.href = "/admin-dashboard";
                } else if (res.role === 'Supervisor') {
                    window.location.href = "/supervisor-dashboard";
                } else {
                    window.location.href = "/karyawan-dashboard";
                }
            } else {
                console.log("Login failed:", res);
                setLoginFailed(res.response.data);
            }
        })
    }

    return (
        <form action="" onSubmit={handleLogin}>
            {loginFailed && <p className="text-red-500 text-sm">{loginFailed}</p>}
            <InputForm
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                ref={usernameRef}
            />
            <InputForm
                label="Password"
                name="password"
                type="password"
                placeholder="********"
            />
            <Button
                variant="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-base w-full"
                type="submit">Masuk</Button>
        </form>
    )
}

export default FormLogin;