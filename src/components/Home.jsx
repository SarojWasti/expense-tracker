import React, { useState } from 'react';
import { faSearch, faUser, faTimes,faBowlFood, faBus, faTools, faFolder, faGem, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from './Messages';
import Expenses from './Expenses';
import { Routes, Route } from 'react-router-dom';
import { addDoc, collection, query, Timestamp } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import PieChart from './Piechart';

const Home = ({ user}) => {

  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const [selectedIcon, setSelectedIcon] = useState('Food');
  const [initExpense, setExpense] = useState("");
  const [initCost, setCost] = useState(0);



  const expenseRef = collection(firestore, "expenseStore");

  const userName = user.displayName;
  const email = user.email;
  const emailVerified = user.emailVerified;
  const photo = user.photoURL;

  {/* Icons Object To use for Add expense */}
  const icons = [
    { icon: faBowlFood, value: 'Food' },
    { icon: faBus, value: 'Transport' },
    { icon: faTools, value: 'Utility' },
    { icon: faGem, value: 'Luxury' },
    { icon: faFolder, value: 'Other' },

  ];

  const displayUserInfo = () => {
    alert(`
      User Name: ${userName}
      User Email: ${email}
      Email Verified: ${emailVerified}
    `);

  };

  {/* HANDLE FORM TO ADD EXPENSES */}
  const handleForm = async(e) => {

    e.preventDefault();
    const expenseData = {
      userID: user.uid,
      name: initExpense,
      category: selectedIcon,
      amount: initCost,
      createdDate: Timestamp.fromDate(new Date())
  
    }

    try{
      alert("Expense added successfully!")
      await addDoc(expenseRef,expenseData);
      
      closePopup();

    }catch(error){
      alert(`The error is: ${error}`);
    }
    setSelectedIcon("Food");
    setExpense("");
    setCost(0);
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);

    console.log(`Selected icon: ${icon}`);
  };


  return (
    <div className="w-3/4 bg-white top-1 ml-4 mt-6">
      <div className="flex items-center">
        {/* Search bar */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="flex xl:space-x-12 xl:ml-[20rem] sm:ml-[4rem] ml-6">

          {/*Add Expense Button */}
          <div className="flex items-center md:text-sm">
            <button
              className="p-3 bg-customRed text-white rounded-lg lg:p-2"
              onClick={openPopup}
            >
              <span className='lg:inline hidden'>Add Expense</span> <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
          </div>

          {/* User icon */}
          <div className="flex items-center">
            <button className="p-2" onClick={displayUserInfo}>
              <span className="space-x-2 flex items-center">
                  <img
                    className="rounded-3xl h-auto w-auto sm:h-8 sm:w-8"
                    src={photo}
                    alt="User"
                  />
                  <div className='md:inline hidden'>{user.displayName}</div>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/*---------------------Routes--------------------*/}
        <Routes>
          
          <Route index element={<PieChart user={user}/>}/>
          
          <Route path="messages" element={<Messages user={user}/>}/>

          <Route path="expenses" element={<Expenses user={user}/>}/>
      </Routes>
     {/*---------------------------------------------------------- */} 
      {/* Popup - Add Expense */}
      {showPopup && (
        <div className="popup-overlay h-screen">
          <div className="popup-container">
            <button className="close-btn" onClick={closePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-xl font-bold text-customRed">Add Expense</h2>
            {/*************************Expense Add*************************************** */}
            <form className='*:mt-8' onSubmit={handleForm}>
              <div>
                <input
                type="text"
                value={initExpense}
                onChange={(e)=>setExpense(e.target.value)}
                placeholder="Expense Name"
                className="expenseInput"
              />
              </div>

              <div className="flex justify-around text-xs sm:text-lg">
                {icons.map(({ icon, value }) => (
                  <div
                    key={value}
                    onClick={() => handleIconClick(value)}
                    className={`cursor-pointer flex flex-col items-center md:p-4 p-2 ${
                      selectedIcon === value ? 'text-customRed' : 'text-gray-500'
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} size="2x" />
                    <span className="mt-1">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <input
                type="text"
                value={initCost}
                onChange={(e)=>setCost(e.target.value)}
                placeholder="Total Cost"
                className="expenseInput"
              />
              </div>
              <button
              className="p-2 bg-customRed text-white rounded-lg"
            >
              Create <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
          </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
