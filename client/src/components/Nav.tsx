import { useState } from 'react'
import Logo from '../assets/logo.png'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="flex flex-col justify-between py-4 items-center sticky top-0 w-full bg-dark border-b-[1px] border-light z-50">
            <div className='flex flex-row justify-between w-full px-8 lg:px-32'>
                <div className="text-white">
                    <img src={Logo} alt="Logo" width={'80px'} />
                </div>
                <ul className="hidden lg:flex space-x-6">
                    <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white rounded-full px-6 py-4">Home</a>
                    <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white rounded-full px-6 py-4">About Us</a>
                    <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white rounded-full px-6 py-4">Contact Us</a>
                    <a href="#" className="transition-colors duration-250 border border-primary hover:bg-transparent font-medium text-white rounded-full bg-primary px-6 py-4">Start a Fundraiser</a>
                </ul>
                <div className="lg:hidden flex items-center">
                    <button className="text-white hover:text-gray-400 focus:outline-none" onClick={() => setIsOpen((val) => !val)}>
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                            <path fillRule="evenodd" d="M4.75 6.75H19.25V8.25H4.75V6.75ZM4.75 11.75H19.25V13.25H4.75V11.75ZM4.75 16.75H19.25V18.25H4.75V16.75Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isOpen ? 'flex' : 'hidden'} absolute top-full z-50 bg-dark items-stretch lg:hidden flex-col pt-6 w-full`}>
                <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white px-6 py-4">Home</a>
                <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white px-6 py-4">About Us</a>
                <a href="#" className="transition-colors duration-250 hover:text-white hover:bg-primary font-medium text-white px-6 py-4">Contact Us</a>
                <a href="#" className="transition-colors duration-250 border border-primary hover:bg-transparent font-medium text-white bg-primary px-6 py-4">Start a Fundraiser</a>
            </div>
        </nav>
    )
}

export default Nav
