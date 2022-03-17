import db from "../index.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import state from "../store/Store.js";
//upload a time to the algo level
export async function uploadTime(time, algo, level) {
  const collec = algo + "_" + level;
  try {
    const documentRef = await addDoc(collection(db, collec), { time: time });
    console.log("Document Written To: ", documentRef.id);
  } catch (e) {
    console.log(e);
  }
}

//Get all user times for a given algorhythm
export async function getLevelTimes(algo, level) {
  const collec = algo + "_" + level;
  const querySnapshot = await getDocs(collection(db, collec));
  let times = [];
  querySnapshot.forEach((doc) => {
    let document = doc.data();
    times.push(document.time);
  });
  return times;
}

//Get the average time of all users for an algo level
export async function getLevelAverageTime(algo, level) {
  const collec = algo + "_" + level;
  const querySnapshot = await getDocs(collection(db, collec));
  let avg = 0;
  let count = 0;
  querySnapshot.forEach((doc) => {
    let document = doc.data();
    avg += document.time;
    count++;
  });

  avg /= count;
  state.lvlAvgTime = avg;
}
