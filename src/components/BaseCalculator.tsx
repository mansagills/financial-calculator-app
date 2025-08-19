import React from 'react';
import { Link } from 'react-router-dom';

interface BaseCalculatorProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const BaseCalculator: React.FC<BaseCalculatorProps> = ({ title, description, children }) => {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <Link to="/" className="logo">
          FINANCECALC<span className="org">.com</span>
        </Link>
        <nav className="nav">
          <Link to="/">HOME</Link>
        </nav>
      </header>

      {/* Calculator Content */}
      <div className="calculator-page">
        <Link to="/" className="back-link">
          Back to Calculators
        </Link>
        
        <h1 className="page-title">{title}</h1>
        <p style={{ textAlign: 'center', color: '#666666', marginBottom: '2rem' }}>
          {description}
        </p>
        
        {children}
      </div>
    </div>
  );
};

export default BaseCalculator; 