import { collection, deleteDoc, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBus, faEllipsisV, faFolder, faGem, faPen, faTools, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Add from "./Add";
import DisplayMessage from "./Alert";

const Expenses = ({ user }) => {

    //UPDATE HANDLE--------------
    const [isEditing, setIsEditing] = useState(false);

    const [expenseToEdit, setExpenseToEdit] = useState(null);

    //HANDLE MOUSE CLICK ON WINDOW FOR ELLIPSIS---------
    const optionsRef = useRef(null);
    const [showOptions, setShowOptions] = useState(null);
    const toggleOptions = (expenseID) =>{
        setShowOptions(showOptions === expenseID ? null : expenseID);
    }
    useEffect(()=>{
        const handleClick = (event)=>{
            if(optionsRef.current && !optionsRef.current.contains(event.target)){
                setShowOptions(null);
            }
        }
        document.addEventListener("mousedown",handleClick)
        return ()=>document.removeEventListener("mousedown",handleClick);
    },[]);
    
    //DELETE EXPENSE-----------------------------
    const deleteExpense = async(expenseID) => {
        try {
            DisplayMessage("Expense Deleted","success");
            await deleteDoc(doc(firestore,"expenseStore",expenseID));
        } catch (error) {
            console.error(error);
        }
    };
    
    //EDIT EXPENSE ------------------------------
    const editExpense = (expense)=>{
        setIsEditing(true);
        setExpenseToEdit(expense);
        
    }

    //------------------------------------------

    const expenseRef = collection(firestore, "expenseStore");
    const [snapshot, loading, error] = useCollection(
        query(expenseRef, orderBy("createdDate","desc"))
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const userExpense = snapshot?.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))  // Combine doc ID with data
        .filter(expense => expense.userID === user.uid);
    const icons = [
        { icon: faBowlFood, value: 'Food' },
        { icon: faBus, value: 'Transport' },
        { icon: faTools, value: 'Utility' },
        { icon: faGem, value: 'Luxury' },
        { icon: faFolder, value: 'Other' },
    ];
    const name = user.displayName.split(" ")[0];

    return (
        <div className="flex flex-col mt-12 w-full h-[80vh] max-w-4xl px-4 lg:px-16">
            <div className="p-4">
                <h2 className="flex sm:text-3xl text-xl font-bold gap-2">
                    Hello <span className="text-customRed">{name}!</span>
                </h2>
                <div className="mt-8 sm:text-xl text-lg">
                    <h2>Transactions</h2>
                </div>
            </div>
            <div className="p-4 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-b-2 pb-2 p-2 bg-gray-200">
                    <div>Expense Name</div>
                    <div>Date</div>
                    <div>Category</div>
                    <div>Amount</div>
                </div>

                {userExpense && userExpense.length > 0 ? (
                    userExpense.map((expense) => (
                        <div key={expense.id} className="grid grid-cols-2 sm:grid-cols-4 mt-8 gap-4 sm:gap-8 border-b-2">
                            <div>{expense.name}</div>
                            <div>{new Date(expense.createdDate.toDate()).toLocaleDateString()}</div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={icons.find(icon => icon.value === expense.category)?.icon} />
                                <div>{expense.category}</div>
                            </div>
                            <div className="flex justify-between relative">
                                ${expense.amount} 
                                <span onClick={() => toggleOptions(expense.id)} className="cursor-pointer text-gray-600 ml-4">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </span>

                                {showOptions === expense.id && (
                                    <div ref={optionsRef} className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                                        <div className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                                             onClick={() => deleteExpense(expense.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                                            <span>Delete</span>
                                        </div>
                                        <div onClick={()=>editExpense(expense)} className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                                            <FontAwesomeIcon icon={faPen} className="text-blue-600" />
                                            <span>Edit</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="mt-8 text-center text-gray-500">
                        No transactions to display.
                    </div>
                )}
            </div>
            {isEditing && (
                <Add user={user} closePopup={()=>setIsEditing(false)}
                expenseToEdit = {expenseToEdit}
                />
            )}
        </div>
    );
};

export default Expenses;
