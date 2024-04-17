import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from './context/UserContext'
import Nav from './components/Nav'
import Footer from './components/Footer'

const App = () => {
  const { user } = useContext(UserContext)
  const redirect = useNavigate()

  return (
		<main>
         <Nav />
         <Toaster position="top-center" containerClassName="toaster-style" />
         {/* {user ? ( */}
              <Outlet context={{ user }} />
         {/* ) : (  */}
          {/* redirect('/') */}
         {/* )} */}
         <Footer />
		</main>
)}

export default App