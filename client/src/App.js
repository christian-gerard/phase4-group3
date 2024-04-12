// import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
	

  const updateCurrentUser = (user) => setCurrentUser(user)

  // useEffect(() => {
  //   fetch("/me")
  //   .then(resp => {
  //     if (resp.ok) {
  //       resp.json().then(updateCurrentUser)
        
  //     } else {
  //       toast.error("Please log in")
  //     }
  //   })
  // }, []);

  return (
		<main>
      <Nav />
      <Outlet context={{ currentUser }}/>
      <h2>Test Colors</h2>
      <section>
        <div id='a' className='color-test' />
        <div id='b' className='color-test' />
        <div id='c' className='color-test' />
        <div id='d' className='color-test' />
        <div id='e' className='color-test' />
        <div id='f' className='color-test' />
        <div id='g' className='color-test' />
        <div id='h' className='color-test' />
      </section>
      <Footer />
		</main>
)}

export default App

