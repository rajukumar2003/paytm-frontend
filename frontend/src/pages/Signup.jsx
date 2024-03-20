import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Sub-Heading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export function Signup() {
    const [firstName, setFirstName] = useState('U');
    const [lastName, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    localStorage.setItem("username", firstName[0].toUpperCase());
    return <>
        <AppBar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
            <Heading label={"Sign up"} />
            <SubHeading label={'Enter Your Information'} /> <br/>
            <InputBox onChange={(e) => { setFirstName(e.target.value); }} label={'First Name'} placeholder={'Batman'} />
            <InputBox onChange={(e) => { setLastname(e.target.value); }} label={'Last Name'} placeholder={'Vengence'} />
            <InputBox onChange={e => { setUsername(e.target.value); }} label={'Email'} placeholder={"gotham@gmail.com"} />
            <InputBox onChange={e => { setPassword(e.target.value); }} label={'Password'} placeholder={'123456'} />
<br />
            <ButtonComponent onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                });
                localStorage.setItem("token", response.data.token);
                navigate('/dashboard')
            }} label={'Sign Up'} />
            
            <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={'/signin'} />
        </div>
    </>
};

