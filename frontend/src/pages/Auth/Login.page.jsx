import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { Authentication } from "../../components/misc/Authentication";


const LoginPage = () => {
    const navigate = useNavigate();
    const { loginService, authLoading, user } = useBoundStore((state) => state);

    useEffect(() => {
        if (!!user) {
            navigate("/posts");
        }
    }, [user]);

    const onLogin = async (e) => {
        e.preventDefault();
        let email = e.target.email?.value;
        let password = e.target.password?.value;
        if (!email || !password) return;
        loginService(email, password);
    };
    return (
        <form onSubmit={onLogin}>
            < Authentication />
        </form>
    );
};

export default LoginPage;
