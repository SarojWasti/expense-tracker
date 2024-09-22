import { useNavigate } from "react-router-dom";

const TestRedirect = () =>{
    const navigate = useNavigate();
    const goHome = () =>{
        navigate('/');
    }
    return(
        <div>
            <button onClick={goHome} className="text-2xl">Go Home</button>
        </div>
    );
}
export default TestRedirect;