import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import('preline')
import 'swiper/css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBarWrapper from './components/Navbar/NavBarWrapper';
import Home from './pages/Home'
import Restaurant from './pages/Restaurant';
import Food from './pages/Food';
import Checkout from './pages/Checkout';
import Login from './pages/Login';

import { createContext, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admins from './pages/Admins';
import svgLoader from "/assets/svgs/initialLoading.svg"
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental"
import { persistQueryClient } from "react-query/persistQueryClient-experimental"

let userContext = createContext(null)
let modalContext = createContext(null)

const expireAfter = 60000 * 10

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: expireAfter,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
      retryDelay: 3000
    }
  }
})


const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
})

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})


function App() {
  const [users, setUser] = useState({ firebaseUser: {}, DBUser: {}, userCart: 0, queryN: 18 })
  const [overflowToggle, setOverflowToggle] = useState(true);


  const [hidden, setHidden] = useState(true)
  const [classesOfLoader, setClassesOfLoader] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setClassesOfLoader('scale-150 opacity-0')
      setHidden(false)
      setTimeout(() => {
        setClassesOfLoader('hidden')
      }, 2000);
    }, 2000);
  }, [])

  return (

    <modalContext.Provider value={[overflowToggle, setOverflowToggle]} >
      <userContext.Provider value={{ users, setUser }} >
        <QueryClientProvider client={queryClient}>
          <div className={` font-font font-thin min-h-screen  bg-background text-[#00FFFF] ${(hidden || !overflowToggle) && "overflow-hidden h-screen "}`} >

            
            <div className={`fixed inset-0 z-[200] text-white bg-background bg-opacity-75 h-[100vh] backdrop-blur-2xl 
          flex items-center justify-center transition-all duration-[1000ms] ${classesOfLoader}`}  >
              <embed className='opacity-70 lg:scale-150  scale-100 msm:scale-75' src={svgLoader} />
            </div>

            <Router>
              <NavBarWrapper />
              <Routes preventScrollReset={false} >
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />

                {/* dynamics */}
                <Route path='restaurant/:restaurantId' element={<Restaurant />} />
                <Route path='foods/:foodId' element={<Food />} />
                <Route path='checkout/:checkoutType' element={<Checkout />} />

                {/* protected routs */}
                <Route path='/admins' element={<Admins />} />

              </Routes>
            </Router>

            <ToastContainer />
          </div>
        </QueryClientProvider>
      </userContext.Provider>
    </modalContext.Provider>
  )
}
export { userContext, modalContext };
export default App

// let value = useContext(userContext);