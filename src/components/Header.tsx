import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from '../assets/logo.png'
import login from '../assets/login.png'
import signup from '../assets/signup.png'
import locationIcon from '../assets/location-icon.png'
import productsIcon from '../assets/products-icon.png'
import userIcon from '../assets/user-icon.png'
import downIcon from '../assets/down-icon.png'
import cartIcon from '../assets/cart-icon.png'
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, getIsLoggedIn } from "../redux/slices/authSlice"
import bin from '../assets/bin.png'
import { removeFromCart } from "../redux/slices/itemSlice"


const Header = () => {
  const [modal, setModal] = useState(false);
  const [cartmodal, setCartModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  interface InitialState {
    products: {
      id: number;
      quantity: number;
      image: string;
      price: number;
      name: string;
    }[];
  }

  const loggedIn = useSelector(getIsLoggedIn)
  const cartProducts = useSelector((state: { item: InitialState }) => state.item.products)

  console.log('Cart', cartProducts);
  
  const handleModal = () => {
    setModal(!modal)
  }

  const handleCartModal = () => {
    setCartModal(!cartmodal)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        
        const uid = user.uid;
        dispatch(SET_ACTIVE_USER({
          isLoggedIn: true,
          email: user.email,
          username: null,
          userId: uid,
        }))
      } else {
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, []);

  useEffect(() => {
    let price = 0;
    cartProducts.map((item) => {
      price += item.price * item.quantity;
      return price;
    })
    setTotalAmount(price);
    
  }, [cartProducts])

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success('Sign-out successful.')
      navigate('/login')
    }).catch((error) => {
      console.log(error);
      toast.error(error.message);
    });
  }

  const showCheckout = () => {
    setCartModal(false);
    if(loggedIn) {
      navigate('/cart-order')
    } else {
      toast.error('Login or register to complete purchase')
    }
  }

  return (
    <>
      {((pathname !== '/login') && (pathname !== '/signup')) && (
        <div className='md:w-[90%] w-full mx-auto flex items-center justify-between fixed top-0 md:left-[5%] left-0 h-28 z-50 bg-white px-4 md:px-0'>
          <div className="flex items-center gap-10">
            <Link to='/'>
                <img src={logo} alt="" className="md:w-auto md:h-auto w-[41.54px] h-[48.35px] object-cover" />
            </Link>
            <div className="md:flex hidden items-center gap-6">
                <img src={locationIcon} alt="" />
                <span className="font-semibold text-2xl text-[#F31D1D]">Lagos, Nigeria</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
                <img src={productsIcon} alt="" />
                <span className="font-semibold text-lg text-[#F31D1D] hidden md:block">All Products </span>
            </div>

            <div className="md:flex items-center gap-2 hidden">
                <img src={userIcon} alt="" />
                
                {!loggedIn ? (<div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
                    <span className="font-bold text-lg text-[#00000078]">Hi,Guests</span>
                    <img src={downIcon} alt="" />
                </div>) : (
                  <button onClick={logoutUser}>Logout</button>
                )}
            </div>

            <img src={userIcon} alt="" className="md:hidden cursor-pointer" onClick={handleModal} />
            
            <div className="relative cursor-pointer" onClick={handleCartModal}>
                <img src={cartIcon} alt="" />
                <div className="absolute w-[17.24px] h-5 bg-[#A30F0FDB] rounded-full font-bold text-xs text-white flex items-center justify-center -top-1 -right-2">
                  {cartProducts.length}
                </div>
            </div>
          </div>

          {modal && (
            <div className="absolute top-24 right-0 md:w-[292px] w-full h-[180px] rounded-[15px] bg-white shadow-xl py-5">
              <Link to='/login' className="flex items-center w-[250px] h-10 rounded-[10px] bg-[#294BFA] mx-auto px-4 mb-3" onClick={() => setModal(false)}>
                <img src={login} alt="" />
                <div className="flex items-center justify-center w-[90%]">
                  <span className="text-white font-semibold text-[25px]">Login</span>
                </div>
              </Link>
              <Link to='/signup' className="flex items-center w-[250px] h-10 rounded-[10px] border border-[#F31D1D] mx-auto px-4" onClick={() => setModal(false)}>
                <img src={signup} alt="" />
                <div className="flex items-center justify-center w-[90%]">
                  <span className="text-[#F31D1D] font-semibold text-[25px]">SignUp</span>
                </div>
              </Link>
              <button onClick={logoutUser} className="md-hidden w-full h-10 pt-4 text-xl">Logout</button>
            </div>
          )}

          {cartmodal && (
            <div className="absolute top-24 right-0 w-full md:w-auto">
              {cartProducts.length === 0 ? (
                <div className="w-full md:w-[401px] p-4 bg-white shadow-xl font-bold text-2xl rounded-[15px] text-center">Your Cart is empty</div>
              ) : (
                <div className="w-full md:w-[401px] h-[400px] rounded-[15px] bg-white shadow-xl p-4">
                  <h1 className="font-bold text-[25px] pb-3 border-b-2 border-[#8787879C]">Your Order</h1>
  
                  <div className="overflow-y-auto overflow-x-hidden h-1/2 hidden_scroll">
                    {cartProducts.map((item) => (
                      <div key={item.id} className='flex items-center justify-between border-b-2 border-[#8787879C] py-3'>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[20.59px] text-[#C6C3C3]">{item.quantity}</span>
                          <p className="font-bold text-[17px] text-[#F31D1D]">{item.name}</p>
                        </div>
    
                        <div className="flex items-center gap-2">
                          <img src={bin} alt="" className="cursor-pointer" onClick={() => dispatch(removeFromCart(item.id)) &&
                              toast.error(`${item.name} has been removed from cart`)} />
                          <span className="font-bold text-[17px] text-[#C6C3C3]">{item.quantity * item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
  
                  <div className="flex items-center justify-between py-3 border-b-2 border-[#8787879C]">
                    <p className="font-bold text-[20.59px] text-[#878787]">items SubTotal</p>
                    <p className="font-bold text-[20.59px] text-[#878787]">
                      <span>N </span>
                      {totalAmount}
                    </p>
                  </div>
    
                  <button className="w-full h-[58px] rounded-[10px] bg-[#0C982B] mt-4 font-semibold text-[25px] text-white flex items-center justify-center" onClick={showCheckout}>
                      Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Header
