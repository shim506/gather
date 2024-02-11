import React, { useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DevPage from './dev/Dev'
import FirestoreCRUDPage from './firestore-crud/FirestoreCRUD'
import HomePage from './home/Home'
import firebaseConfigJson from 'env.json';


/** @jsxImportSource @emotion/react */
function App() {

  //TODO(JUN): script 를 통해 생성된 파일 참조하는 것으로 수정 예정
  const firebaseConfig = {
    apiKey: firebaseConfigJson.REACT_APP_API_KEY,
    authDomain: firebaseConfigJson.REACT_APP_AUTH_DOMAIN,
    databaseURL: firebaseConfigJson.REACT_APP_DATABASE_URL,
    projectId: firebaseConfigJson.REACT_APP_PROJECT_ID,
    storageBucket: firebaseConfigJson.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: firebaseConfigJson.REACT_APP_MESSAGIN_ID,
    appId: firebaseConfigJson.REACT_APP_ID,
    measurementId: firebaseConfigJson.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const [fruits, setFruits] = useState('')

  async function getFruits() {
    const fruitsCollection = collection(db, 'fruits')
    const docRef = doc(fruitsCollection, '키위')
    const querySnapshot = await getDoc(docRef)
    return querySnapshot.data()
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getFruits()
      setFruits(data?.color)
    }

    fetchData()
  }, [getFruits])

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a>
            [Header] gather 앱 만들 준비 되셨나요?
          </a>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/firestore-crud" element={<FirestoreCRUDPage />}></Route>
              <Route path="/dev" element={<DevPage />}></Route>
            </Routes>
          </main>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
