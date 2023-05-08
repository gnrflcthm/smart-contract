
const Nav = () => {
  return (
    <nav className="flex justify-between lg:px-32 py-8 items-center sticky top-0 w-full bg-dark border-b-[1px] border-light">
        <div className="text-white">logo</div>
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