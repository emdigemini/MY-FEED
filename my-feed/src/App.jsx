import 'bootstrap-icons/font/bootstrap-icons.css';
import "@fontsource/montserrat"
import './Main.scss'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Startup } from './components/Startup'
import { HomePage } from './Pages/Homepage';

function App() {

  return (
    <>
      <Routes>
        <Route element={<Startup />} />
        <Route index element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
