import { useEffect, useRef } from "react";
import { FaPhoneAlt, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        background: "linear-gradient(to bottom right, #3B82F6, #06B6D4)",
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
    <div className="min-h-screen font-sans bg-[#0C001E] relative flex flex-col scroll-smooth">
      {/* Blurred Gradient Circles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute w-[600px] h-[530px] left-[-120px] top-[-120px] opacity-60 blur-[160px]"
          style={{
            background: "radial-gradient(circle, #0EB6BD 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[250px] right-[-80px] top-[120px] opacity-60 blur-[160px]"
          style={{
            background: "radial-gradient(circle, #D9D9D9 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute w-[550px] h-[550px] left-1/2 bottom-[60px] -translate-x-1/2 opacity-40 blur-[220px]"
          style={{
            background: "radial-gradient(circle, #D9D9D9 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 pt-8 z-10 relative">
        <div className="text-white text-xl font-bold tracking-wide">CIT CHENNAI</div>
        <nav className="flex gap-6 items-center">
          <a href="#" className="text-white text-base font-medium hover:underline">
            HOME
          </a>
          <a href="#footer" className="text-white text-base font-medium hover:underline">
            ABOUT
          </a>
          <a href="#footer" className="text-white text-base font-medium hover:underline">
            CONTACT
          </a>
          <a href="#footer" className="text-white text-base font-medium hover:underline">
            ADDRESS
          </a>
          <button
            id="login-button"
            onClick={() => navigate("/Login")}
            className="bg-[#0EB6BD] text-white font-bold px-6 py-2 text-base hover:bg-[#0ca2a8]"
          >
            LOGIN
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pt-14 z-10 relative">
        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="min-w-[220px] mb-4">
            <img src="/src/assets/img.png" alt="Students Illustration" className="w-56" />
          </div>
          <div className="flex-1 flex flex-col items-start">
            <div className="max-w-xl w-full flex flex-col items-start text-left">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Campus Connect</h1>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">
                An Event And
                <br />
                Competition Dashboard
              </h2>
              <p className="text-[#b5e6e7] text-base md:text-lg mb-6">
                Exclusive for the Students of Chennai Institute of Technology
              </p>
            </div>
          </div>
        </div>

        {/* Infrastructure Section */}
        <section id="about" className="mt-4 flex justify-center">
          <div className="max-w-2xl w-full flex flex-col items-center text-center">
            <h3 className="text-[#0EB6BD] text-xl font-bold mb-2">OUR INFRASTRUCTURE</h3>
            <p className="text-white text-base md:text-lg leading-relaxed">
              For students who would like to study at an engineering college
              with an established reputation for high quality teaching and
              research, Chennai Institute of Technology has a lot to offer.
              CIT is situated in Kundrathur, a temple town located in Chennai,
              Tamil Nadu. An attractive and compact campus, excellent student
              accommodation, close proximity of the city, make CIT an ideal
              and conducive environment for learning.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-white text-black mt-10 px-8 py-3 flex flex-col md:flex-row gap-6 z-10 relative text-sm"
      >
        <div className="flex-1 min-w-[140px]">
          <h4 className="font-bold mb-1">About</h4>
          <p>
            Chennai Institute of technology, the best engineering college in
            Chennai was established with the objective of providing quality
            technical education with adequate industrial exposure than any other
            engineering colleges in Chennai, caters the needs of the youth with
            its innovative teaching methods.
            <br />
            <br />
            Apart from interactive classroom scenario, periodic guest lectures by
            experts from industries and academic background provides thirst to
            the students to learn and to prepare for the ready-to-serve
            industrial requirements with uncompromised professional ethics.
          </p>
        </div>
        <div className="flex-1 min-w-[120px]">
          <h4 className="font-bold mb-1">Address</h4>
          <address className="not-italic">
            Sarathy Nagar,
            <br />
            Kundrathur,
            <br />
            Chennai-600069,
            <br />
            Tamilnadu,
            <br />
            India.
          </address>
        </div>
        <div className="flex-1 min-w-[140px]">
          <h4 className="font-bold mb-1">Contact us</h4>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="rotate-90" /> +91 44 7111 9111
            </span>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <FaLinkedin /> Chennai Institute of Technology
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <FaInstagram /> citchennai_official
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <FaEnvelope /> info@citchennai.net
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
