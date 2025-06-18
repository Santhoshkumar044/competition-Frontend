// import { useEffect, useRef } from "react";
// import { FaPhoneAlt, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// // ... import statements stay the same

// export default function H() {
//   const circleRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const circlePos = JSON.parse(localStorage.getItem("circlePos"));

//     if (circlePos) {
//       const loginBtn = document.getElementById("login-button");
//       if (!loginBtn) return;

//       const btnRect = loginBtn.getBoundingClientRect();
//       const circle = document.createElement("div");
//       circleRef.current = circle;

//       Object.assign(circle.style, {
//         position: "absolute",
//         top: `${circlePos.top}px`,
//         left: `${circlePos.left}px`,
//         width: "40px",
//         height: "40px",
//         borderRadius: "50%",
//         background: "linear-gradient(to bottom right, #3B82F6, #06B6D4)",
//         zIndex: "1000",
//         transition: "all 1s ease",
//       });

//       document.body.appendChild(circle);

//       setTimeout(() => {
//         circle.style.top = `${btnRect.top + btnRect.height / 2 - 20}px`;
//         circle.style.left = `${btnRect.left + btnRect.width / 2 - 20}px`;
//         circle.style.transform = "scale(0.1)";
//         circle.style.opacity = "0";
//       }, 100);

//       setTimeout(() => {
//         circle.remove();
//         localStorage.removeItem("circlePos");
//       }, 1200);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen font-sans bg-[#0C001E] relative flex flex-col scroll-smooth overflow-x-hidden">
//       {/* Blurred Gradient Circles */}
//       <div className="pointer-events-none absolute inset-0 z-0">
//         <div className="absolute w-[600px] h-[530px] left-[-120px] top-[-120px] opacity-60 blur-[160px]"
//           style={{ background: "radial-gradient(circle, #0EB6BD 60%, transparent 100%)" }} />
//         <div className="absolute w-[400px] h-[250px] right-[-80px] top-[120px] opacity-60 blur-[160px]"
//           style={{ background: "radial-gradient(circle, #D9D9D9 60%, transparent 100%)" }} />
//         <div className="absolute w-[550px] h-[550px] left-1/2 bottom-[60px] -translate-x-1/2 opacity-40 blur-[220px]"
//           style={{ background: "radial-gradient(circle, #D9D9D9 70%, transparent 100%)" }} />
//       </div>

//       {/* Header */}
//       <header className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 pt-6 md:pt-8 z-10 relative gap-4 md:gap-0">
//         <div className="text-white text-xl font-bold tracking-wide">CIT CHENNAI</div>
//         <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 items-center">
        
