// src/components/ProjectSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, 
  FaJsSquare, FaTools, FaFigma, FaGithub
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb, 
  SiExpress, SiPostgresql 
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";

// ===================================
// DUMMY DATA
// ===================================
const dummyProjects = [
    {
    title: "Portfolio v2",
    description: "Website portofolio pribadi yang dibangun dengan React, Next.js, dan Tailwind CSS, di-deploy di Vercel.",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/username/portfolio",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "E-Commerce API",
    description: "RESTful API untuk platform e-commerce dengan fitur otentikasi, manajemen produk, dan transaksi.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    link: "https://github.com/username/ecommerce-api",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "UI Design System",
    description: "Merancang komponen UI yang reusable dan konsisten untuk aplikasi web menggunakan Figma.",
    tech: ["Figma", "Storybook"],
    link: "#",
    image: "https://images.unsplash.com/photo-1600132806378-62402124d9e0?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "3D Product Visualization",
    description: "Desain 3D interaktif untuk showcase produk menggunakan Spline dan Blender.",
    tech: ["Spline", "Blender"],
    link: "#",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    category: "3D Design",
  },
  {
    title: "Animated 3D Landing",
    description: "Landing page dengan elemen 3D animasi untuk branding modern.",
    tech: ["Spline", "Three.js"],
    link: "#",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2070&auto=format&fit=crop",
    category: "3D Design",
  },
];
const dummyCertificates = [
    {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Juni 2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
    title: "Node.js, Express, MongoDB & More",
    issuer: "Udemy",
    date: "Januari 2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1629654857513-3c52c2d35532?q=80&w=1887&auto=format&fit=crop",
    },
    {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "Oktober 2023",
    link: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
];
const techStack = {
    frontend: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
  ],
  tools: [
    { name: "Git & GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Tools Lain", icon: <FaTools className="text-gray-400" /> },
  ],
};


// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================

/**
 * A simple utility for conditionally joining class names.
 * @param {...(string|boolean|null|undefined)} classes - The classes to join.
 * @returns {string} The combined class names.
 */
const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Renders text with an animated diagonal line shadow effect.
 * This component uses a CSS ::after pseudo-element and custom properties
 * to create the effect.
 */
const LineShadowText = ({ children, className, shadowColor = "#4079ff", ...props }) => {
    // This component is designed to work with string children for the data-text attribute.
    if (typeof children !== 'string') {
        console.error("LineShadowText only accepts string content.");
        return <span {...props}>{children}</span>;
    }

    return (
        <motion.span
            // Pass the shadow color as a CSS custom property.
            style={{ "--shadow-color": shadowColor }}
            // Apply the custom class for the effect and any other classes.
            className={cn("relative z-0 line-shadow-effect", className)}
            // The data-text attribute is used by the CSS pseudo-element.
            data-text={children}
            {...props}
        >
            {children}
        </motion.span>
    );
};


// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project }) => {
    const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": "🎨", "Node.js": <FaNodeJs />, "Express": <SiExpress />, 
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚"
    };

    return (
    <a href={project.link} target="_blank" rel="noopener noreferrer"
        className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
        style={{
        background: `url('${project.image}') center/cover no-repeat`,
        cursor: 'pointer',
        }}
    >
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-between p-4 sm:p-6 text-white">
        <div>
            <h3 className="text-lg sm:text-xl font-bold text-cyan-300">{project.title}</h3>
            <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className="flex items-end justify-between">
            <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t, i) => (
                <span key={i} className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-cyan-900/70 text-cyan-200 border border-cyan-800/30 backdrop-blur-sm">
                {techIcons?.[t] || t}
                </span>
            ))}
            </div>
            <FaExternalLinkAlt className="text-slate-300 group-hover:text-cyan-200 transition-colors duration-300" />
        </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 rounded-2xl border border-cyan-300/10 pointer-events-none"></div>
    </a>
    );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [projectCategory, setProjectCategory] = useState('Web/Apps');
  const tabs = [
    {
      id: 'Projects',
      label: 'Projects',
      icon: <PiCodeBold className="text-[1.7em] mb-1" />,
    },
    {
      id: 'Certificate',
      label: 'Certificates',
      icon: <LuBadge className="text-[1.5em] mb-1" />,
    },
    {
      id: 'Tech Stack',
      label: 'Tech Stack',
      icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" />,
    },
  ];

  const filteredProjects = dummyProjects.filter(
    (p) => p.category === projectCategory
  );

  return (
    <section id="project" className="py-20">
      
      {/* CSS for the Line Shadow Animation */}
      <style>{`
        @keyframes line-shadow-anim {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
        }
        .line-shadow-effect::after {
            content: attr(data-text);
            position: absolute;
            z-index: -1;
            left: 0.04em;
            top: 0.04em;
            background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0);
            background-size: 0.06em 0.06em;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: line-shadow-anim 30s linear infinite;
        }
      `}</style>
      
      {/* Title with the new line-shadow animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-bold font-moderniz">
            <span style={{color: "#00ffdc"}}>
                <LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText>
            </span>
            {' '}
            <span style={{ color: "#fff" }}>
                <LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText>
            </span>
        </h2>
      </motion.div>

      {/* Main content container */}
      <div
        className="w-full"
      >
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-3xl p-2 shadow-lg border border-slate-800 bg-gradient-to-r from-[#101624] via-[#0a1627] to-[#0a223a] backdrop-blur-md"
            style={{
              background: "linear-gradient(90deg, #101624 0%, #0a1627 50%, #0a223a 100%)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-2xl font-semibold text-base transition-colors duration-300 outline-none
                  ${activeTab === tab.id
                    ? "text-white"
                    : "text-slate-400 hover:text-cyan-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 bg-gradient-to-br from-[#0a223a] to-[#101624] rounded-2xl"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.5,
                    }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Tab Content */}
        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border border-slate-800/60 mx-auto max-w-7xl bg-clip-padding"
          style={{
            background: "rgba(17, 24, 39, 0.55)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Projects' && (
                <>
                  <div className="flex justify-center gap-4 mb-8">
                    <button
                      className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border
                        ${projectCategory === 'Web/Apps'
                          ? 'bg-cyan-700/80 text-white border-cyan-400 shadow-cyan-500/10 shadow-lg'
                          : 'bg-slate-900/60 text-cyan-200 border-slate-700 hover:bg-cyan-800/40 hover:text-white'}
                      `}
                      onClick={() => setProjectCategory('Web/Apps')}
                    >
                      Web/Apps
                    </button>
                    <button
                      className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border
                        ${projectCategory === '3D Design'
                          ? 'bg-cyan-700/80 text-white border-cyan-400 shadow-cyan-500/10 shadow-lg'
                          : 'bg-slate-900/60 text-cyan-200 border-slate-700 hover:bg-cyan-800/40 hover:text-white'}
                      `}
                      onClick={() => setProjectCategory('3D Design')}
                    >
                      3D Design
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((p, i) => <ProjectCard key={i} project={p} />)
                    ) : (
                      <div className="col-span-full text-center text-slate-400 py-12">
                        No projects in this category yet.
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeTab === 'Certificate' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {dummyCertificates.map((cert, i) => (
                    <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
                      style={{
                        background: `url('${cert.image}') center/cover no-repeat`,
                        cursor: 'pointer',
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div>
                          <h3 className="text-md sm:text-lg font-bold text-cyan-300">{cert.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1">{cert.issuer}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 font-mono self-end">{cert.date}</p>
                      </div>
                      <div className="absolute inset-0 rounded-2xl border border-cyan-300/5 pointer-events-none"></div>
                    </a>
                  ))}
                </div>
              )}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-xl font-bold text-cyan-300 capitalize mb-4 border-b-2 border-slate-800 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800 transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-500/30">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm text-slate-300">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
