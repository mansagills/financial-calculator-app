import React from 'react';
import { Link } from 'react-router-dom';

interface CalculatorCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const calculators: CalculatorCard[] = [
  {
    id: 'mortgage',
    title: 'Mortgage',
    description: 'Estimate your monthly mortgage payment.',
    icon: '🏠',
    path: '/mortgage'
  },
  {
    id: 'budgeting',
    title: 'Budgeting',
    description: 'How Much House Can I Afford?',
    icon: '📊',
    path: '/budgeting'
  },
  {
    id: 'credit-debt',
    title: 'Credit & Debt',
    description: 'Calculate the total interest and time it will take for you to pay off your debt.',
    icon: '💳',
    path: '/credit-debt'
  },
  {
    id: 'investments',
    title: 'Investments',
    description: 'Determine how your money will grow over time.',
    icon: '📈',
    path: '/investments'
  },
  {
    id: 'student-loans',
    title: 'Student Loans',
    description: 'Calculate monthly payments and your student loan amortization over time.',
    icon: '🎓',
    path: '/student-loans'
  },
  {
    id: 'retirement',
    title: 'Retirement',
    description: 'Determine how much you need to save for retirement.',
    icon: '⏰',
    path: '/retirement'
  },
  {
    id: 'taxes',
    title: 'Taxes',
    description: 'Understand marginal and effective tax rates and your annual tax liability.',
    icon: '📋',
    path: '/taxes'
  },
  {
    id: 'life-insurance',
    title: 'Life Insurance',
    description: 'Find a personalized policy that meets your needs.',
    icon: '👤',
    path: '/life-insurance'
  },
  {
    id: 'personal-loan',
    title: 'Personal Loan',
    description: 'Calculate monthly payments and see the total costs of this loan over time.',
    icon: '💰',
    path: '/personal-loan'
  }
];

const CalculatorGrid: React.FC = () => {
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Financial Calculators</h1>
        
        <div className="calculator-grid">
          {calculators.map((calculator) => (
            <div key={calculator.id} className="calculator-card">
              <div className="calculator-icon" role="img" aria-label={calculator.title}>
                {calculator.icon}
              </div>
              <h2 className="calculator-title">{calculator.title}</h2>
              <p className="calculator-description">{calculator.description}</p>
              <Link to={calculator.path} className="calculate-btn">
                Calculate
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorGrid; 