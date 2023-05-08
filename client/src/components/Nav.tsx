import Logo from '../assets/logo.png'

const Nav = () => {
  return (
    <nav className="flex justify-between min-[320px]:px-8 sm:px-16 lg:px-32 py-4 items-center sticky top-0 w-full bg-dark border-b-[1px] border-light z-50">
        <div className="text-white"><img src={Logo} alt="Logo" width={'80px'} /></div>
        <ul className="hidden lg:flex space-x-6">
            <a className="font-medium text-white rounded-full px-6 py-4">Home</a>
            <a className="font-medium text-white rounded-full px-6 py-4">About Us</a>
            <a className="font-medium text-white rounded-full px-6 py-4">Contact Us</a>
            <a className="font-medium text-white rounded-full bg-primary px-6 py-4">Start a Fundraiser</a>
        </ul>
        <div className="lg:hidden">
            <button className="text-white hover:text-gray-400 focus:outline-none">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path fillRule="evenodd" d="M21 18.75H3v-1.5h18v1.5zm0-6H3v-1.5h18v1.5zm0-6H3v-1.5h18v1.5z"></path>
                </svg>
            </button>
        </div>
    </nav>
  )
}

export default Nav