//           <a href="#about" className="text-white text-base font-medium hover:underline">ABOUT</a>
//           <a href="#footer" className="text-white text-base font-medium hover:underline">CONTACT</a>
//           <a href="#footer" className="text-white text-base font-medium hover:underline">ADDRESS</a>
//           <button
//             id="login-button"
//             onClick={() => navigate("/Login")}
//             className="bg-[#0EB6BD] text-white font-bold px-4 py-2 text-base hover:bg-[#0ca2a8] rounded"
//           >
//             LOGIN
//           </button>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 px-4 md:px-8 pt-12 md:pt-14 z-10 relative">
//         <div className="flex flex-col md:flex-row items-start gap-10">
//           <div className="w-full md:w-auto flex justify-center md:justify-start mb-4">
//             <img src="/src/assets/img.png" alt="Students Illustration" className="w-40 md:w-56" />
//           </div>
//           <div className="flex-1 flex flex-col items-start">
//             <div className="max-w-xl w-full flex flex-col items-start text-left">
//               <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">Campus Connect</h1>
//               <h2 className="text-white text-xl md:text-3xl font-bold mb-1">
//                 An Event And <br /> Competition Dashboard
//               </h2>
//               <p className="text-[#b5e6e7] text-sm md:text-lg mb-6">
//                 Exclusive for the Students of Chennai Institute of Technology
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Infrastructure Section */}
//         <section id="about" className="mt-6 md:mt-10 flex justify-center">
//           <div className="max-w-2xl w-full flex flex-col items-center text-center px-2">
//             <h3 className="text-[#0EB6BD] text-lg md:text-xl font-bold mb-2">OUR INFRASTRUCTURE</h3>
//             <p className="text-white text-sm md:text-lg leading-relaxed">
//               For students who would like to study at an engineering college with an established reputation for high quality teaching and research, Chennai Institute of Technology has a lot to offer.
//               CIT is situated in Kundrathur, a temple town located in Chennai, Tamil Nadu. An attractive and compact campus, excellent student accommodation, close proximity of the city, make CIT an ideal and conducive environment for learning.
//             </p>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer id="footer"
//         className="bg-white text-black mt-10 px-4 md:px-8 py-4 flex flex-col md:flex-row gap-6 z-10 relative text-sm">
//         <div className="flex-1 min-w-[140px]">
//           <h4 className="font-bold mb-1">About</h4>
//           <p>
//             Chennai Institute of Technology, the best engineering college in Chennai was established with the objective of providing quality technical education with adequate industrial exposure.
//             <br /><br />
//             Apart from interactive classrooms, periodic guest lectures by experts from industries and academics provide students the thirst to learn and prepare for industry-ready roles with uncompromised professional ethics.
//           </p>
//         </div>
//         <div className="flex-1 min-w-[120px]">
//           <h4 className="font-bold mb-1">Address</h4>
//           <address className="not-italic">
//             Sarathy Nagar,<br />
//             Kundrathur,<br />
//             Chennai-600069,<br />
//             Tamilnadu,<br />
//             India.
//           </address>
//         </div>
//         <div className="flex-1 min-w-[140px]">
//           <h4 className="font-bold mb-1">Contact us</h4>
//           <div className="flex flex-col gap-1">
//             <a href="tel:+914471119111" className="flex items-center gap-2 hover:underline">
//               <FaPhoneAlt className="rotate-90" /> +91 44 7111 9111
//             </a>
//             <a href="https://www.linkedin.com/school/chennai-institute-of-technology" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
//               <FaLinkedin /> Chennai Institute of Technology
//             </a>
//             <a href="https://www.instagram.com/citchennai_official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
//               <FaInstagram /> citchennai_official
//             </a>
//             <a href="mailto:info@citchennai.net" className="flex items-center gap-2 hover:underline">
//               <FaEnvelope /> info@citchennai.net
//             </a>
//           </div>
//         </div>
//       </footer>

//       {/* Extra Responsive Fixes */}
//       <style jsx global>{`
//         html {
//           scroll-behavior: smooth;
//           overflow-x: hidden;
//         }
//         body {
//           font-family: 'Inter', sans-serif;
//           margin: 0;
//           overflow-x: hidden;
//         }

//         @media (max-width: 768px) {
//           footer {
//             flex-direction: column;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
// import { useEffect, useRef } from "react";
// import { FaPhoneAlt, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BubbleBackground = () => {
//   const bubbles = Array.from({ length: 15 });
  
//   return (
//     <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
//       {bubbles.map((_, i) => {
//         const size = Math.random() * 100 + 50;
//         const duration = Math.random() * 20 + 20;
//         const delay = Math.random() * 10;
//         const left = Math.random() * 100;
//         const opacity = Math.random() * 0.2 + 0.1;
//         const colors = ['#E3DFFF', '#F7C59F', '#A5B4FC', '#C6F6D5', '#FED7D7'];
//         const color = colors[Math.floor(Math.random() * colors.length)];
        
