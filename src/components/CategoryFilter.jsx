import React from 'react';
import { useSkills } from '../contexts/SkillsContext';
import '../styles/CategoryFilter.css';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, skills } = useSkills();
  const categories = ['All', ...Object.keys(skills)];

  return (
    <div className="category-filter">
      <h3>Filter by Category</h3>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;