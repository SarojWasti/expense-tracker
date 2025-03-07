import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../services/firebase';
import _ from 'lodash';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlusCircle, 
    faTimes, 
    faWallet,
    faArrowTrendUp,
    faArrowTrendDown,
    faChartPie 
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ user }) => {

    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
    const [incomeTotal, setIncome] = useState(0);

    const addIncome = () => {
        
    }
    const expenseRef = collection(firestore, "expenseStore");
    const [getExpenses] = useCollectionData(
        query(expenseRef, orderBy("createdDate")), { idField: "id" }
    );

    const userExpense = getExpenses?.filter(expense => expense.userID === user.uid) || [];
    const thisMonth = _.sum(userExpense.map(expense => {
        const lastDate = new Date().getMonth();
        const thisDate = new Date(expense.createdDate.toDate()).getMonth();
        return thisDate === lastDate ? Number(expense.amount) : 0;
    }))
    const lastMonth = _.sum(userExpense.map(expense => {
        const thisDate = new Date(expense.createdDate.toDate()).getMonth();
        const lastDate = new Date().getMonth() - 1;
        return thisDate === lastDate ? Number(expense.amount) : 0;
    }))
    const aggExpense = userExpense.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += Number(amount);

        return acc;

    }, {});

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '500',
                        family: 'Inter, sans-serif'
                    },
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[new Date().getMonth()];
    const previousMonth = monthNames[new Date().getMonth() - 1];

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

    return (
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-6rem)] p-6 bg-gray-50">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Financial Overview</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FontAwesomeIcon icon={faChartPie} className="text-customRed text-xl" />
                            <h2 className="text-lg font-semibold text-gray-800">Expense Distribution</h2>
                        </div>
                        <div className="h-[400px]">
                            {userExpense.length > 0 ? (
                                <Pie data={chartData} options={options} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    No expenses to show
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-6">
                    {/* Current Month Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">{currentMonth}</h3>
                            <FontAwesomeIcon 
                                icon={thisMonth > lastMonth ? faArrowTrendUp : faArrowTrendDown} 
                                className={`text-lg ${thisMonth > lastMonth ? 'text-green-500' : 'text-red-500'}`}
                            />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">${thisMonth}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            {thisMonth > lastMonth ? 'Increased' : 'Decreased'} from last month
                        </div>
                    </div>

                    {/* Previous Month Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">{previousMonth}</h3>
                            <FontAwesomeIcon icon={faWallet} className="text-gray-400 text-lg" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">${lastMonth}</p>
                        <div className="mt-2 text-sm text-gray-500">Previous month's expenses</div>
                    </div>

                    {/* Top Categories Preview */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Top Categories</h3>
                        <div className="space-y-3">
                            {Object.entries(aggExpense)
                                .sort(([,a], [,b]) => b - a)
                                .slice(0, 3)
                                .map(([category, amount]) => (
                                    <div key={category} 
                                         className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                        <span className="text-gray-600 capitalize">{category}</span>
                                        <span className="font-semibold">${amount}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Income Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Set Monthly Income</h2>
                                <button 
                                    onClick={closePopup}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={incomeTotal}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="Enter your monthly income"
                                className="w-full p-3 border border-gray-200 rounded-lg 
                                         focus:ring-2 focus:ring-customRed focus:border-customRed 
                                         transition-all duration-200"
                            />
                            <button
                                onClick={addIncome}
                                className="w-full mt-4 p-3 bg-customRed text-white rounded-lg 
                                         hover:bg-red-600 transition-all duration-200 
                                         flex items-center justify-center gap-2"
                            >
                                Save Income
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PieChart;
