// import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

const App = () => {

  return (
		<main>
      <Nav />
      {/* <Toaster /> */}
      <Outlet context={{ }}/>
      <Footer />
		</main>
)}

export default App