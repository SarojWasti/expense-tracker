import { collection, limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBus, faFolder, faGem, faTools } from "@fortawesome/free-solid-svg-icons";

const Expenses = ({ user }) => {
    const expenseRef = collection(firestore,"expenseStore");
    const [getExpenses] = useCollectionData(
        query(expenseRef,
        orderBy("createdDate")),{idField: "id"}
    );
    const userExpense = getExpenses?.filter(expense => expense.userID === user.uid);
    const icons = [
        { icon: faBowlFood, value: 'Food' },
        { icon: faBus, value: 'Transport' },
        { icon: faTools, value: 'Utility' },
        { icon: faGem, value: 'Luxury' },
        { icon: faFolder, value: 'Other' },
    
      ];

    return (
        <div className="flex flex-col mt-12 w-full h-[80vh] max-w-4xl">
          <div className="p-4">
            <h2 className="flex text-3xl font-bold gap-2">
              Hello <span className="text-customRed">{user.displayName}!</span>
            </h2>
            <div className="mt-8 text-xl">
              <h2>Transactions</h2>
            </div>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">

            <div className="grid grid-cols-4 gap-8 border-b-2 pb-2 p-2 bg-gray-200">
              <div>Expense Name</div>
              <div>Date</div>
              <div>Category</div>
              <div>Amount</div>
            </div>

            {userExpense && userExpense.length >0 ? 
             (
              userExpense.map((expense) => (
                <div key={expense.id} className="grid grid-cols-4 mt-8 gap-8 border-b-2">
                    <div>{expense.name}</div>
                    <div>{new Date(expense.createdDate.toDate()).toLocaleDateString()}</div>
                    <div className="gap-2 flex">
                    <FontAwesomeIcon icon={icons.find(icon => icon.value === expense.category)?.icon} />
                    <div>{expense.category}</div>    
                    </div>
                    <div>${expense.amount}</div>                
                </div>
              ))
            ):(
                <div className="mt-8 text-center text-gray-500">
                  No transactions to display.
                </div>
              )}
          </div>
        </div>
      );
      
  };
  
  export default Expenses;
  