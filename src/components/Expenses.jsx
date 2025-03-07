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
        <div className="flex flex-col h-[calc(100vh-6rem)] p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-customRed">{name}</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500">Track and manage your expenses</p>
            </div>

            {/* Transactions Section */}
            <div className="flex flex-col flex-grow bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                </div>

                {userExpense && userExpense.length > 0 ? (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
                            <div>Expense Name</div>
                            <div>Date</div>
                            <div>Category</div>
                            <div>Amount</div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-y-auto flex-grow">
                            {userExpense.map((expense) => (
                                <div 
                                    key={expense.id} 
                                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border-b 
                                             hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="font-medium text-gray-800">{expense.name}</div>
                                    <div className="text-gray-600">
                                        {new Date(expense.createdDate.toDate()).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FontAwesomeIcon 
                                            icon={icons.find(icon => icon.value === expense.category)?.icon}
                                            className="text-customRed"
                                        />
                                        <span>{expense.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">${expense.amount}</span>
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleOptions(expense.id)}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                            >
                                                <FontAwesomeIcon 
                                                    icon={faEllipsisV} 
                                                    className="text-gray-400 hover:text-gray-600"
                                                />
                                            </button>

                                            {showOptions === expense.id && (
                                                <div 
                                                    ref={optionsRef}
                                                    className="absolute right-0 mt-2 w-36 bg-white rounded-lg 
                                                             shadow-lg border border-gray-100 z-10 py-1"
                                                >
                                                    <button
                                                        onClick={() => editExpense(expense)}
                                                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 
                                                                 flex items-center gap-2 text-gray-700"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} className="text-blue-600" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteExpense(expense.id)}
                                                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 
                                                                 flex items-center gap-2 text-gray-700"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                        <FontAwesomeIcon icon={faFolder} className="text-4xl mb-2" />
                        <p>No transactions to display.</p>
                    </div>
                )}
            </div>

            {/* Edit Popup */}
            {isEditing && (
                <Add 
                    user={user} 
                    closePopup={() => setIsEditing(false)}
                    expenseToEdit={expenseToEdit}
                />
            )}
        </div>
    );
};

export default Expenses;
