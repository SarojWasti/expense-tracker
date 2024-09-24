import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faEnvelope, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-1/4 flex items-center justify-center"> 
            <div className="text-center">
                <h2 className="text-xl font-bold text-customRed">Expense Tracker</h2>
                <div className="mt-16">
                    <ul className="space-y-16 list-none">
                        <li className="custom-list">
                            <a href="#" className="flex items-center justify-center">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faChartPie} />
                                </span>
                                <span className="ml-4">Dashboard</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a href="#" className="flex items-center justify-center">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <span className="ml-4">Message</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a href="#" className="flex items-center justify-center">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className="ml-4">Account</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a href="#" className="flex items-center justify-center">
                                <span className="custom-icon">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                                <span className="ml-4">Settings</span>
                            </a>
                        </li>
                        <li className="custom-list">
                            <a className="flex items-center justify-center cursor-pointer" onClick={() => navigate('/signup')} href="#">
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
