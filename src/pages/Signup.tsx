import { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { 
            // firstName,
            // lastName,
            email,
            // phoneNum,
            password,
            confirmPassword 
          } = inputValues;

    console.log(inputValues);
    if(password !== confirmPassword) {
        toast.error('Passwords do not match');
    }
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('USER:', user);
      setLoading(false);
      toast.success('Successful registration!')
      navigate('/login');
    })
    .catch((error) => {
      toast.error(error.message)
      setLoading(false);
    });
  };


  return (
    <>
      <div className="py-10 md:w-3/5 mx-auto px-6 md:px-0">
        <Link to='/' className='flex items-center justify-center w-full'>
          <img src={logo} alt="" />
        </Link>

        <h1 className='font-bold md:text-[25px] text-xl text-center mt-10'>CREATE YOUR ACCOUNT</h1>

        <form className='my-10' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 mb-8'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>First Name</label>
              <input type="text" placeholder='First Name' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={inputValues.firstName} name='firstName' onChange={handleChange} />
          </div>

          <div className='flex flex-col gap-4 mb-8'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Last Name</label>
              <input type="text" placeholder='Last Name' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={inputValues.lastName} name='lastName' onChange={handleChange} />
          </div>

          <div className='flex flex-col gap-4 mb-8'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Email</label>
              <input type="text" placeholder='example@mail.com' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={inputValues.email} name='email' onChange={handleChange} />
          </div>

          <div className='flex flex-col gap-4 mb-8'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Phone Number</label>
              <div className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] flex'>
                <div className='h-full w-[84px] rounded-[10px] bg-[#B9B7B78F] font-bold md:text-[26px] text-xl flex items-center justify-center'>
                  +234
                </div>
                <input type="text" className='h-full w-full outline-none px-6' required value={inputValues.phoneNum} name='phoneNum' onChange={handleChange} />
              </div>
          </div>

          <div className='flex flex-col gap-4 mb-6'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Password (8 minimum characters)</label>
              <input type="password" placeholder='Password' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={inputValues.password} name='password' onChange={handleChange} />
          </div>

          <div className='flex flex-col gap-4 mb-6'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Confirm Password</label>
              <input type="password" placeholder='Password' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={inputValues.confirmPassword} name='confirmPassword' onChange={handleChange} />
          </div>

          <div className="flex items-center justify-between mb-8">
              <div className='flex items-center gap-2'>
                  <input type="checkbox" name="" id="" className='w-[30px] h-[30px] border border-black rounded-[5px] cursor-pointer' />
                  <label htmlFor="" className='font-semibold md:text-[23px] text-xl text-[#000000D1]'>Keep me signed in</label>
              </div>
          </div>

          <button type="submit" className='w-full md:h-[59px] h-10 rounded-[10px] bg-[#F31D1D] font-semibold md:text-[29px] text-white'>
            {loading ? 'Loading...' : 'Create account'}
          </button>
        </form>

        <div className='font-semibold md:text-[23px] text-center mb-8'>
          <span>Have an account?</span>
          <Link to='/login' className='text-[#4C66EF] ml-3'>Sign In</Link>
        </div>

        <div className='md:text-[23px] md:leading-[31.32px] text-center mb-6'>
          By Creating your Quickmunch account, you agree to the 
          <span className='text-[#6279F1]'> Terms of use </span> 
          and 
          <span className='text-[#6279F1]'> Privacy Policy</span>
        </div>
      </div>
    </>
  )
}

export default Signup
