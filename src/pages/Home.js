import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../firebaseAuth";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);
export const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="bg-sky-200 h-screen w-full flex flex-col items-center">
      <h1 className=" mt-24 font-bold text-gray-600 italic text-3xl">
        Welcome to Chat App
      </h1>
      {!user ? (
        <div className="flex flex-col">
          <Link to="/login">
            <button className="h-10 my-5 w-32 transition delay-150 hover:-translate-y-1 ease-in-out bg-blue-600  hover:bg-blue-700 hover:outline-none hover:ring hover:ring-blue-500 rounded-lg text-white font-bold italic underline">
              Login
            </button>
          </Link>
          <Link to="/sign-up">
            <button className="h-10 w-32 transition delay-150 hover:-translate-y-1 ease-in-out bg-blue-600  hover:bg-blue-700 hover:outline-none hover:ring hover:ring-blue-500 rounded-lg text-white font-bold italic underline">
              Sign Up!
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/chat">
          <button className="h-10 mt-5 w-32 transition delay-150 hover:-translate-y-1 ease-in-out bg-blue-600  hover:bg-blue-700 hover:outline-none hover:ring hover:ring-blue-500 rounded-lg text-white font-bold italic underline">
            Go to chats
          </button>
        </Link>
      )}
    </div>
  );
};
