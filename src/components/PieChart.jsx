import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../services/firebase';
import _ from 'lodash';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ user }) => {

    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
    const [incomeTotal, setIncome] = useState(0);

    const addIncome = () =>{
        
    }
    const expenseRef = collection(firestore, "expenseStore");
    const [getExpenses] = useCollectionData(
        query(expenseRef, orderBy("createdDate")), { idField: "id" }
    );

    const userExpense = getExpenses?.filter(expense => expense.userID === user.uid) || [];
    const thisMonth = _.sum(userExpense.map(expense =>{
        const lastDate = new Date().getMonth();
        const thisDate = new Date(expense.createdDate.toDate()).getMonth();
        return thisDate===lastDate ?  Number(expense.amount) : 0;
    } ))
    const lastMonth = _.sum(userExpense.map(expense=>{
        const thisDate = new Date(expense.createdDate.toDate()).getMonth();
        const lastDate = new Date().getMonth()-1;
        return thisDate === lastDate ? Number(expense.amount) : 0;
    }))
    const aggExpense = userExpense.reduce((acc,expense)=>{
        const {category, amount} = expense;
        if(!acc[category]){
            acc[category] = 0;
        }
        acc[category] += Number(amount);
        
        return acc;
        
    },{});


    const chartData = {
        labels: Object.keys(aggExpense),
        datasets: [
            {
                data: Object.values(aggExpense),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels:{
                    font:{
                        weight: "bold",
                        size: '12'
                    }
                }
            },
        },
    };

    return (
        <div className="mt-12 w-full h-[80vh] max-w-4x overflow-y-auto">
            <div className="text-xl">Dashboard</div>
            
            <div className="md:flex md:*:mt-0 *:mt-4 mt-4 md:space-x-16">
                {/* Pie Chart Container */}
                
                {userExpense.length>0?
                (<div className="md:h-[26rem] md:w-[26rem] h-80 w-80 bg-white p-4">
                    <Pie data={chartData} options={options} />
                </div>):
                (
                    <div className="text-gray-500 mb-10 mr-20">
                        No Expenses to show!
                    </div>
                )
                }
                
                <div className='bg-white rounded-lg shadow-lg p-4 h-[8rem] md:w-[10rem] w-64'>
                    <div><FontAwesomeIcon icon={faWallet} className='text-blue-800'/></div>
                    <div className="font-bold">Last Month Expenses</div>
                    <span className='text-customRed text-2xl'>
                        ${lastMonth}
                    </span>
                </div>
                <div className='bg-white rounded-lg shadow-lg p-4 h-[8rem] md:w-[10rem] w-64'>
                    <div><FontAwesomeIcon icon={faWallet} className='text-customRed'/></div>
                    <div className="font-bold">This Month Expenses</div>
                    <span className='text-customRed text-2xl'>
                        ${thisMonth}
                    </span>
                </div>
            </div>
            {showPopup && (
        <div className="popup-overlay h-screen">
          <div className="popup-container">
            <button className="close-btn" onClick={closePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-xl font-bold text-customRed">Set Income</h2>
            {/*************************Expense Add*************************************** */}
              <div className='mt-4'>
                <input
                type="text"
                value={incomeTotal}
                onChange={(e)=>setIncome(e.target.value)}
                placeholder="Your Total Income $"
                className="expenseInput"
              />
              </div>
              <button
              onClick={addIncome}
              className="mt-4 p-2 bg-customRed text-white rounded-lg">
              Add Income <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
          </div>
        </div>
      )}
        </div>

    );
};

export default PieChart;
