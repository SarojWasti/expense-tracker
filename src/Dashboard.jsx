import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Messages from "./components/Messages";
import Expenses from "./components/Expenses";

const Dashboard = ({user}) =>{

    return(
        <>
            {user &&
             (
                <div className="dashboard flex mt-8 overflow-hidden">
                    <Sidebar/>
                    <Home user={user}/>
                </div>
             )}
        </>
    );
}
export default Dashboard;