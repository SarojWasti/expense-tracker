import { faPen, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { auth } from "../services/firebase";
import { updateEmail } from "firebase/auth";
import DisplayMessage from "./Alert";

const User = ({user}) => {
    const name = user.displayName;
    const email = user.email;

    return (
        <div className="p-4">
            <div className="mx-auto bg-white rounded-xl shadow-sm">
                {/* Header */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Account Information</h2>
                    <p className="mt-1 text-sm text-gray-500">Your profile details</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <img 
                            src={user.photoURL} 
                            alt={name}
                            className="w-14 h-14 rounded-full border border-gray-200"
                        />
                        <div>
                            <h3 className="font-medium text-gray-800">{name}</h3>
                            <p className="text-sm text-gray-500">Google Account</p>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <p className="text-gray-800">{email}</p>
                    </div>

                    {/* Account Info */}
                    <div className="space-y-4 pt-4 border-t">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Account Created</label>
                            <p className="text-gray-800">
                                {new Date(user.metadata.creationTime).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Last Sign In</label>
                            <p className="text-gray-800">
                                {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;