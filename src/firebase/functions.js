import db from "../index.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

//Push to Database Level X collection: time, attemps, livesLeft
export function AppendDatabase(algo, lvl, attempts, time, lives) {
  let query = algo + "_" + lvl;
  (async function () {
    try {
      const documentRef = await addDoc(collection(db, query), {
        time: parseInt(time),
        attempts: parseInt(attempts),
        livesLeft: parseInt(lives),
      });
    } catch (e) {
      console.log(e);
    }
  })();
}
//Read from Database --> Return set of data for respective level and algorithm
export default function FetchLevel(algo, lvl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = algo + "_" + lvl;
    (async function () {
      try {
        setLoading(true);
        const data = [];
        const querySnapshot = await getDocs(collection(db, query));

        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [algo, lvl]);

  return { data, loading, error };
}

//Read from Database --> Get Average times, attemps, livesLeft for respective Level
export function GetAverages(algo, lvl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = algo + "_" + lvl;
    let avgTime = 0,
      avgLives = 0,
      avgAttempts = 0;
    let count = 1;
    (async function () {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, query));
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          avgTime += data.time;
          avgLives += data.livesLeft;
          avgAttempts += data.attempts;
          count++;
        });
        setData({
          time: avgTime / count,
          livesLeft: avgLives / count,
          attempts: avgAttempts / count,
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [algo, lvl]);

  return { data, loading, error };
}

//Fetch all level stats
export function FetchAllLevels(algo, lvls) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const data = [];
        for (let i = 0; i < lvls; i++) {
          let query = algo + "_" + (i + 1);
          let temp = [];
          const querySnapshot = await getDocs(collection(db, query));
          querySnapshot.forEach((doc) => {
            temp.push(doc.data());
          });
          data.push(temp);
        }
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [algo, lvls]);

  return { data, loading, error };
}
