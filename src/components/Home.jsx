import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Home = () => {
  return (
      <div className="w-3/4 bg-white">
        <div className="userIcon relative">
          <span className="absolute right-8 space-x-4">
            <span>
              <FontAwesomeIcon icon={faUser}/>
            </span>
            <span>Hi Saroj</span>
          </span>
        </div>
          <div className="relative w-full max-w-xs">
            <input 
            type="text" 
            placeholder="Search" 
            className="searchThis w-full p-2 border border-gray-300 rounded-md focus:outline-none" 
            />
            <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
      </div>
      );
};

export default Home;