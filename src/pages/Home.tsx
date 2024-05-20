import hero from '../assets/hero.png'
import side from '../assets/side-image.png'
import Products from '../components/Products'

const Home = () => {
  return (
    <div className='w-[90%] mx-auto mb-12 pt-36'>
      <div className='w-full object-cover mb-10 rounded-[12.08px]'>
        <img src={hero} alt="" className='rounded-[12.08px]' />
      </div>

      <div className="flex w-full gap-6 ">
        <div className='w-[30%] object-cover h-[1050px] md:block hidden'>
            <img src={side} alt="" className='w-full h-full' />
        </div>

        <div className='md:w-[70%] w-full'>
            <Products />
        </div>
      </div>
    </div>
  )
}

export default Home
