import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faEnvelope, faMoneyBillWave, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';



const Sidebar = () => {

    const navigate = useNavigate();
    const logOut = async() =>{
        alert("Signing you out!")
        await auth.signOut();  
        navigate("/")
    }
    return (
        <div className="sm:w-1/4 flex items-center justify-center shadow-lg"> 
            <div>
                <h2 className="text-xl font-bold text-customRed">Expense Tracker</h2>
                <div className="mt-16">
                    <ul className="space-y-16 list-none">
                        <li className="custom-list">
                            <a onClick={()=>navigate("/dashboard")}>
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faChartPie} />
                                </span>
                                <span className="ml-4">Dashboard</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a onClick={()=>navigate('/dashboard')}>
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faMoneyBillWave} />
                                </span>
                                <span className="ml-4">Expenses</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a onClick={()=>navigate('/dashboard/messages')}>
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <span className="ml-4">Message</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a href="#">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className="ml-4">Account</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a href="#">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                                <span className="ml-4">Settings</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a className="  cursor-pointer" onClick={()=>logOut()} href="#">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faSignOut} />
                                </span>
                                <span className="ml-4">Log Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
