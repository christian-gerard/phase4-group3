import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

const App = () => {

	return (
		<main>
      <Nav />
      <Outlet context={{  }}/>
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
