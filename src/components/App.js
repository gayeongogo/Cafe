import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import AppShell from "./AppShell";
import Home from "./Home";
import Recode from "./Recode";
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


export default function App() {
  const [test, setTest] = useState({name: '', location: ''})
  // async - await로 데이터 fetch 대기
  async function getTest() {
    // document에 대한 참조 생성
    const docRef = doc(db, "items", "1");
    // 참조에 대한 Snapshot 쿼리
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setTest({
        name: data.name,
        location: data.location
      });
    }
  };
  // 최초 마운트 시에 getTest import
  useEffect(() => {
    getTest()
  }, [])
  return (
    <div>
      {test !== undefined &&
        <div>
          <p>{test.name}</p>
          <p>{test.location}</p>
        </div>
      }
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recode" element={<Recode />}></Route>
      </Routes>
      {/* <AppShell/> */}
    </div>
  )
}
