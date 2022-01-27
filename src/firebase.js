import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3iA1MMz_KohWoA85SptLz_vuzch9Fnwo",
  authDomain: "where-is-waldo-59262.firebaseapp.com",
  projectId: "where-is-waldo-59262",
  storageBucket: "where-is-waldo-59262.appspot.com",
  messagingSenderId: "846905820342",
  appId: "1:846905820342:web:6da2c9af23d5ead26c5217",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const charactersCollection = collection(db, "characters");
const usersCollection = collection(db, "users");

const fetchCharacters = () => {
  let characters = [];

  getDocs(charactersCollection)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // Object.defineProperty(characters, doc.id, { value: doc.data() });
        characters.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => console.log(err.message));

  return characters;
};

const addTime = (seconds, minutes, hours) => {
  const timeInSeconds = seconds + minutes * 60 + hours * 3600;

  const username = () => {
    const name = prompt("Please enter your name (max 6 characters)");

    if (name.length <= 6) {
      return name;
    } else {
      alert("Please choose a name with only up to 6 characters");
      username();
    }
  };

  addDoc(usersCollection, {
    name: username(),
    time: timeInSeconds,
  });
};

const getTopScores = () => {
  let scores = [];

  getDocs(usersCollection).then((snapshot) => {
    snapshot.docs.forEach((doc) => scores.push({ ...doc.data() }));
    scores.sort((a, b) => a.time - b.time);
  });

  return scores;
};

export { fetchCharacters, addTime, getTopScores };
