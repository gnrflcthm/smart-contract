import Logo from '../assets/logo.png'

const Nav = () => {
  return (
    <nav className="flex justify-between lg:px-32 py-4 items-center sticky top-0 w-full bg-dark border-b-[1px] border-light z-50">
        <div className="text-white"><img src={Logo} alt="Logo" width={'80px'} /></div>
        <ul className="space-x-6">
            <a className="font-medium text-white rounded-full px-6 py-4">Home</a>
            <a className="font-medium text-white rounded-full px-6 py-4">About Us</a>
            <a className="font-medium text-white rounded-full px-6 py-4">Contact Us</a>
            <a className="font-medium text-white rounded-full bg-primary px-6 py-4">Start a Fundraiser</a>
        </ul>
    </nav>
  )
}

export default Nav