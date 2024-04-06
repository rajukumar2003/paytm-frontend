import { AppBar } from "../components/AppBar";
import { BalanceComponent } from "../components/BalanceComponent";
import { Users } from "../components/Users";

export function DashBoard() {
    return <div>
        <AppBar /><br />
        <BalanceComponent />
        <Users />
    </div>
};
