import questionIcon from '../assets/question-icon.png'
import securedIcon from '../assets/secured-icon.png'
import appStore from '../assets/app-store.png'
import googlePlay from '../assets/google-play.png'
import facebook from '../assets/facebook.png'
import twitter from '../assets/twitter.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'
import cicon from '../assets/cicon.png'
import { useLocation } from "react-router-dom"

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {((pathname !== '/login') && (pathname !== '/signup')) && (
        <div className="w-full">
          <div className="w-full bg-black">
            <div className="md:w-[90%] mx-auto py-10 flex items-center flex-col md:block w-full">
              <div className="flex md:flex-row flex-col md:justify-between gap-12 md:gap-0 mb-10 md:items-start">
                <div className="flex md:flex-row flex-col-reverse items-center md:gap-16 gap-8">
                  <div className="flex md:flex-row flex-col items-center gap-1">
                    <img src={questionIcon} alt="" />
                    <div className='flex md:flex-col gap-4 md:gap-0 items-center'>
                      <span className='font-bold text-[25.49px] text-white'>24/7</span>
                      <span className='font-bold text-[14.49px] text-white'>Support</span>
                    </div>
                  </div>

                  <div className="flex md:flex-row flex-col items-center gap-1">
                    <img src={securedIcon} alt="" />
                    <div className='flex flex-col items-center'>
                      <span className='font-bold text-[25.49px] text-white'>100%</span>
                      <span className='font-bold text-[14.49px] text-white'>Payment Secured</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-row flex-col gap-4 w-full md:w-auto items-center">
                  <img src={appStore} alt="" className='w-[142px] h-10 md:w-auto md:h-auto' />
                  <img src={googlePlay} alt="" className='w-[142px] h-10 md:w-auto md:h-auto' />
                </div>
              </div>

              <div className='mb-8 md:block flex flex-col items-center'>
                <p className='font-bold text-[19.49px] text-white mb-4'>Need Help</p>
                <p className='text-white text-[9.49px] font-bold gap-3 flex cursor-pointer md:mb-2 mb-4'>
                    <span className='underline'>+234 907 466 6655</span>
                    <span>or</span>
                </p>
                <span className='text-white text-[9.49px] font-bold underline cursor-pointer mb-2'>help@jazzysburger.com</span>
              </div>

              <div className='md:block flex items-center flex-col gap-3'>
                <p className='text-white text-[19.49px] mb-4'>FOLLOW US</p>
                <div className="flex items-center gap-3">
                  <img src={facebook} alt="" className='cursor-pointer' />
                  <img src={instagram} alt="" className='cursor-pointer' />
                  <img src={twitter} alt="" className='cursor-pointer' />
                  <img src={youtube} alt="" className='cursor-pointer' />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-10 items-center flex justify-center">
            <div className="flex items-center gap-2">
              <img src={cicon} alt="" />
              <span>JJB Concepts</span>
              <div className='bg-[#000000DE] w-[5px] h-[5px] rounded-full'></div>
              <span>Developed by our Digital  LLC</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
