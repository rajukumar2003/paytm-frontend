import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from '../components/ButtonComponent';


export function SendMoney() {
    const [amount, setAmount] = useState(0);
    const [alertMessage, setMessage] = useState('');

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fname = searchParams.get('fname').toUpperCase();
    const lname = searchParams.get('lname').toUpperCase();
    const id = searchParams.get('id');

    return (
        <div className="flex justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-600">
            <div className="h-full flex flex-col items-center py-16">
                <div className="w-full max-w-sm rounded-lg shadow-md bg-white p-8">
                    <h2 className="text-3xl font-bold text-center text-gradient-to-r from-purple-500 to-pink-500">
                        Send Money
                    </h2>
                    <div className="flex items-center space-x-4 mt-6">
                        <div className="rounded-full h-12 w-12 bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-bold">
                            {fname[0]}
                        </div>
                        <h3 className="text-2xl font-semibold text-center">To {fname} { lname}</h3>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="amount" className="text-sm font-medium">
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            type="number"
                            className="w-full rounded-md border border-blue-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button onClick={() => {
                        axios.post('https://paytm-backend-oubg.onrender.com/api/v1/account/transfer', {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem('token')
                            }
                        })
                            .then((response) => { setMessage(response.data.message) });
                        
                    }}
                        className="w-full rounded-md bg-blue-500 py-2 px-4 text-white font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
                        Initiate Transfer
                    </button>
                    {alertMessage && (
                        <div className="mt-4 text-center text-red-500 font-semibold">{alertMessage}</div>
                    )}
                    {/* <ButtonComponent label={'Go to Dashboard'} onClick={navigate('/dashboard')} /> */}
                </div>
            </div>
        </div>
    );
}

