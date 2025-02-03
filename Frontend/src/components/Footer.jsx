function Footer  () {
  return (
    <>
<div className="mt-8 w-full bg-black px-6 md:px-16 lg:px-40 flex flex-col md:flex-row md:items-start space-y-8 md:space-y-0 justify-between text-sm md:text-base py-12">
    <div className="flex flex-col text-gray-300 space-y-3 md:space-y-5">
      <p className="hover:text-white transition-colors duration-300 cursor-pointer">Featured Blogs</p>
     <p className="hover:text-white transition-colors duration-300 cursor-pointer">Most Views</p>
       <p className="hover:text-white transition-colors duration-300 cursor-pointer">Readers Choice</p>
     </div>
     <div className="flex flex-col text-gray-300 space-y-3 md:space-y-5">
       <p className="hover:text-white transition-colors duration-300 cursor-pointer">Forum</p>
       <p className="hover:text-white transition-colors duration-300 cursor-pointer">Support</p>
      <p className="hover:text-white transition-colors duration-300 cursor-pointer">Recent Posts</p>     </div>
    <div className="flex flex-col text-gray-300 space-y-3 md:space-y-5">
     <p className="hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</p>
      <p className="hover:text-white transition-colors duration-300 cursor-pointer">About</p>
       <p className="hover:text-white transition-colors duration-300 cursor-pointer">Terms & Conditions</p>
      <p className="hover:text-white transition-colors duration-300 cursor-pointer">FAQ</p>
    </div>
   </div>
     <p className="py-5 pb-6 text-center text-white bg-black text-sm border-t border-gray-700">
    &copy; 2024 BlogWebsite. All rights reserved.
    </p>
    </>
    
  )
}

export default Footer
