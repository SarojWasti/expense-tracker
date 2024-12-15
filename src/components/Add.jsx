import React, { useState, useEffect } from 'react';
import { faTimes, faBowlFood, faBus, faTools, faFolder, faGem, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import DisplayMessage from './Alert';
const Add = ({ user, closePopup, expenseToEdit = null }) => {
  const [selectedIcon, setSelectedIcon] = useState('Food');
  const [initExpense, setExpense] = useState('');
  const [initCost, setCost] = useState('');

  const expenseRef = collection(firestore, 'expenseStore');

  const icons = [
    { icon: faBowlFood, value: 'Food' },
    { icon: faBus, value: 'Transport' },
    { icon: faTools, value: 'Utility' },
    { icon: faGem, value: 'Luxury' },
    { icon: faFolder, value: 'Other' },
  ];

  useEffect(() => {
    if (expenseToEdit) {
      setExpense(expenseToEdit.name);
      setCost(expenseToEdit.amount);
      setSelectedIcon(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleForm = async (e) => {
    e.preventDefault();

    const expenseData = {
      userID: user.uid,
      name: initExpense,
      category: selectedIcon,
      amount: parseFloat(initCost),
      createdDate: Timestamp.fromDate(new Date()),
    };

    try {
      if (expenseToEdit) {
        await updateDoc(doc(firestore, 'expenseStore', expenseToEdit.id), expenseData);
        DisplayMessage("Expense Updated!","success")
      } else {
        await addDoc(expenseRef, expenseData);
        DisplayMessage("Expense Added!", "success")
      }
      closePopup();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setSelectedIcon('Food');
    setExpense('');
    setCost('');
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="popup-overlay h-screen">
      <div className="popup-container">
        <button className="close-btn" onClick={closePopup}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-xl font-bold text-customRed">
          {expenseToEdit ? 'Edit Expense' : 'Add Expense'}
        </h2>

        <form className="mt-8" onSubmit={handleForm}>
          <div>
            <input
              type="text"
              value={initExpense}
              onChange={(e) => setExpense(e.target.value)}
              placeholder="Expense Name"
              className="expenseInput"
            />
          </div>

          <div className="flex justify-around text-xs sm:text-lg">
            {icons.map(({ icon, value }) => (
              <div
                key={value}
                onClick={() => handleIconClick(value)}
                className={`cursor-pointer flex flex-col items-center md:p-4 p-2 ${selectedIcon === value ? 'text-customRed' : 'text-gray-500'}`}
              >
                <FontAwesomeIcon icon={icon} size="2x" />
                <span className="mt-1">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <input
              type="number"
              value={initCost}
              onChange={()=>{/^\d*$/.test(value) && setCost(e.target.value)}}
              placeholder="Total Cost"
              className="expenseInput"
            />
          </div>

          <button className="mt-6 p-2 bg-customRed text-white rounded-lg">
            {expenseToEdit ? 'Update' : 'Create'} <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