//         return (
//           <motion.div
//             key={i}
//             initial={{ y: "100vh", opacity: 0 }}
//             animate={{ 
//               y: `-${size}px`,
//               opacity: [0, opacity, opacity, 0],
//               x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
//             }}
//             transition={{ 
//               duration,
//               delay,
//               repeat: Infinity,
//               repeatType: "loop",
//               ease: "linear"
//             }}
//             style={{
//               width: `${size}px`,
//               height: `${size}px`,
//               left: `${left}%`,
//               backgroundColor: color,
//               borderRadius: "50%",
//               position: "absolute",
//               filter: "blur(40px)"
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default function H() {
//   const circleRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const circlePos = JSON.parse(localStorage.getItem("circlePos"));

//     if (circlePos) {
//       const loginBtn = document.getElementById("login-button");
//       if (!loginBtn) return;

//       const btnRect = loginBtn.getBoundingClientRect();
//       const circle = document.createElement("div");
//       circleRef.current = circle;

//       Object.assign(circle.style, {
//         position: "absolute",
//         top: `${circlePos.top}px`,
//         left: `${circlePos.left}px`,
//         width: "40px",
//         height: "40px",
//         borderRadius: "50%",
//         background: "linear-gradient(to bottom right, #4B3F72, #3A315A)",
//         zIndex: "1000",
//         transition: "all 1s ease",
//       });

//       document.body.appendChild(circle);

//       setTimeout(() => {
//         circle.style.top = `${btnRect.top + btnRect.height / 2 - 20}px`;
//         circle.style.left = `${btnRect.left + btnRect.width / 2 - 20}px`;
//         circle.style.transform = "scale(0.1)";
//         circle.style.opacity = "0";
//       }, 100);

//       setTimeout(() => {
//         circle.remove();
//         localStorage.removeItem("circlePos");
//       }, 1200);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen font-sans bg-[#F5F7FA] relative flex flex-col scroll-smooth overflow-x-hidden">
//       <BubbleBackground />
      
//       {/* Background Decorations */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.4 }}
//         transition={{ duration: 1 }}
//         className="fixed w-[300px] h-[300px] bg-[#E3DFFF] rounded-full blur-[160px] top-[-50px] left-[-100px] z-0" 
//       />
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         className="fixed w-[200px] h-[200px] bg-[#F7C59F] rounded-full blur-[140px] bottom-[-50px] right-[-60px] z-0"
//       />

//       {/* Header */}
//       <motion.header 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#dcd8f1] shadow-sm px-4 md:px-8 pt-6 md:pt-8 z-10 relative"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-7xl mx-auto">
//           <motion.div 
//             whileHover={{ scale: 1.05 }}
//             className="text-[#4B3F72] text-xl font-bold tracking-wide"
//           >
//             CIT CHENNAI
//           </motion.div>
//           <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 items-center">
//             {['ABOUT', 'CONTACT', 'ADDRESS'].map((item, index) => (
//               <motion.a
//                 key={item}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + index * 0.1 }}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-[#4B3F72] text-base font-medium hover:underline"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {item}
//               </motion.a>
//             ))}
//             <motion.button
//               id="login-button"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               onClick={() => navigate("/Login")}
//               whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white font-bold px-6 py-2 text-base rounded-lg shadow-md hover:shadow-lg transition-all"
//             >
//               LOGIN
//             </motion.button>
//           </nav>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="flex-1 px-4 md:px-8 pt-12 md:pt-14 z-10 relative max-w-7xl mx-auto w-full">
//         <div className="flex flex-col md:flex-row items-center gap-10">
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full md:w-auto flex justify-center md:justify-start mb-4"
//           >
//             <img 
//               src="/src/assets/img.png" 
//               alt="Students Illustration" 
//               className="w-40 md:w-56 rounded-xl shadow-lg border border-[#E3DFFF]"
//             />
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex-1 flex flex-col items-start"
//           >
//             <div className="max-w-xl w-full flex flex-col items-start text-left">
//               <h1 className="text-[#4B3F72] text-3xl md:text-5xl font-bold mb-2">Campus Connect</h1>
//               <h2 className="text-[#4B3F72] text-xl md:text-3xl font-bold mb-1">
//                 An Event And <br /> Competition Dashboard
//               </h2>
//               <p className="text-[#4B3F72] text-opacity-70 text-sm md:text-lg mb-6">
//                 Exclusive for the Students of Chennai Institute of Technology
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/Login")}
//                 className="px-6 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
//               >
//                 Get Started <FaArrowRight className="ml-2" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Infrastructure Section */}
//         <motion.section 
//           id="about"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-16 md:mt-20 flex justify-center"
//         >
//           <div className="max-w-2xl w-full flex flex-col items-center text-center px-2 bg-white p-6 rounded-xl shadow-lg border border-[#E3DFFF]">
//             <h3 className="text-[#4B3F72] text-lg md:text-xl font-bold mb-4">OUR INFRASTRUCTURE</h3>
//             <p className="text-[#4B3F72] text-opacity-80 text-sm md:text-lg leading-relaxed">
//               For students who would like to study at an engineering college with an established reputation for high quality teaching and research, Chennai Institute of Technology has a lot to offer.
//               CIT is situated in Kundrathur, a temple town located in Chennai, Tamil Nadu. An attractive and compact campus, excellent student accommodation, close proximity of the city, make CIT an ideal and conducive environment for learning.
//             </p>
//           </div>
//         </motion.section>
//       </main>

//       {/* Footer */}
//       <motion.footer 
//         id="footer"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="bg-[#dcd8f1] text-[#4B3F72] mt-16 px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 z-10 relative"
//       >
//         <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
//           <motion.div 
//             whileHover={{ y: -5 }}
//             className="bg-white p-6 rounded-xl shadow-sm border border-[#E3DFFF]"
//           >
//             <h4 className="font-bold text-lg mb-3">About</h4>
//             <p className="text-[#4B3F72] text-opacity-80">
//               Chennai Institute of Technology, the best engineering college in Chennai was established with the objective of providing quality technical education with adequate industrial exposure.
//               <br /><br />
//               Apart from interactive classrooms, periodic guest lectures by experts from industries and academics provide students the thirst to learn and prepare for industry-ready roles with uncompromised professional ethics.
//             </p>
//           </motion.div>
          
//           <motion.div 
//             whileHover={{ y: -5 }}
//             className="bg-white p-6 rounded-xl shadow-sm border border-[#E3DFFF]"
//           >
//             <h4 className="font-bold text-lg mb-3">Address</h4>
//             <address className="not-italic text-[#4B3F72] text-opacity-80">
//               Sarathy Nagar,<br />
//               Kundrathur,<br />
//               Chennai-600069,<br />
//               Tamilnadu,<br />
//               India.
//             </address>
//           </motion.div>
          
//           <motion.div 
//             whileHover={{ y: -5 }}
//             className="bg-white p-6 rounded-xl shadow-sm border border-[#E3DFFF]"
//           >
//             <h4 className="font-bold text-lg mb-3">Contact us</h4>
//             <div className="flex flex-col gap-3 text-[#4B3F72] text-opacity-80">
//               <motion.a 
//                 whileHover={{ x: 5 }}
//                 href="tel:+914471119111" 
//                 className="flex items-center gap-2 hover:underline"
//               >
//                 <FaPhoneAlt className="rotate-90" /> +91 44 7111 9111
//               </motion.a>
//               <motion.a 
//                 whileHover={{ x: 5 }}
//                 href="https://www.linkedin.com/school/chennai-institute-of-technology" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="flex items-center gap-2 hover:underline"
//               >
//                 <FaLinkedin /> Chennai Institute of Technology
//               </motion.a>
//               <motion.a 
//                 whileHover={{ x: 5 }}
//                 href="https://www.instagram.com/citchennai_official" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="flex items-center gap-2 hover:underline"
//               >
//                 <FaInstagram /> citchennai_official
//               </motion.a>
//               <motion.a 
//                 whileHover={{ x: 5 }}
//                 href="mailto:info@citchennai.net" 
//                 className="flex items-center gap-2 hover:underline"
//               >
//                 <FaEnvelope /> info@citchennai.net
//               </motion.a>
//             </div>
//           </motion.div>
//         </div>
//       </motion.footer>

//       <ToastContainer 
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="rounded-lg shadow-lg"
//         bodyClassName="font-sans p-4"
//       />
//     </div>
//   );
// }
import { useEffect, useRef } from "react";
import { FaPhoneAlt, FaLinkedin, FaInstagram, FaEnvelope, FaArrowRight, FaUniversity, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#E3DFFF] flex flex-col items-center text-center"
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
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#4B3F72] rounded-full flex items-center justify-center text-white font-bold">C</div>
            <span className="text-[#4B3F72] text-xl font-bold tracking-wide">CIT CHENNAI</span>
          </motion.div>
          
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
            <img 
              src="/src/assets/img.jpg" 
              alt="Students Illustration" 
              className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl border-4 border-white"
            />
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
                <div className="relative z-10 w-full h-full bg-[#4B3F72] bg-opacity-5 rounded-2xl overflow-hidden border border-[#E3DFFF] flex items-center justify-center">
                  <span className="text-[#4B3F72] text-opacity-50 font-bold">CIT Campus Image</span>
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