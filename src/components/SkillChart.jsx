import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useSkills } from '../contexts/SkillsContext';
import '../styles/SkillChart.css';

const SkillChart = () => {
  const { skills, selectedCategory } = useSkills();
  const [chartType, setChartType] = useState('bar');

  const chartData = useMemo(() => {
    if (selectedCategory === 'All') {
      return Object.values(skills).flat();
    }
    return skills[selectedCategory] || [];
  }, [skills, selectedCategory]);

  const colors = ['#ec4899', '#f472b6', '#f9a8d4', '#fbbf24', '#60a5fa', '#34d399', '#a78bfa', '#fb7185'];

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="level" fill="#ec4899" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="level"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={0} domain={[0, 100]} />
        <Radar name="Skills" dataKey="level" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="skill-chart">
      <div className="chart-controls">
        <h2>Skill Visualization</h2>
        <div className="chart-type-selector">
          <button 
            className={chartType === 'bar' ? 'active' : ''}
            onClick={() => setChartType('bar')}
          >
            📊 Bar Chart
          </button>
          <button 
            className={chartType === 'pie' ? 'active' : ''}
            onClick={() => setChartType('pie')}
          >
            🥧 Doughnut Chart
          </button>
          <button 
            className={chartType === 'radar' ? 'active' : ''}
            onClick={() => setChartType('radar')}
          >
            🎯 Radar Chart
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartType === 'bar' && renderBarChart()}
        {chartType === 'pie' && renderPieChart()}
        {chartType === 'radar' && renderRadarChart()}
      </div>
    </div>
  );
};

export default SkillChart;