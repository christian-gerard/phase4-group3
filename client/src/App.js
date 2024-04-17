// import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

const App = () => {


  return (
		<main>
      <Nav />
      <Outlet context={{ }}/>
      <Footer />
		</main>
)}

export default App