
interface UpdateRecipientModalProps {
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


const UpdateRecipientModal: React.FC<UpdateRecipientModalProps> = ({ close, inputValues, setInputValues }) => {

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
      <div className="md:w-[35%] h-[600px] bg-[#F9F2F2] rounded-[15px] py-6 px-4">
        <h1 className="text-center font-bold text-[30px] leading-[40.85px]">Update Recipient</h1>

        <form className='mt-10' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-4'>
              <label htmlFor="" className='text-lg text-[#878787]'>First Name</label>
              <input type="text" placeholder='First Name' className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] placeholder:text-black bg-transparent' required value={inputValues.firstName} name='firstName' onChange={handleChange} />
          </div>

          <div className='flex flex-col mb-4'>
              <label htmlFor="" className='text-lg text-[#878787]'>Last Name</label>
              <input type="text" placeholder='Last Name' className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] placeholder:text-black bg-transparent' required value={inputValues.lastName} name='lastName' onChange={handleChange} />
          </div>

          <div className='flex flex-col mb-4'>
              <label htmlFor="" className='text-lg text-[#878787]'>Email</label>
              <input type="text" placeholder='example@mail.com' className='w-full h-[56px] rounded-[10px] border border-[#878787] outline-none p-3 text-[15px] placeholder:text-black bg-transparent' required value={inputValues.email} name='email' onChange={handleChange} />
          </div>

          <div className='flex flex-col mb-12'>
              <label htmlFor="" className='text-lg text-[#878787]'>Phone Number</label>
              <div className='w-full h-[56px] rounded-[10px] border border-[#878787] flex'>
                <div className='h-full w-[84px] rounded-[10px] bg-[#B9B7B78F] text-[15px] flex items-center justify-center'>
                  +234
                </div>
                <input type="text" placeholder="818 000 0000" className='h-full w-full outline-none px-3 text-[15px] bg-transparent' required value={inputValues.phoneNum} name='phoneNum' onChange={handleChange} />
              </div>
          </div>

          <button type="submit" className='w-full h-[38px] rounded-[9px] bg-[#F31D1D] font-semibold text-white' >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateRecipientModal
