import axios from "axios";
import { useState } from "react"


export function BalanceComponent() {
    
    const [balance, setBalance] = useState(0);

    axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
            Authorization: "Bearer "+localStorage.getItem('token')
        }
    }).then((response) => {
        setBalance(response.data.balance)
    })

    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance:
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance.toFixed(2)}
        </div>
    </div>
}

