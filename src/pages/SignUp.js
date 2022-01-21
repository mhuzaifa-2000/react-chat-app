import React from "react";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { firebaseApp } from "../firebaseAuth";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
const auth = getAuth(firebaseApp);

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Passwords don't match");
    } else {
      createUserWithEmailAndPassword(email, password).then(() => {
        if (error) {
          console.log(error.code);
          //auth/email-already-in-use
          //auth/weak-password
          if (error.code === "auth/email-already-in-use") {
            setMessage("Email already is use");
          } else if (error.code === "auth/weak-password") {
            setMessage("Weak Password, Set a new one");
          }
        }
      });
    }
  };
  return (
    <div className="bg-sky-200 h-screen w-full flex flex-col items-center">
      <form className="bg-sky-300 w-full max-w-sm rounded-xl shadow-lg flex flex-col items-center p-8">
        <label
          className="block mt-5 font-medium text-xl text-gray-600 w-full"
          htmlFor="email"
        >
          Email:
          <input
            className="block rounded-lg focus:outline-none border-2 mt-2 h-10 w-full px-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </label>

        <label
          className="block mt-3 font-medium text-xl text-gray-600 w-full"
          htmlFor="password"
        >
          Password:
          <input
            className="block rounded-lg focus:outline-none border-2 mt-2 h-10 w-full px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </label>
        <label
          className="block mt-3 font-medium text-xl text-gray-600 w-full"
          htmlFor="confirm-password"
        >
          Confirm Password:
          <input
            className="block rounded-lg focus:outline-none border-2 mt-2 h-10 w-full px-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm-password"
            id="confirm-password"
          />
        </label>
        <div>
          <p className="text-red-500 font-medium italic">
            {user ? <Navigate to="/chat"></Navigate> : false}
            {message}
          </p>
        </div>
        <button
          type="submit"
          className="h-10 my-5 w-32 transition delay-150 hover:-translate-y-1 ease-in-out bg-blue-600  hover:bg-blue-700 hover:outline-none hover:ring hover:ring-blue-500 rounded-lg text-white font-bold italic underline"
          onClick={handleClick}
        >
          Sign Up!
        </button>
      </form>
    </div>
  );
};
