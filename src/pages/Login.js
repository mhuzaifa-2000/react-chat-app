import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { firebaseApp } from "../firebaseAuth";
import { Navigate } from "react-router-dom";
import "../Login.css";
const auth = getAuth(firebaseApp);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
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
        <button
          className="h-10 my-5 w-32 transition delay-150 hover:-translate-y-1 ease-in-out bg-blue-600  hover:bg-blue-700 hover:outline-none hover:ring hover:ring-blue-500 rounded-lg text-white font-bold italic underline"
          onClick={(e) => {
            e.preventDefault();
            signInWithEmailAndPassword(email, password);
          }}
          type="submit"
        >
          Login!
        </button>
        {loading ? <div className="loader">asd</div> : false}
      </form>

      {user ? <Navigate to="/chat"></Navigate> : false}
      {error ? console.log(error.code) : false}
    </div>
  );
};
