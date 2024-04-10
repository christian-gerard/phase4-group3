import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

const App = () => {
	return (
		<div className='main'>
			<h1>Phase 4 - Group 3 &#128007;</h1><hr/>
      <ul>
        <li>Yume</li> | <li>Somni</li> | <li>Hypno</li> | <li>Nocturne</li> | <li>Lucidity</li> | <li>Rabbit Rabbit</li> | <li>Luna Something</li> |  <li>Aurora Something</li> | <li>Moonrise Something</li>
      </ul>
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
      <section className='tester'>
        <Nav />
        <Outlet />
        <Footer />
      </section>
		</div>
)}

export default App
