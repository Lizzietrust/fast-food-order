import React, { useState } from "react";
import naira from '../assets/naira.png'
import minus from '../assets/minus.png'
import plus from '../assets/plus.png'
import plusicon from '../assets/plus-icon.png'
import cheese from '../assets/cheese.png'
import onion from '../assets/onion.png'
import cabbage from '../assets/cabbage.png'
import bread from '../assets/bread.png'
import egg from '../assets/egg.png'
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/slices/itemSlice";
import { toast } from "react-toastify";

interface ProductProps {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number
  };
}


const Product: React.FC<ProductProps> = ({ item }) => {
  const [itemQuantity, setItemQuantity] = useState(1)
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[504px] border border-[#0000002B] rounded-[10px] bg-[#FFFFFFF5]">
      <div className="relative w-full h-[248px] rounded-[10px] object-cover">
        <img src={item.image} alt="" className="w-full h-full" />
      </div>

      <div className="py-4 px-2">
        <p className="font-semibold text-[11px] text-[#000000DB] mb-5">{item.name}</p>

        <div className="flex items-center justify-between mb-6">
            <div>
                <span className="text-[11px] text-[#878787]">Total Price</span>
                <div className="flex items-center gap-2">
                    <img src={naira} alt="" />
                    <span className="font-semibold text-[17px]">{item.price}</span>
                </div>
            </div>

            <div className="flex w-[123.03px] h-[31px] rounded-[5px] p-1 bg-[#E1BABABF] items-center justify-between">
                <button className="w-6 h-6 rounded-[5px] bg-[#FFFFFFA1] font-bold text-[#F31D1D] flex items-center justify-center" 
                onClick={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
                // onClick={() => dispatch(decreaseQuantity({
                //   id: item.id,
                //   name: item.name,
                //   image: item.image,
                //   price: item.price,
                //   quantity: 1
                // }))}
                >
                    <img src={minus} alt="" />
                </button>

                <span className="text-[23px]">{itemQuantity}</span>

                <button className="w-6 h-6 rounded-[5px] bg-[#FFFFFFA1] font-bold text-[#F31D1D] flex items-center justify-center" 
                onClick={() => setItemQuantity(itemQuantity + 1)}
                // onClick={() => dispatch(increaseQuantity({
                //   id: item.id,
                //   name: item.name,
                //   image: item.image,
                //   price: item.price,
                //   quantity: 1
                // }))}
                >
                    <img src={plus} alt="" />
                </button>
            </div>
        </div>

        <div className="flex items-center justify-between mb-6">
            <img src={cheese} alt="" />
            <img src={onion} alt="" />
            <img src={cabbage} alt="" />
            <img src={bread} alt="" />
            <img src={egg} alt="" />
        </div>

        <button className="w-full h-[43px] rounded-[10px] bg-[#F31D1D] flex items-center gap-8 justify-center" onClick= {() => dispatch(addToCart({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          quantity: itemQuantity
        })) &&
        toast.success(`${item.name} is added to cart`)
        }
        >
            <img src={plusicon} alt="" />
            <span className="font-semibold text-2xl text-white">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Product;
