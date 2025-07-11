import { useEffect, useRef,useState } from "react";
import { 
  FaPhoneAlt, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaArrowRight, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaBell,FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingCampusModel from "../components/FloatingCampusModel";



const _motion = motion;
const _toast = toast;
const FloatingOrbs = () => {
  const colors = ['#4B3F72', '#3A315A', '#E3DFFF', '#F7C59F'];


  
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => {
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.3 + 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ 
              y: `-${size}px`,
              opacity: [0, opacity, opacity, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
            }}
            transition={{ 
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              backgroundColor: color,
              borderRadius: "50%",
              position: "absolute",
              filter: "blur(40px)"
            }}
          />
        );
      })}
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="bg-[#f4f4f4] bg-opacity-90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#E3DFFF] flex flex-col items-center text-center h-full"
  >
    <div className="w-14 h-14 bg-[#4B3F72] bg-opacity-10 rounded-full flex items-center justify-center text-[#4B3F72] mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#4B3F72] mb-2">{title}</h3>
    <p className="text-[#4B3F72] text-opacity-70">{description}</p>
  </motion.div>
);

export default function HomePage() {
  const circleRef = useRef(null);
  const navigate = useNavigate();
  const [latestApproved, setLatestApproved] = useState([]);
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalPages = latestApproved.slice(0, 6).length;

  const goToSlide = (index) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentPage, isHovered, totalPages]);


  useEffect(() => {
    const fetchLatestApproved = async () => {
      try {
        const res = await fetch("/api/competitions/approved/latest");//edited this api call to access the latest approved competition
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setLatestApproved(data);
      } catch (err) {
        console.error("❌ Error fetching latest competitions:", err);
      }
    };

    fetchLatestApproved();
  }, []);
    // useEffect(() => {
    //   if (isHovered) return;

    //   const interval = setInterval(() => {
    //     scrollContainerBy(1);
    //   }, 4000);

    //   return () => clearInterval(interval);
    // }, [isHovered, currentPage]);

  useEffect(() => {
    const circlePos = JSON.parse(localStorage.getItem("circlePos"));

    if (circlePos) {
      const loginBtn = document.getElementById("login-button");
      if (!loginBtn) return;

      const btnRect = loginBtn.getBoundingClientRect();
      const circle = document.createElement("div");
      circleRef.current = circle;

      Object.assign(circle.style, {
        position: "absolute",
        top: `${circlePos.top}px`,
        left: `${circlePos.left}px`,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "linear-gradient(to bottom right, #4B3F72, #3A315A)",
        zIndex: "1000",
        transition: "all 1s ease",
      });

      document.body.appendChild(circle);

      setTimeout(() => {
        circle.style.top = `${btnRect.top + btnRect.height / 2 - 20}px`;
        circle.style.left = `${btnRect.left + btnRect.width / 2 - 20}px`;
        circle.style.transform = "scale(0.1)";
        circle.style.opacity = "0";
      }, 100);

      setTimeout(() => {
        circle.remove();
        localStorage.removeItem("circlePos");
      }, 1200);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#F5F7FA] to-[#E3DFFF] relative flex flex-col scroll-smooth overflow-x-hidden">
      <FloatingOrbs />
      
      {/* Glassmorphic Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm px-4 md:px-8 py-4 z-10 sticky top-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="https://www.citchennai.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img 
              src="../models/citlogo.png" 
              alt="CIT Chennai Logo" 
              className="w-64 md:w-80 h-16 md:h-20 object-contain"
            />
          </motion.a>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 items-center">
            {['About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="text-[#4B3F72] text-sm md:text-base font-medium hover:text-[#3A315A] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              id="login-button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate("/Login")}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(75, 63, 114, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white font-bold px-4 md:px-6 py-2 text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <span className="relative z-10">LOGIN</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-[#3A315A] to-[#4B3F72] opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
              />
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 md:pt-16 pb-16 md:pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#4B3F72] leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4B3F72] to-[#3A315A]">
                Campus Connect
              </span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#4B3F72] opacity-90"
            >
              Your Gateway to Campus Events & Competitions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-[#4B3F72] opacity-80"
            >
              Exclusive platform for CIT students to discover, participate, and excel in campus activities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(75, 63, 114, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/Login")}
                className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-sm md:text-base"
              >
                Get Started <FaArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E3DFFF" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-2 md:py-3 bg-white text-[#4B3F72] rounded-full border border-[#E3DFFF] shadow-sm hover:shadow-md transition-all duration-300 text-sm md:text-base"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            <div className="absolute -top-8 -left-8 w-48 h-48 md:w-64 md:h-64 bg-[#4B3F72] bg-opacity-10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 bg-[#F7C59F] bg-opacity-20 rounded-full filter blur-3xl"></div>
            {/* Placeholder for any visual content */}
          </motion.div>
        </div>
      </section>
      <section className="relative z-10 px-0 py-8 bg-white bg-opacity-60 backdrop-blur-md">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4B3F72] mb-6 text-center">What's Trending</h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {latestApproved.slice(0, 6).map((item) => (
              <div
                key={item._id}
                onClick={() => navigate("/Login")}
                className="w-full flex-shrink-0 px-4 sm:px-16 md:px-28 lg:px-40"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-[#E3DFFF] shadow-md rounded-xl p-6 h-60 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="text-lg font-bold text-[#4B3F72]">{item.title}</div>

                  <div className="text-sm text-gray-600">
                    📍 {item.organiser?.trim() === item.location?.trim() ? "Online" : item.location}
                  </div>

                  {/* 🧑‍💼 Organiser (always shown) */}
                  <div className="text-sm text-gray-600">
                    🧑‍💼 {item.organiser || "Unknown Organiser"}
                  </div>
                <div className="text-sm text-gray-600">
                    🏆{item.prize || "Unknown Organiser"}
                  </div>
                  {/* ⏳ Days Left */}
                  <div className="text-sm text-gray-600">
                    ⏳ {item.daysLeft} 
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center space-x-2">
            {latestApproved.slice(0, 6).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-[#4B3F72]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="relative z-10 py-12 md:py-16 px-4 md:px-8 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B3F72] mb-3 md:mb-4">Why Choose Campus Connect?</h2>
            <p className="text-base md:text-lg text-[#4B3F72] opacity-80 max-w-2xl mx-auto">
              Designed specifically for CIT students to enhance campus engagement and participation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           <FeatureCard
  icon={<img src="/models/events.svg" alt="Events" className="w-7 h-7 md:w-8 md:h-8" />}
  title="Campus Events"
  description="Discover all upcoming events happening across CIT in one place."
  delay={0.2}
/>

<FeatureCard
  icon={<img src="/models/competitions.svg" alt="Competitions" className="w-7 h-7 md:w-8 md:h-8" />}
  title="Competitions"
  description="Participate in coding and technical competitions to gain knowledge and showcase your talents."
  delay={0.4}
/>

<FeatureCard
  icon={<img src="/models/updates.svg" alt="Updates" className="w-7 h-7 md:w-8 md:h-8" />}
  title="Real-time Updates"
  description="Get instant details about event changes."
  delay={0.6}
/>


          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white bg-opacity-90 backdrop-blur-sm p-6 md:p-8 lg:p-12 rounded-3xl shadow-lg border border-[#E3DFFF]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="flex justify-center gap-4 md:gap-6 mb-4">
                  <img 
                    src="../models/citil.png" 
                    alt="Campus Image 1" 
                    className="w-40 md:w-50 h-16 md:h-20 rounded-xl shadow-md object-contain"
                  />
                  <img 
                    src="../models/citbif.png" 
                    alt="Campus Image 2" 
                    className="w-16 md:w-20 h-16 md:h-20 rounded-xl shadow-md object-contain"
                  />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#4B3F72] mb-4 md:mb-6">About CIT</h2>
                <div className="space-y-3 md:space-y-4 text-[#4B3F72] text-opacity-90 text-sm md:text-base">
                  <p>
                    Chennai Institute of Technology is renowned for its high-quality technical education and research facilities. 
                    Our campus provides an ideal environment for learning with modern infrastructure and industry collaborations.
                  </p>
                  <p>
                    Located in Kundrathur, Chennai, CIT offers excellent accommodation and proximity to the city, 
                    making it a preferred choice for engineering aspirants.
                  </p>
                </div>
              </div>
              <div className="relative h-56 sm:h-64 md:h-80 mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-[#4B3F72] bg-opacity-10 rounded-2xl filter blur-xl"></div>
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-[#E3DFFF] bg-white shadow-lg">
                  <FloatingCampusModel />  
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="relative z-10 bg-[#4B3F72] text-white pt-12 md:pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3 md:space-y-4"
            >
              <h3 className="text-xl md:text-2xl font-bold">Campus Connect</h3>
              <p className="opacity-80 text-sm md:text-base">
                The official events and competitions platform for CIT Chennai students.
              </p>
              <div className="flex gap-3 md:gap-4">
                {[FaLinkedin, FaInstagram].map((Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href={Icon === FaLinkedin 
                      ? "https://www.linkedin.com/company/citbif/" 
                      : "https://www.instagram.com/citinnovationlabs/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-[#4B3F72] hover:bg-opacity-20 transition-all"
                  >
                    <Icon className="text-xl md:text-2xl text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-3 md:space-y-4"
            >
              <h3 className="text-lg md:text-xl font-bold">Quick Links</h3>
              <ul className="space-y-1 md:space-y-2">
                {['Login', 'About', 'Features'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    className="opacity-80 hover:opacity-100 transition-opacity text-sm md:text-base"
                  >
                    <a 
                      href={item === 'Login' ? '/Login' : `#${item.toLowerCase()}`} 
                      className="flex items-center gap-2"
                    >
                      <FaArrowRight className="text-xs" /> {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-3 md:space-y-4"
            >
              <h3 className="text-lg md:text-xl font-bold">Contact Us</h3>
              <address className="not-italic space-y-1 md:space-y-2 opacity-80 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> Sarathy Nagar, Kundrathur, Chennai-600069
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="rotate-90" /> +91 44 7111 9111
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope /> info@citchennai.net
                </p>
              </address>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-white border-opacity-20 text-center opacity-80 text-xs md:text-sm"
          >
            <p>© {new Date().getFullYear()} CITBIF. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="rounded-lg shadow-lg"
        bodyClassName="font-sans p-4"
      />
    </div>
  );
}