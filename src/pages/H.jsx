import { useEffect, useRef } from "react";
import { FaPhoneAlt, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight, FaUniversity, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingCampusModel from "../components/FloatingCampusModel";


console.log(motion);
console.log(toast);
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
    className="bg-[#f4efec] bg-opacity-90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#E3DFFF] flex flex-col items-center text-center"
  >
    <div className="w-14 h-14 bg-[#4B3F72] bg-opacity-10 rounded-full flex items-center justify-center text-[#4B3F72] mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#4B3F72] mb-2">{title}</h3>
    <p className="text-[#4B3F72] text-opacity-70">{description}</p>
  </motion.div>
);

export default function H() {
  const circleRef = useRef(null);
  const navigate = useNavigate();

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
        className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm px-4 md:px-8 pt-6 md:pt-8 z-10 sticky top-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <motion.a 
  whileHover={{ scale: 1.05 }}
  href="https://www.citchennai.edu.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2"
>
  <img 
    src="../models/citlogo.png" 
    alt="CIT Chennai Logo" 
    className="w-80 h-20 object-contain"
  />
</motion.a>

          
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 items-center">
            {['About', 'Features', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="text-[#4B3F72] text-base font-medium hover:text-[#3A315A] transition-colors"
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
              className="relative overflow-hidden bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white font-bold px-6 py-2.5 text-base rounded-full shadow-md hover:shadow-lg transition-all"
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
      <section className="relative z-10 pt-16 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4B3F72] leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4B3F72] to-[#3A315A]">
                Campus Connect
              </span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-semibold text-[#4B3F72] opacity-90"
            >
              Your Gateway to Campus Events & Competitions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#4B3F72] opacity-80"
            >
              Exclusive platform for CIT students to discover, participate, and excel in campus activities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(75, 63, 114, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/Login")}
                className="px-8 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                Get Started <FaArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E3DFFF" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-[#4B3F72] rounded-full border border-[#E3DFFF] shadow-sm hover:shadow-md transition-all duration-300"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-[#4B3F72] bg-opacity-10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#F7C59F] bg-opacity-20 rounded-full filter blur-3xl"></div>
            {/* <img 
              src="/src/assets/img.jpg" 
              alt="Students Illustration" 
              className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl border-4 border-white"
            /> */}
          </motion.div>
        </div>
      </section>
{/* Features Section */}
<section id="features" className="relative z-10 py-16 px-4 md:px-8 bg-white bg-opacity-50 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#4B3F72] mb-4">Why Choose Campus Connect?</h2>
      <p className="text-lg text-[#4B3F72] opacity-80 max-w-2xl mx-auto">
        Designed specifically for CIT students to enhance campus engagement and participation
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<span className="text-3xl font-bold text-[#fefeff]">1</span>}
        title="Campus Events"
        description="Discover all upcoming events happening across campus in one place."
        delay={0.2}
      />
      <FeatureCard
        icon={<span className="text-3xl font-bold text-[#ffffff]">2</span>}
        title="Competitions"
        description="Participate in coding, cultural and technical competitions."
        delay={0.4}
      />
      <FeatureCard
        icon={<span className="text-3xl font-bold text-[#ffffff]">3</span>}
        title="Real-time Updates"
        description="Get instant notifications about event changes and results."
        delay={0.6}
      />
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white bg-opacity-90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg border border-[#E3DFFF]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex justify-center gap-6 mb-4">
  <img 
    src="../models/citil.png" 
    alt="Campus Image 1" 
    className="w-50 h-24 rounded-xl shadow-md object-cover"
  />
  <img 
    src="../models/citbif.png" 
    alt="Campus Image 2" 
    className="w-24 h-24 rounded-xl shadow-md object-cover"
  />
</div>

                <h2 className="text-3xl font-bold text-[#4B3F72] mb-6">About CIT</h2>
                <div className="space-y-4 text-[#4B3F72] text-opacity-90">
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
              <div className="relative h-64 md:h-80">
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
      <footer id="contact" className="relative z-10 bg-[#4B3F72] text-white pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold">Campus Connect</h3>
              <p className="opacity-80">
                The official events and competitions platform for CIT Chennai students.
              </p>
             {/* Contact Section - Social Media Icons */}
<div className="flex gap-4">
  {[FaLinkedin, FaInstagram].map((Icon, index) => (
    <motion.a
      key={index}
      whileHover={{ y: -5, scale: 1.1 }}
      href={Icon === FaLinkedin 
        ? "https://www.linkedin.com/school/chennai-institute-of-technology" 
        : "https://www.instagram.com/citchennai_official"}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#4B3F72] hover:bg-opacity-20 transition-all"
    >
      <Icon className="text-3xl text-white" />
    </motion.a>
  ))}
</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Features', 'Login'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    className="opacity-80 hover:opacity-100 transition-opacity"
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
              className="space-y-4"
            >
              <h3 className="text-xl font-bold">Contact Us</h3>
              <address className="not-italic space-y-2 opacity-80">
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
            className="mt-12 pt-6 border-t border-white border-opacity-20 text-center opacity-80 text-sm"
          >
            <p>© {new Date().getFullYear()} Chennai Institute of Technology. All rights reserved.</p>
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
