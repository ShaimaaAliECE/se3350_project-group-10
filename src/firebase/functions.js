import db from "../index.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

//Push to Database Level X collection: time, attemps, livesLeft
export function AppendDatabase(algo, lvl, attempts, time, lives) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = algo + "_" + lvl;
    (async function () {
      try {
        setLoading(true);
        const documentRef = await addDoc(collection(db, query), {
          time: time,
          attemps: attempts,
          livesLeft: lives,
        });
        setData(documentRef);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [algo, attempts, lives, lvl, time]);

  return { data, loading, error };
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
