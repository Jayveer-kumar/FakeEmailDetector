import { useEffect, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktopView  , setIsDesktopview ] = useState(window.innerWidth > 768); 
    const [ showNavbar , setShowNavbar ] = useState(true);
    const [ lastScrollY , setLastScrollY ] = useState(0);

    const controlNavbar = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        // Top of page → always show
        setShowNavbar(true);
      } else if (currentScroll > lastScrollY) {
        // scrolling down → hide
        setShowNavbar(false);
      } else {
        // scrolling up → show
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    useEffect(()=>{
      window.addEventListener('scroll',controlNavbar);
      return () =>{
        window.removeEventListener('scroll',controlNavbar);
      }
    },[]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(()=>{
        const handleResize = () => {
            setIsDesktopview(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])


    return (
      <div className={`Navbar fixed top-0 left-0 w-full z-50 bg-[#0c140d] shadow-md transition-transform duration-300 `}>
        {isDesktopView ? (

          <div className="desktopNav flex justify-between items-center p-4">
            <div className="logoBox">
              <Link to="/" >
              <h2 className="text-white font-medium cursor-pointer">
                MailVerifierX
              </h2>
              </Link>
            </div>
            <div className="navLinks">
              <ul className="flex gap-6 justify-center items-center">
                {[
                  // { label: "Overview", link: "#overview" },
                  { label: "Product", link: "#product" },
                  { label: "Our Process", link: "#our_process" },
                  { label: "Pricing", link: "#pricing" },
                  { label: "Contact", link: "#contact" },
                ].map((item) => (
                  <a key={item.link} href={item.link} className="group">
                    <li
                      className="
                            font-sm
                            text-white
                            relative 
                            cursor-pointer
                            "
                    >
                      {item.label}
                      {/* underline */}
                      <span
                        className="
                                absolute left-0 -bottom-1 h-[2px] w-0 
                                bg-[#00ff99] 
                                transition-all duration-300 
                                group-hover:w-full
                                group-hover:origin-left 
                                origin-right
                                "
                      ></span>
                    </li>
                  </a>
                ))}
              </ul>
            </div>
            <div className="nav-log-sign flex gap-1">
              <button
                className="loginBtn 
              px-4 py-1 
              rounded 
              border border-[#00ff99] 
              bg-transparent 
              text-white 
              cursor-pointer
              transition-colors duration-300
              hover:bg-[#00ff99] 
              hover:text-[#020e02]
               "
              >
                Login
              </button>
              <button
                className="signUpBtn
              px-4 py-2
              rounded
              border border-[#00ff99]
              bg-transparent
              text-white
              cursor-pointer
              transition-colors duration-500
              hover:bg-[#00ff99]
              hover:text-[#020e02]
              "
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="mobileNav flex justify-between items-center p-4 relative">
            <div className="logoBox">
              <h2 className="text-white font-medium cursor-pointer">
                MailVerifierX
              </h2>
            </div>
            <div className="menuIcon">
              <MenuIcon
                onClick={toggleMenu}
                className="text-white cursor-pointer"
              />
            </div>
            {/* Sidebar Overlay */}
            <div
              className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 
        ${
          isMenuOpen ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
              onClick={toggleMenu}
            ></div>

            {/* Sliding Sidebar */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-[#0c140d] shadow-lg p-6 
        transform transition-transform duration-300  z-1000
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              {/* Close Icon */}
              <div className="flex justify-end">
                <CloseIcon
                  className="text-white cursor-pointer"
                  size={30}
                  onClick={toggleMenu}
                />
              </div>

              {/* Links */}
              <ul className="mt-6 text-white space-y-4 text-lg font-medium">
                <li>
                  <a href="#overview">Overview</a>
                </li>
                <li>
                  <a href="#product">Product</a>
                </li>
                <li>
                  <a href="#our_process">Our Process</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>

              {/* Login + Signup Buttons */}
              <div className="absolute bottom-6 w-full left-0 px-6 flex flex-col gap-3">
                <button className="w-full border border-[#00ff99] text-white py-2 rounded-md hover:bg-[#00ff99] hover:text-[#020e02] transition">
                  Login
                </button>

                <button className="w-full bg-[#00ff99] text-[#020e02] py-2 rounded-md hover:bg-[#07e387] transition cursor-pointer">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}