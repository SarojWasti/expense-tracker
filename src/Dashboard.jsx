import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
const Dashboard = () =>{
    return(
        <div className="dashboard flex mt-8 overflow-hidden">
            <Sidebar/>
            <Home/>
        </div>
    );
}
export default Dashboard;