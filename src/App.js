import { initializeApp } from "firebase/app";
import Header from "./components/Header";
import Game from "./components/Game";
import "./styles/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyB3iA1MMz_KohWoA85SptLz_vuzch9Fnwo",
  authDomain: "where-is-waldo-59262.firebaseapp.com",
  projectId: "where-is-waldo-59262",
  storageBucket: "where-is-waldo-59262.appspot.com",
  messagingSenderId: "846905820342",
  appId: "1:846905820342:web:6da2c9af23d5ead26c5217",
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <Header />
      <Game />
    </>
  );
}

export default App;
