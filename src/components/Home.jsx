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
    <div className="home-container">
      <div className="header">
        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..." // Changed from "Search expenses..."
            className="search-input"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
          />
        </div>

        <div className="actions-container">
          {/* Add Expense Button */}
          <button
            onClick={() => openPopup()}
            className="add-expense-btn"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
            <span className="add-text">Add Expense</span>
          </button>

          {/* User Profile */}
          <button className="user-profile">
            <img
              src={user.photoURL}
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">{user.displayName}</span>
          </button>
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
