import React from 'react';

const Skills = () => {
  // Daftar skill yang akan ditampilkan
  const skillsList = ['React', 'Javascript', 'Node.js', 'Tailwind'];

  return (
    // Kontainer flex untuk menyusun item secara horizontal dengan jarak
    <div className="flex flex-row flex-wrap gap-3 mt-6">
      {skillsList.map((skill) => (
        <div
          key={skill}
          className="px-5 py-2 text-sm text-white transition-all duration-300 ease-in-out border rounded-full cursor-pointer border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default Skills;