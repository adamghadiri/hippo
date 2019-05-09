import firebase from "firebase/app";
import "firebase/database";

const config = {
  databaseURL: "https://hacker-news.firebaseio.com/"
};

firebase.initializeApp(config);
const database = firebase.database();

export { database };
