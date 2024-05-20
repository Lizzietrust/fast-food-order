
interface AddAddressModalProps {
    close: () => void;
    inputValues: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNum: string;
      city: string;
      houseNum: string;
      street: string;
    };
    setInputValues: React.Dispatch<React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      phoneNum: string;
      city: string;
      houseNum: string;
      street: string;
    }>>;
}


const AddAddressModal: React.FC<AddAddressModalProps> = ({ close, inputValues, setInputValues }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('VALUES:', inputValues);
        close();
    }

  return (
    <div className='fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
      <div className="md:w-[35%] w-[90%] h-[500px] bg-[#F9F2F2] rounded-[15px] py-6 px-4">
        <h1 className="text-center font-bold text-[30px] leading-[40.85px]">Add Address</h1>

        <form className='mt-10' onSubmit={handleSubmit}>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='text-lg text-[#878787]'>Select City</label>
                <input type="text" className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] bg-transparent' required value={inputValues.city} name='city' onChange={handleChange} />
            </div>

            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='text-lg text-[#878787]'>House number</label>
                <input type="text" className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] bg-transparent' required value={inputValues.houseNum} name='houseNum' onChange={handleChange} />
            </div>

            <div className='flex flex-col mb-12'>
                <label htmlFor="" className='text-lg text-[#878787]'>Street</label>
                <input type="text" className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] bg-transparent' required value={inputValues.street} name='street' onChange={handleChange} />
            </div>

            <button type="submit" className='w-full h-[38px] rounded-[9px] bg-[#F31D1D] font-semibold text-white' >
             Use this address
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAddressModal
