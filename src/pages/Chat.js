import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebaseAuth";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { orderBy, query } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { Message } from "../Message";
import { wait } from "@testing-library/user-event/dist/utils";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const auth = getAuth(firebaseApp);
const db = getFirestore();
export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, error, loading] = useAuthState(auth);
  const [value] = useCollection(
    collection(getFirestore(firebaseApp), "messages"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    let newMessages = [];
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        newMessages.push({
          id: doc.id,
          senderEmail: doc.data().userEmail,
          text: doc.data().text,
        });
      });
      setMessages(newMessages);
    });

    console.log(messages);
  }, [value]);
  const sendMessage = (e) => {
    e.preventDefault();
    addDoc(collection(db, "messages"), {
      userEmail: user.email,
      text: message,
      createdAt: serverTimestamp(),
    }).then(() => {
      console.log("Inserted");
    });
    setMessage("");
  };
  if (user) {
    console.log(user.email);
    return (
      <div className="flex w-full overflow-y-hidden">
        <div className="w-full">
          <div className="max-h-screen flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <div className="py-20"></div>
            {messages.map((msg) => {
              return (
                <Message email={msg.senderEmail} text={msg.text}></Message>
              );
            })}
          </div>
          <div className="w-full bg-slate-300 flex fixed bottom-0">
            <input
              className="bg-gray-200 ml-14 mr-4 w-3/4 focus:outline-none focus:ring focus:ring-gray-400 placeholder:text-gray-800 my-2 h-10 rounded-3xl px-4"
              placeholder="Type a message..."
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              type="text"
              sx={{
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={sendMessage}
            >
              <SendIcon
                sx={{
                  margin: "auto",
                  color: "gray",
                  fontSize: "30px",
                }}
              ></SendIcon>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};
