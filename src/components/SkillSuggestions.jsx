import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useSkills } from '../contexts/SkillsContext';
import '../styles/SkillSuggestions.css';

const SkillSuggestions = () => {
  const { getSkillSuggestions } = useSkills();
  const suggestions = getSkillSuggestions();

  return (
    <div className="skill-suggestions">
      <h2>AI-Powered Suggestions</h2>
      <p className="suggestions-intro">
        Based on your current skills, here are some personalized recommendations:
      </p>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-card">
            <Lightbulb className="suggestion-icon" />
            <p>{suggestion}</p>
          </div>
        ))}
      </div>
      
      <div className="suggestion-tip">
        <h3>💡 Pro Tip</h3>
        <p>
          Focus on building a T-shaped skill profile: deep expertise in one area 
          with broad knowledge across multiple domains. This makes you more valuable 
          in cross-functional teams!
        </p>
      </div>
    </div>
  );
};

export default SkillSuggestions;