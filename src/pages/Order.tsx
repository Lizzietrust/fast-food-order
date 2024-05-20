import { useDispatch, useSelector } from "react-redux";
import bin from '../assets/bin.png'
import minus from '../assets/minus.png'
import plus from '../assets/plus.png'
import { decreaseQuantity, increaseQuantity, removeFromCart, resetCart } from "../redux/slices/itemSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getIsLoggedIn } from "../redux/slices/authSlice";
import UpdateRecipientModal from "../components/UpdateRecipientModal";
import AddAddressModal from "../components/AddAddressModal";


const Order = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [recipientModal, setRecipientModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    city: '',
    houseNum: '',
    street: ''
  });

  console.log('VALUESDATA:', inputValues);
    
  interface InitialState {
    products: {
      id: number;
      quantity: number;
      image: string;
      price: number;
      name: string;
    }[];
  }

  const dispatch = useDispatch()
  const loggedIn = useSelector(getIsLoggedIn);
  console.log('logged', loggedIn);
  const [pay, setPay] = useState(false);

  const cartProducts = useSelector((state: { item: InitialState }) => state.item.products);

  const delCharge = 0;
  const discount = 0;

  useEffect(() => {
    let price = 0;
    cartProducts.map((item) => {
      price += item.price * item.quantity;
      return price;
    })
    setTotalAmount(price);
    
  }, [cartProducts])

  const placeOrder = () => {
    const { firstName, lastName, email, phoneNum, city, houseNum, street } = inputValues;
    const completeData = firstName !== '' && lastName !== '' && email !== '' && phoneNum !== '' && city !== '' && houseNum !== '' && street !== '';
    if (completeData) {
      setPay(true);
      toast.success('Orders successfully placed!')
      dispatch(resetCart());
    } else {
      toast.error('fill in all form fields!')
    }
  }

  return (
    <>
      <div className='w-[90%] mx-auto mb-12 pt-40 md:flex gap-6'>
        <div className="md:w-[55%] md:h-[413px] h-[450px] rounded-[10px] border border-[#AAAAAA66] p-4 mb-6 md:mb-0">
          <div className="border-b border-[#AAAAAA] pb-4">
            <h2 className="font-bold text-[25px] mb-5">Review and place order </h2>
            <p className="text-sm">Review / Add address and fulfill payments to complete your purchase   </p>
          </div>

          <div className="py-4 border-b border-[#AAAAAA]">
            <p className="font-semibold text-xl mb-3">Recipient information</p>
            <button className="md:w-[270px] w-full h-[38px] rounded-[7px] bg-black text-white" onClick={() => setRecipientModal(true)}>Add Recipient</button>
          </div>

          <div className="py-4 border-b border-[#AAAAAA]">
            <p className="font-semibold text-xl mb-3">Delivery Address</p>
            <button className="md:w-[270px] w-full h-[38px] rounded-[7px] bg-black text-white" onClick={() => setAddressModal(true)}>Add Delivery Address</button>
          </div>

          <button className="w-full h-[38px] rounded-[7px] bg-[#0C982B] font-semibold text-sm text-white mt-7" onClick={placeOrder}>Place Your Order</button>
        </div>

        <div className="md:w-[45%] h-[395px] rounded-[10px] border border-[#AAAAAA66]">
          <div className="font-bold p-3 border-b border-[#AAAAAA]">Your order from</div>

          <div className="overflow-y-auto overflow-x-hidden h-[40%] hidden_scroll border-b border-[#AAAAAA]">
            {cartProducts.length === 0 ? (
              <div className="font-bold text-2xl text-center flex items-center justify-center w-full h-full">Your Cart is empty</div>
            ) : (
              <div>
                {cartProducts.map((item) => (
                  <div key={item.id} className="p-3">
                    <div className="flex pl-4 items-center justify-between">
                      <p className="font-bold text-[#F31D1D]">{item.name}</p>
                      <div className="flex items-center md:gap-10 gap-2">
                        <img src={bin} alt="" className="cursor-pointer" onClick={() => dispatch(removeFromCart(item.id)) &&
                                toast.error(`${item.name} has been removed from cart`)} />
                        <p className="font-bold text-sm text-[#878787]">
                          <span className="md:block hidden">N </span>
                          {item.quantity * item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-[123.03px] h-[31px] rounded-[5px] p-1 bg-[#E1BABABF] items-center justify-between">
                        <button className="w-6 h-6 rounded-[5px] bg-[#FFFFFFA1] font-bold text-[#F31D1D] flex items-center justify-center" onClick={() => dispatch(decreaseQuantity({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: 1
                        }))}>
                            <img src={minus} alt="" />
                        </button>

                        <span className="text-[23px]">{item.quantity}</span>

                        <button className="w-6 h-6 rounded-[5px] bg-[#FFFFFFA1] font-bold text-[#F31D1D] flex items-center justify-center" onClick={() => dispatch(increaseQuantity({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: 1
                        }))}>
                            <img src={plus} alt="" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-b border-[#AAAAAA]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-[#C6C3C3]">Items total:</span>
              <span className="font-bold text-sm text-[#C6C3C3]">N {totalAmount}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-[#C6C3C3]">Discount:</span>
              <span className="font-bold text-sm text-[#C6C3C3]">N {discount}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-[#C6C3C3]">Delivery Charge:</span>
              <span className="font-bold text-sm text-[#C6C3C3]">N {delCharge}.0</span>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between font-semibold text-sm">
            <span>Total:</span>
            <span>N {totalAmount + delCharge - discount}</span>
          </div>
        </div>
      </div>
      {recipientModal && (
        <UpdateRecipientModal 
        close={() => setRecipientModal(false)}
        inputValues={inputValues}
        setInputValues={setInputValues}
        />
      )}

      {addressModal && (
        <AddAddressModal
        close={() => setAddressModal(false)}
        inputValues={inputValues}
        setInputValues={setInputValues}
        />
      )}
    </>
  )
}

export default Order
 