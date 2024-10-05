import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

const Dashboard = ({user}) =>{

    return(
        <>
            {user &&
             (
                <div className="dashboard flex overflow-hidden">
                    <Sidebar/>
                    <Home user={user}/>
                </div>
             )}
        </>
    );
}
export default Dashboard;