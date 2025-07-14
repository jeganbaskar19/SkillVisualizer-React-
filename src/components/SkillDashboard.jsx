import React, { useState } from 'react';
import SkillChart from './SkillChart';
import SkillEditor from './SkillEditor';
import SkillSuggestions from './SkillSuggestions';
import DataManager from './DataManager';
import CategoryFilter from './CategoryFilter';
import '../styles/SkillDashboard.css';

const SkillDashboard = () => {
  const [activeTab, setActiveTab] = useState('chart');

  return (
    <div className="skill-dashboard">
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          📊 Charts
        </button>
        <button 
          className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          ✏️ Editor
        </button>
        <button 
          className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          🧠 AI Tips
        </button>
        <button 
          className={`tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          💾 Data
        </button>
      </div>

      <div className="dashboard-content">
        <CategoryFilter />
        
        {activeTab === 'chart' && <SkillChart />}
        {activeTab === 'editor' && <SkillEditor />}
        {activeTab === 'suggestions' && <SkillSuggestions />}
        {activeTab === 'data' && <DataManager />}
      </div>
    </div>
  );
};

export default SkillDashboard;