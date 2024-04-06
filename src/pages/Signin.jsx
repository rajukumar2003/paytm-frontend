import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Sub-Heading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";


export function Signin() {
    const [username, setUsername] = useState('U');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    localStorage.setItem("username", username[0].toUpperCase());

    return <>
        <AppBar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
            <Heading label={"Sign In"} />
            <SubHeading label={'Enter Your Credentials to access your account'} /> <br />
            <InputBox onChange={e => { setUsername(e.target.value); }} label={'Email'} placeholder={"gotham@gmail.com"} />
            <InputBox onChange={e => { setPassword(e.target.value); }} label={'Password'} placeholder={'123456'} />
            <br />
            <ButtonComponent onClick={async () => {
                const response = await axios.post("https://paytm-backend-oubg.onrender.com/api/v1/user/signin", {
                    username,
                    password
                });
                localStorage.setItem("token", response.data.token);
                navigate('/dashboard')
            }} label={'Sign In'} />
            <BottomWarning label={"Don't have an account? "} buttonText={"Sign up"} to={'/signup'} />
        </div>
    </>
};


