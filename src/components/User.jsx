import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const User = ({user}) =>{
    const name = user.displayName;
    const email = user.email;


    return(
        <div className="flex flex-col mt-12 w-full h-[80vh] max-w-4xl px-4 lg:px-16">
            <div className="p-4">
                <h2 className="flex justify-between sm:text-3xl text-2xl font-bold gap-2">
                    <span>Settings</span>
                    <span className="text-[1rem]">Edit <FontAwesomeIcon icon={faPen} className="text-customRed" /></span>

                </h2>
                
                <div className="mt-8 sm:text-xl text-lg">
                    <h2>Name: <span className="text-customRed font-bold">{name}</span></h2>
                </div>
                <div className="mt-8 sm:text-xl text-lg">
                    <h2>Email: <span className="text-customRed font-bold">{email}</span></h2>
                </div>
            </div>
        </div>
    );
}
export default User;