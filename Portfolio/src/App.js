import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const mountRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    const geometry = new THREE.PlaneGeometry(5, 3, 20, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0a0a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      plane.rotation.x += 0.001;
      plane.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    {
      title: "User Behavior A/B Testing & Product Conversion Analytics",
      tech: "R · SQL · Power BI · Statistics · Experiment Design",
      desc:
        "Built an A/B testing analytics system to measure recommendation impact and visualize conversion insights using R, SQL, and Power BI.",
      github:
        "https://github.com/debasmita30/product-user-behavior-ab-testing",
    },
    {
      title: "SmartStyle Analytics",
      tech: "Streamlit · Plotly · Tableau · ML",
      desc:
        "Developed an AI-powered fashion analytics and recommendation platform integrating Power BI dashboards for brand performance insights.",
      github:
        "https://github.com/debasmita30/SmartStyle-Analytics-AI-Powered-Fashion-Recommendation-Insights-Platform",
    },
    {
      title: "Engagement Forecasting & Telemetry Insights Platform",
      tech: "Python · Scikit-learn · Streamlit · Feature Engineering",
      desc:
        "Created a telemetry-driven engagement forecasting model with interpretable insights and a real-time Streamlit scoring dashboard.",
      github: "https://github.com/debasmita30/user-engagement-modeling",
    },
  ];

  const experience = [
    {
      role: "AI Trainer — Outlier.ai (Remote)",
      period: "June 2024 – Aug 2024",
      bullets: [
        "Designed prompt engineering frameworks and optimized model reasoning using LLM evaluations.",
        "Enhanced contextual accuracy by 25% and refined RLHF-based fine-tuning for consistency.",
      ],
    },
    {
      role: "Team Lead — BinaryBlitz Hackathon (Coding Ninjas LPU)",
      period: "April 2024",
      bullets: [
        "Led a team to develop an AI-driven web vulnerability detection system with automated risk scoring.",
        "Integrated real-time analytics and recognized for innovative problem-solving and leadership.",
      ],
    },
  ];

  const certifications = [
    {
      name: "Oracle Cloud Infrastructure Data Science Professional (1Z0-1110-25) — Oracle (Oct 2025)",
      link: process.env.PUBLIC_URL + "/certs/Oracle_Data_Science_Professional_1Z0-1110-25.pdf",
    },
    {
      name: "Google Advanced Data Analytics — Coursera (Aug 2025)",
      link: "https://www.coursera.org/account/accomplishments/professional-cert/AQYW62BH2NJG",
    },
    {
      name: "IBM Python for Data Science, AI & Development (Sep 2025)",
      link: "https://www.coursera.org/account/accomplishments/verify/I8MDH3EKNE22",
    },
    {
      name: "Learn SQL Basics for Data Science — Coursera (Sep 2025)",
      link: "https://www.coursera.org/account/accomplishments/specialization/LZ05KFXXT1ZT",
    },
    {
      name: "Microsoft Power BI Data Analyst — Coursera (Sep 2025)",
      link: "https://www.coursera.org/account/accomplishments/professional-cert/8WN1YDF5ESIF",
    },
    {
      name: "Google Data Analytics — Coursera (Aug 2025)",
      link: "https://www.coursera.org/account/accomplishments/professional-cert/92I10D78WD14",
    },
    {
      name: "Microsoft Azure Data Fundamentals DP-900 Exam Prep — Coursera (Nov 2025)",
      link: "https://www.coursera.org/account/accomplishments/specialization/5RZERTAANRHV",
    },
    {
      name: "Data Science: Foundations using R — Coursera (May 2024)",
      link: "https://www.coursera.org/account/accomplishments/specialization/YVP2PENTAT56",
    },
  
  ];

 const handleContact = (e) => {
  e.preventDefault();
  const { name, email, message } = e.target;

  // Construct the mailto link including the email from the user
  const mailtoLink = `mailto:dmchatterjee2016@gmail.com?subject=Portfolio Contact from ${name.value}&body=From: ${email.value}%0A%0A${encodeURIComponent(message.value)}`;

  // Open default mail client
  window.location.href = mailtoLink;
};


  // Clickable skill links
  const skillLinks = {
    Python: "https://www.python.org/",
    R: "https://www.r-project.org/",
    SQL: "https://www.sqlite.org/index.html",
    Scala: "https://www.scala-lang.org/",
    TensorFlow: "https://www.tensorflow.org/",
    PyTorch: "https://pytorch.org/",
    Keras: "https://keras.io/",
    "Scikit-learn": "https://scikit-learn.org/",
    "Transformer NLP (BERT/GPT)": "https://huggingface.co/",
    "RL (PPO)": "https://spinningup.openai.com/en/latest/algorithms/ppo.html",
    "Computer Vision": "https://opencv.org/",
    Pandas: "https://pandas.pydata.org/",
    NumPy: "https://numpy.org/",
    "Statistical Modeling": "https://www.statmodeling.com/",
    Tableau: "https://www.tableau.com/",
    "Power BI": "https://powerbi.microsoft.com/",
    Streamlit: "https://streamlit.io/",
    Plotly: "https://plotly.com/",
    "Apache Spark": "https://spark.apache.org/",
    Git: "https://git-scm.com/",
    "RStudio": "https://posit.co/download/rstudio-desktop/",
    Unity: "https://unity.com/",
    Blender: "https://www.blender.org/",
  };

  const skillCards = [
    {
      title: "Core Skills",
      content: (
        <ul className="list-disc ml-5 space-y-1 text-white/80">
          {["Python", "R", "SQL", "Scala"].map((skill) => (
            <li key={skill}>
              <a
                href={skillLinks[skill]}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 underline"
              >
                {skill}
              </a>
            </li>
          ))}
          {["TensorFlow", "PyTorch", "Keras", "Scikit-learn"].map((skill) => (
            <li key={skill}>
              <a
                href={skillLinks[skill]}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 underline"
              >
                {skill}
              </a>
            </li>
          ))}
          {["Transformer NLP (BERT/GPT)", "RL (PPO)", "Computer Vision"].map((skill) => (
            <li key={skill}>
              <a
                href={skillLinks[skill]}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 underline"
              >
                {skill}
              </a>
            </li>
          ))}
          {["Pandas", "NumPy", "Statistical Modeling"].map((skill) => (
            <li key={skill}>
              <a
                href={skillLinks[skill]}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 underline"
              >
                {skill}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Tools & Visualization",
      content: (
        <p className="text-white/80 space-x-2">
          {["Tableau", "Power BI", "Streamlit", "Plotly", "Apache Spark", "Git", "RStudio", "Unity", "Blender"].map(
            (tool, i) => (
              <a
                key={tool}
                href={skillLinks[tool]}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 underline mr-2"
              >
                {tool}
              </a>
            )
          )}
        </p>
      ),
    },
  ];

  const nextCard = () =>
    setCurrentCard((prev) => (prev + 1) % skillCards.length);
  const prevCard = () =>
    setCurrentCard((prev) => (prev - 1 + skillCards.length) % skillCards.length);

  return (
    <div className="min-h-screen bg-[#050517] text-white antialiased relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 -z-10" />

      <img
        src="https://media.giphy.com/media/U4FkC2VqpeNRHjTDQ5/giphy.gif"
        alt="AI Earth"
        className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-40 mix-blend-screen w-80 h-80 object-contain pointer-events-none"
      />

      {/* Navbar */}
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="font-bold">DC</span>
            </div>
            <div>
              <div className="font-semibold">Debasmita Chatterjee</div>
              <div className="text-xs text-white/50">Data Scientist · GenAI</div>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            {["home", "about", "projects", "experience", "certs", "contact"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-white/70 hover:text-white"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              )
            )}
            <a
              href={process.env.PUBLIC_URL + "/Debasmita_Chatterjee_CV.pdf"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-pink-500 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              <HiOutlineDocumentDownload /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <img
            src="https://media.giphy.com/media/SSf1BUICbHfcBCybPd/giphy.gif"
            alt="Tech Glow"
            className="w-full h-full object-cover opacity-30 mix-blend-lighten pointer-events-none"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300"
          >
            Debasmita Chatterjee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/80"
          >
            Driving data-backed insights through statistical analysis, predictive modeling, and business intelligence. — merging{" "}
            <span className="text-pink-300">data</span>,{" "}
            <span className="text-purple-300">empathy</span>, and{" "}
            <span className="text-cyan-300">product design</span>.
          </motion.p>
        </div>
      </header>

      {/* About */}
      <section id="about" className="py-20 bg-gradient-to-br from-[#07102a] via-[#0c1838] to-[#071022] flex flex-col md:flex-row items-center justify-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl px-6"
        >
          <h2 className="text-4xl font-bold mb-6 text-pink-300">About</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            Experienced in transforming complex data into structured insights through advanced analytics, modeling, and BI reporting.
          </p>
        </motion.div>
        <motion.img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hzajc4ZzN5YjhnY2t1MDUxcGNxZGgyc2l3eHl6b3BteWNodHIxNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rs0JBoGpPxMAlnVc8y/giphy.gif"
          alt="About Giphy"
          className="w-96 h-96 object-contain pointer-events-none"
        />
      </section>

      {/* Skill Cards */}
      <section className="py-12">
        <div className="relative mt-12 flex items-center justify-center gap-4">
          <button
            onClick={prevCard}
            className="text-3xl text-pink-400 hover:text-white transition"
          >
            <IoIosArrowBack />
          </button>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center w-full max-w-md transition-transform duration-700">
            <h4 className="text-2xl font-semibold mb-4 text-pink-300">
              {skillCards[currentCard].title}
            </h4>
            {skillCards[currentCard].content}
          </div>
          <button
            onClick={nextCard}
            className="text-3xl text-pink-400 hover:text-white transition"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-gradient-to-br from-[#071022] via-[#0b1330] to-[#050617]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-center text-purple-300">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.2}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md hover:shadow-[0_0_20px_#ff00ff80]"
                >
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <div className="text-xs text-white/60 mb-3">{p.tech}</div>
                  <p className="text-white/80 text-sm mb-4">{p.desc}</p>
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-pink-300 text-sm hover:underline">
                    View Code →
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-gradient-to-br from-[#061026] via-[#0b1636] to-[#04101e]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-cyan-300">Experience</h2>
          {experience.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.3}>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6 hover:shadow-[0_0_20px_#00ffff80] transition-shadow duration-500">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <div className="text-sm text-white/60">{exp.period}</div>
                </div>
                <ul className="mt-3 ml-5 list-disc text-white/80 text-sm space-y-1">
                  {exp.bullets.map((b, j) => (
                    <Reveal key={j} delay={0.15 * j}>
                      <li>{b}</li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="py-20 bg-gradient-to-br from-[#060617] via-[#0b0b1a] to-[#030312]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-pink-300">Certifications</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.15}>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-white/5 p-4 rounded-2xl border border-pink-500/30 hover:border-pink-400 text-sm text-white/80 hover:shadow-[0_0_25px_#ff00ff80] transition"
                >
                  {c.name}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-gradient-to-b from-[#041022] to-[#010213]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-indigo-300">Contact</h2>
          <p className="text-white/80 mb-6">
            Type your name, email, and message — I’ll get back to you soon.
          </p>
          <form
            onSubmit={handleContact}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Your name"
                className="p-3 rounded bg-black/20 outline-none"
                required
              />
              <input
                name="email"
                placeholder="Your email"
                className="p-3 rounded bg-black/20 outline-none"
                required
              />
            </div>
            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              className="w-full p-3 rounded bg-black/20 outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 rounded-lg font-semibold hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white/60">
        <div className="flex justify-center gap-8 mb-3">
          <a
            href="https://github.com/debasmita30"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-300 text-3xl hover:scale-110 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/debasmita-chatterjee/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-300 text-3xl hover:scale-110 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:dmchatterjee2016@gmail.com"
            className="hover:text-cyan-300 text-3xl hover:scale-110 transition"
          >
            <FaEnvelope />
          </a>
        </div>
        © {new Date().getFullYear()} Debasmita Chatterjee · Built with React · Three.js · Tailwind
      </footer>
    </div>
  );
}
