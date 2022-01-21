import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "./firebaseAuth";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);
export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav class="flex items-center justify-between flex-wrap bg-blue-800 px-10 py-2 shadow-xl">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <Button
            // size="large"
            sx={{
              height: "60px",
              width: "50px",
              borderRadius: "50%",
            }}
            variant="text"
          >
            <HomeIcon
              sx={{
                fontSize: "40px",
                color: "white",
              }}
            ></HomeIcon>
          </Button>
        </Link>
      </div>
      <div class="flex-grow flex items-center w-auto">
        <div class="text-sm flex-grow"></div>
        {user ? (
          <Button
            onClick={() => signOut(auth)}
            size="large"
            sx={{
              color: "white",
              paddingX: "20px",
            }}
          >
            Log out
          </Button>
        ) : (
          <div>
            <Link to="/login">
              <Button
                size="large"
                sx={{
                  color: "white",
                  paddingX: "20px",
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="sign-up">
              <Button
                size="large"
                sx={{
                  color: "white",
                  paddingX: "20px",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
