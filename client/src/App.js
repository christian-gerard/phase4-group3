import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Nav from './components/Nav'
import Footer from './components/Footer'


const App = () => {
  const { user } = useContext(UserContext)

  return (
		<main>
         <Nav />
         <Toaster position="top-center" containerClassName="toaster-style" />
         <Outlet context={{ user }} />
         <Footer />
		</main>
)}

export default App