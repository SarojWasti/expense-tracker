import React, { useState } from 'react';
import { faSearch, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from './Messages';
import Expenses from './Expenses';
import { Routes, Route } from 'react-router-dom';
import { firestore } from '../services/firebase';
import PieChart from './PieChart';
import User from './User';
import Add from './Add';

const Home = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const openPopup = (expense = null) => {
    setExpenseToEdit(expense);
    setShowPopup(true);
  };
  const closePopup = () => setShowPopup(false);

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
          {/* Add Expense Button */}
          <div className="flex items-center md:text-sm">
            <button
              className="p-3 bg-customRed text-white rounded-lg lg:p-2"
              onClick={() => openPopup()}
            >
              <span className='lg:inline hidden'>Add Expense</span> <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </div>

          {/* User icon */}
          <div className="flex items-center">
            <button className="p-2">
              <span className="space-x-2 flex items-center">
                <img
                  className="rounded-3xl h-auto w-auto sm:h-8 sm:w-8"
                  src={user.photoURL}
                  alt="User"
                />
                <div className='md:inline hidden'>{user.displayName}</div>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route index element={<PieChart user={user} />} />
        <Route path="messages" element={<Messages user={user} />} />
        <Route path="expenses" element={<Expenses user={user} onEditExpense={openPopup} />} />
        <Route path="settings" element={<User user={user} />} />
      </Routes>

      {/* Popup - Add/Edit Expense */}
      {showPopup && <Add user={user} closePopup={closePopup} expenseToEdit={expenseToEdit} />}
    </div>
  );
};

export default Home;
