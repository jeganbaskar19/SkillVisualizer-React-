import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { Trash2, Plus } from 'lucide-react';
import { useSkills } from '../contexts/SkillsContext';
import '../styles/SkillEditor.css';

const SkillEditor = () => {
  const { skills, selectedCategory, updateSkillLevel, addSkill, removeSkill } = useSkills();
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState('Frontend');

  const displaySkills = selectedCategory === 'All' 
    ? Object.entries(skills).flatMap(([category, skillList]) => 
        skillList.map(skill => ({ ...skill, category }))
      )
    : skills[selectedCategory]?.map(skill => ({ ...skill, category: selectedCategory })) || [];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillName.trim()) {
      addSkill(selectedCategoryForAdd, newSkillName);
      setNewSkillName('');
    }
  };

  return (
    <div className="skill-editor">
      <h2>Edit Your Skills</h2>
      
      <form className="add-skill-form" onSubmit={handleAddSkill}>
        <select 
          value={selectedCategoryForAdd}
          onChange={(e) => setSelectedCategoryForAdd(e.target.value)}
        >
          {Object.keys(skills).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter skill name..."
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
        />
        <button type="submit">
          <Plus size={16} /> Add Skill
        </button>
      </form>

      <div className="skills-list">
        {displaySkills.map(skill => (
          <SkillItem 
            key={skill.id} 
            skill={skill} 
            onUpdate={updateSkillLevel}
            onRemove={removeSkill}
          />
        ))}
      </div>
    </div>
  );
};

const SkillItem = ({ skill, onUpdate, onRemove }) => {
  const progressAnimation = useSpring({
    width: `${skill.level}%`,
    config: { tension: 300, friction: 30 }
  });

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        {skill.category && <span className="skill-category">{skill.category}</span>}
        <button 
          className="remove-btn"
          onClick={() => onRemove(skill.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="skill-controls">
        <input
          type="range"
          min="0"
          max="100"
          value={skill.level}
          onChange={(e) => onUpdate(skill.id, parseInt(e.target.value))}
          className="skill-slider"
        />
        <span className="skill-level">{skill.level}%</span>
      </div>
      
      <div className="progress-bar">
        <animated.div 
          className="progress-fill" 
          style={progressAnimation}
        />
      </div>
    </div>
  );
};

export default SkillEditor;