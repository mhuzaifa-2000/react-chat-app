module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/Login.js",
    "./src/pages/SignUp.js",
    "./src/pages/Home.js",
    "./src/pages/Chat.js",
    "./src/Navbar.js",
    "./src/Message.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
