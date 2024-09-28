import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

const Dashboard = ({user}) =>{
    return(
        <>
            {user ?
             (
                <div className="dashboard flex mt-8 overflow-hidden">
                    
                    <Sidebar/>
                    <Home user={user}/>
                </div>
             )
             :(
                <div>
                    No user logged in!
                </div>
             )}
        </>
    );
}
export default Dashboard;