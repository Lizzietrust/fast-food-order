import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Order from "./pages/Order"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import { getIsLoggedIn } from "./redux/slices/authSlice"

function App() {
  const loggedIn = useSelector(getIsLoggedIn)
  
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/cart-order" element={loggedIn ? <Order /> : <Navigate replace to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
