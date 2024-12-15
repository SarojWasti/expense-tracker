import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faEnvelope, faMoneyBillWave, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import ET from '/expensetracker.png';
import DisplayMessage from './Alert';

const Sidebar = () => {

    const navigate = useNavigate();
    const logOut = async() => {
        DisplayMessage("Signed out!","info",false,800);
        await auth.signOut();  
        navigate("/")
    }

    return (
        <div className="sm:w-1/4 w-20 bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center mt-10">
                <a onClick={() => navigate("/dashboard")}>
                    <div className="flex items-center justify-center cursor-pointer">
                        <img className='md:w-[7rem] sm:w-[4.5rem] w-[3rem]' src={ET} />
                    </div>
                </a>
                <div className="mt-20">
                    <ul className="space-y-10">
                        <li className="custom-list ">
                            <a onClick={() => navigate("/dashboard")} 
                            className={`ulListStyle hover:text-red-500 transition-colors duration-300
                            ${location.pathname === '/dashboard' && 'text-red-500'}`}>

                                <FontAwesomeIcon icon={faChartPie} className="md:text-lg text-2xl" />
                                <span className="ml-4 hidden md:inline">Dashboard</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a onClick={() => navigate('/dashboard/expenses')} 
                            className={`ulListStyle hover:text-green-500 transition-colors duration-300
                            ${location.pathname==='/dashboard/expenses' && 'text-green-500'}`}>

                                <FontAwesomeIcon icon={faMoneyBillWave} className="md:text-lg text-2xl" />
                                <span className="ml-4 hidden md:inline">Expenses</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a onClick={() => navigate('/dashboard/messages')} 
                                className={`ulListStyle hover:text-blue-500 transition-colors duration-300
                                ${location.pathname==='/dashboard/messages' && 'text-blue-500'}`}>
                                    <FontAwesomeIcon icon={faEnvelope} className="md:text-lg text-2xl" />
                                    <span className="ml-4 hidden md:inline">Messages</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a onClick={()=>navigate('/dashboard/settings')} 
                            className={`ulListStyle hover:text-yellow-500 transition-colors duration-300
                            ${location.pathname==='/dashboard/settings' && 'text-yellow-500'}
                            `}>
                                <FontAwesomeIcon icon={faCog} className="md:text-lg text-2xl" />
                                <span className="ml-4 hidden md:inline">Settings</span>
                            </a>
                        </li>
                    </ul>
                    <ul className='mt-24'>
                        <li className="custom-list">
                            <a className="ulListStyle hover:text-red-500 transition-colors duration-300" onClick={() => logOut()}>
                            <FontAwesomeIcon icon={faSignOut} className="md:text-lg text-2xl" />
                            <span className="ml-4 hidden md:inline">Log Out</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
