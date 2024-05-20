import { useState } from 'react';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success('Successful login!')
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="py-10 md:w-3/5 mx-auto px-6 md:px-0">
        <Link to='/' className='flex items-center justify-center w-full'>
          <img src={logo} alt="" />
        </Link>

        <h1 className='font-bold md:text-[25px] text-xl text-center mt-10'>SIGN IN TO YOUR ACCOUNT</h1>

        <form className='my-10' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 mb-8'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Email</label>
              <input type="text" placeholder='example@mail.com' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='flex flex-col gap-4 mb-6'>
              <label htmlFor="" className='font-semibold text-lg text-[#878787]'>Password</label>
              <input type="password" placeholder='Password' className='w-full md:h-[84px] h-[60px] rounded-[10px] border border-[#878787] outline-none md:p-6 p-4 font-semibold md:text-[23px] text-xl text-[#878787]' required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="flex items-center justify-between mb-8">
              <div className='flex items-center gap-2'>
                  <input type="checkbox" name="" id="" className='md:w-[30px] md:h-[30px] w-5 h-5 border border-black rounded-[5px] cursor-pointer' />
                  <label htmlFor="" className='font-semibold md:text-[23px] text-[#000000D1]'>Keep me signed in</label>
              </div>

              <button className='font-semibold md:text-[23px] text-[#1F3FEBCC]'>
                  Reset Password
              </button>
          </div>

          <button type="submit" className='w-full md:h-[59px] h-10 rounded-[10px] bg-[#F31D1D] font-semibold md:text-[29px] text-white'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div className='font-semibold md:text-[23px] text-center'>
          <span>Dont have an account?</span>
          <Link to='/signup' className='text-[#4C66EF] ml-3'>Create one</Link>
        </div>
      </div>
    </>
  )
}

export default Login
