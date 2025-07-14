import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { useSkills } from '../contexts/SkillsContext';
import '../styles/DataManager.css';

const DataManager = () => {
  const { exportSkills, importSkills } = useSkills();
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importSkills(file);
      e.target.value = '';
    }
  };

  return (
    <div className="data-manager">
      <h2>Manage Your Data</h2>
      
      <div className="data-actions">
        <div className="action-card">
          <h3>Export Skills</h3>
          <p>Download your skill data as a JSON file for backup or sharing.</p>
          <button className="export-btn" onClick={exportSkills}>
            <Download size={20} />
            Export Data
          </button>
        </div>
        
        <div className="action-card">
          <h3>Import Skills</h3>
          <p>Upload a previously exported JSON file to restore your skills.</p>
          <button 
            className="import-btn" 
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={20} />
            Import Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      
      <div className="data-info">
        <h3>📋 Data Format</h3>
        <p>
          Your skill data is stored locally in your browser and can be exported 
          as a JSON file. The format includes categories, skill names, and proficiency levels.
        </p>
        <details>
          <summary>View sample data structure</summary>
          <pre>{`{
  "Frontend": [
    {
      "id": 1,
      "name": "React",
      "level": 90
    }
  ],
  "Backend": [...]
}`}</pre>
        </details>
      </div>
    </div>
  );
};

export default DataManager;