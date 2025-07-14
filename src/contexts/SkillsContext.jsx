import React, { createContext, useContext, useState, useEffect } from 'react';

const SkillsContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};

const initialSkills = {
  Frontend: [
    { id: 1, name: 'React', level: 90 },
    { id: 2, name: 'JavaScript', level: 85 },
    { id: 3, name: 'CSS', level: 80 },
    { id: 4, name: 'HTML', level: 95 },
    { id: 5, name: 'Vue.js', level: 70 }
  ],
  Backend: [
    { id: 6, name: 'Node.js', level: 75 },
    { id: 7, name: 'Python', level: 80 },
    { id: 8, name: 'Express.js', level: 70 },
    { id: 9, name: 'MongoDB', level: 65 },
    { id: 10, name: 'PostgreSQL', level: 60 }
  ],
  DevOps: [
    { id: 11, name: 'Docker', level: 65 },
    { id: 12, name: 'AWS', level: 55 },
    { id: 13, name: 'Git', level: 90 },
    { id: 14, name: 'Linux', level: 70 },
    { id: 15, name: 'CI/CD', level: 50 }
  ],
  Tools: [
    { id: 16, name: 'VS Code', level: 95 },
    { id: 17, name: 'Figma', level: 75 },
    { id: 18, name: 'Postman', level: 80 },
    { id: 19, name: 'Webpack', level: 60 },
    { id: 20, name: 'Jest', level: 70 }
  ],
  Languages: [
    { id: 21, name: 'JavaScript', level: 85 },
    { id: 22, name: 'Python', level: 80 },
    { id: 23, name: 'TypeScript', level: 75 },
    { id: 24, name: 'Java', level: 60 },
    { id: 25, name: 'Go', level: 45 }
  ]
};

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('userSkills');
    return savedSkills ? JSON.parse(savedSkills) : initialSkills;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [nextId, setNextId] = useState(26);

  useEffect(() => {
    localStorage.setItem('userSkills', JSON.stringify(skills));
  }, [skills]);

  const updateSkillLevel = (skillId, newLevel) => {
    setSkills(prev => {
      const newSkills = { ...prev };
      Object.keys(newSkills).forEach(category => {
        newSkills[category] = newSkills[category].map(skill =>
          skill.id === skillId ? { ...skill, level: newLevel } : skill
        );
      });
      return newSkills;
    });
  };

  const addSkill = (category, skillName) => {
    if (!skillName.trim()) return;
    
    setSkills(prev => ({
      ...prev,
      [category]: [
        ...prev[category],
        { id: nextId, name: skillName.trim(), level: 50 }
      ]
    }));
    setNextId(prev => prev + 1);
  };

  const removeSkill = (skillId) => {
    setSkills(prev => {
      const newSkills = { ...prev };
      Object.keys(newSkills).forEach(category => {
        newSkills[category] = newSkills[category].filter(skill => skill.id !== skillId);
      });
      return newSkills;
    });
  };

  const exportSkills = () => {
    const dataStr = JSON.stringify(skills, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-skills.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSkills = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSkills = JSON.parse(e.target.result);
        setSkills(importedSkills);
      } catch (error) {
        alert('Invalid JSON file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const getSkillSuggestions = () => {
    const allSkills = Object.values(skills).flat();
    const suggestions = [];

    // Rule-based suggestions
    const reactSkill = allSkills.find(skill => skill.name === 'React');
    if (reactSkill && reactSkill.level > 80) {
      suggestions.push("You're strong in React! Consider learning Redux or Next.js for advanced state management.");
    }

    const jsSkill = allSkills.find(skill => skill.name === 'JavaScript');
    if (jsSkill && jsSkill.level > 75) {
      suggestions.push("Great JavaScript skills! TypeScript would be a natural next step.");
    }

    const dockerSkill = allSkills.find(skill => skill.name === 'Docker');
    if (dockerSkill && dockerSkill.level > 60) {
      suggestions.push("Your Docker knowledge is solid. Consider learning Kubernetes for orchestration.");
    }

    const pythonSkill = allSkills.find(skill => skill.name === 'Python');
    if (pythonSkill && pythonSkill.level > 70) {
      suggestions.push("Strong Python skills! Machine Learning with TensorFlow or PyTorch could be interesting.");
    }

    return suggestions.length > 0 ? suggestions : ["Keep practicing! Every skill improvement makes you more valuable."];
  };

  return (
    <SkillsContext.Provider value={{
      skills,
      selectedCategory,
      setSelectedCategory,
      updateSkillLevel,
      addSkill,
      removeSkill,
      exportSkills,
      importSkills,
      getSkillSuggestions
    }}>
      {children}
    </SkillsContext.Provider>
  );
};