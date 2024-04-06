import { InputBox } from "./InputBox";
import { ButtonComponent } from "./ButtonComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('https://paytm-backend-oubg.onrender.com/api/v1/user/bulk?filter='+ filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users:</div>
            <InputBox onChange={(e) => { setFilter(e.target.value) }} placeholder={'Search users....'} />
            <div>
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-bold">
                    {user.firstName[0]}
                </div>
                <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-800">
                        {user.firstName} {user.lastName}</div>
                    {/* <div className="text-gray-600">User ID: {user._id}</div> */}
                </div>
            </div>
            <div>
                <ButtonComponent onClick={(e) => { navigate("/send?id=" + user._id + "&fname=" + user.firstName + "&lname=" + user.lastName); }}
                    label={"Send Money"} />
            </div>
        </div>
    );
}

