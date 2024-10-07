import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBus, faFolder, faGem, faTools, faTrash } from "@fortawesome/free-solid-svg-icons";

const Expenses = ({ user }) => {
    const deleteExpense = async(expenseID) => {
        try {
            alert("Expense Deleted Successfully!");
            await deleteDoc(doc(firestore,"expenseStore",expenseID));
        } catch (error) {
            console.error(error);
        }
    };

    const expenseRef = collection(firestore, "expenseStore");
    const [snapshot, loading, error] = useCollection(
        query(expenseRef, orderBy("createdDate"))
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

    return (
        <div className="flex flex-col mt-12 w-full h-[80vh] max-w-4xl px-4 sm:px-8 lg:px-16">
            <div className="p-4">
                <h2 className="flex text-3xl font-bold gap-2">
                    Hello <span className="text-customRed">{user.displayName}!</span>
                </h2>
                <div className="mt-8 text-xl">
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
                            <div className="flex justify-between">
                                ${expense.amount} 
                                <span onClick={() => deleteExpense(expense.id)} className="cursor-pointer text-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="mt-8 text-center text-gray-500">
                        No transactions to display.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expenses;
