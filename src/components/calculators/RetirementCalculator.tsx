import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface RetirementFormData {
  currentAge: string;
  retirementAge: string;
  lifeExpectancy: string;
  currentSavings: string;
  desiredIncome: string;
  socialSecurity: string;
  annualReturn: string;
  inflationRate: string;
}

interface RetirementResults {
  totalNeeded: number;
  monthlyContribution: number;
  totalContributions: number;
  totalInterest: number;
  breakdown: Array<{
    age: number;
    savings: number;
    contributions: number;
    interest: number;
  }>;
}

const RetirementCalculator: React.FC = () => {
  const [formData, setFormData] = useState<RetirementFormData>({
    currentAge: '',
    retirementAge: '',
    lifeExpectancy: '85',
    currentSavings: '',
    desiredIncome: '',
    socialSecurity: '',
    annualReturn: '7',
    inflationRate: '2.5'
  });

  const [results, setResults] = useState<RetirementResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRetirement = () => {
    const currentAge = parseInt(formData.currentAge);
    const retirementAge = parseInt(formData.retirementAge);
    const lifeExpectancy = parseInt(formData.lifeExpectancy);
    const currentSavings = parseFloat(formData.currentSavings);
    const desiredIncome = parseFloat(formData.desiredIncome);
    const socialSecurity = parseFloat(formData.socialSecurity);
    const annualReturn = parseFloat(formData.annualReturn);
    const inflationRate = parseFloat(formData.inflationRate);

    if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(currentSavings) || 
        isNaN(desiredIncome) || isNaN(socialSecurity)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // Calculate inflation-adjusted desired income
    const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const monthlyIncomeNeeded = (inflationAdjustedIncome - socialSecurity) / 12;

    // Calculate total retirement savings needed
    const monthlyInterestRate = annualReturn / 100 / 12;
    const totalMonthsInRetirement = yearsInRetirement * 12;
    
    // Calculate required retirement savings using annuity formula
    const totalNeeded = monthlyIncomeNeeded * 
      (1 - Math.pow(1 + monthlyInterestRate, -totalMonthsInRetirement)) / monthlyInterestRate;

    // Calculate required monthly contribution
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + annualReturn / 100, yearsToRetirement);
    const additionalSavingsNeeded = totalNeeded - futureValueOfCurrentSavings;
    
    const monthlyContribution = additionalSavingsNeeded * 
      (annualReturn / 100 / 12) / 
      (Math.pow(1 + annualReturn / 100 / 12, yearsToRetirement * 12) - 1);

    const totalContributions = monthlyContribution * yearsToRetirement * 12;
    const totalInterest = totalNeeded - currentSavings - totalContributions;

    // Generate yearly breakdown
    const breakdown: Array<{
      age: number;
      savings: number;
      contributions: number;
      interest: number;
    }> = [];

    let savings = currentSavings;
    for (let year = 1; year <= yearsToRetirement; year++) {
      const previousSavings = savings;
      const yearContributions = monthlyContribution * 12;
      savings = savings * (1 + annualReturn / 100) + yearContributions;
      const yearInterest = savings - previousSavings - yearContributions;

      breakdown.push({
        age: currentAge + year,
        savings,
        contributions: yearContributions,
        interest: yearInterest
      });
    }

    setResults({
      totalNeeded,
      monthlyContribution,
      totalContributions,
      totalInterest,
      breakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <BaseCalculator
      title="Retirement Calculator"
      description="Determine how much you need to save for retirement."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="currentAge">Current Age</label>
          <input
            type="number"
            id="currentAge"
            name="currentAge"
            value={formData.currentAge}
            onChange={handleInputChange}
            placeholder="Enter your current age"
            min="18"
            max="80"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="retirementAge">Retirement Age</label>
          <input
            type="number"
            id="retirementAge"
            name="retirementAge"
            value={formData.retirementAge}
            onChange={handleInputChange}
            placeholder="Enter planned retirement age"
            min="50"
            max="80"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentSavings">Current Retirement Savings ($)</label>
          <input
            type="number"
            id="currentSavings"
            name="currentSavings"
            value={formData.currentSavings}
            onChange={handleInputChange}
            placeholder="Enter current savings"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="desiredIncome">Desired Annual Income in Retirement ($)</label>
          <input
            type="number"
            id="desiredIncome"
            name="desiredIncome"
            value={formData.desiredIncome}
            onChange={handleInputChange}
            placeholder="Enter desired annual income"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="socialSecurity">Expected Social Security Income ($)</label>
          <input
            type="number"
            id="socialSecurity"
            name="socialSecurity"
            value={formData.socialSecurity}
            onChange={handleInputChange}
            placeholder="Enter expected social security"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="annualReturn">Expected Annual Return (%)</label>
          <input
            type="number"
            id="annualReturn"
            name="annualReturn"
            value={formData.annualReturn}
            onChange={handleInputChange}
            placeholder="Enter expected return rate"
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="inflationRate">Expected Inflation Rate (%)</label>
          <input
            type="number"
            id="inflationRate"
            name="inflationRate"
            value={formData.inflationRate}
            onChange={handleInputChange}
            placeholder="Enter expected inflation rate"
            min="0"
            max="10"
            step="0.1"
          />
        </div>

        <button className="calculate-btn" onClick={calculateRetirement}>
          Calculate Retirement Needs
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Retirement Results</h3>
          <div className="result-item">
            <span className="result-label">Total Savings Needed:</span>
            <span className="result-value">{formatCurrency(results.totalNeeded)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Required Monthly Contribution:</span>
            <span className="result-value">{formatCurrency(results.monthlyContribution)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Contributions:</span>
            <span className="result-value">{formatCurrency(results.totalContributions)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Earned:</span>
            <span className="result-value">{formatCurrency(results.totalInterest)}</span>
          </div>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Savings Growth Projection</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {results.breakdown.slice(0, 10).map((year) => (
              <div key={year.age} className="result-item">
                <span className="result-label">Age {year.age}:</span>
                <span className="result-value">{formatCurrency(year.savings)}</span>
              </div>
            ))}
            {results.breakdown.length > 10 && (
              <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
                ... and {results.breakdown.length - 10} more years
              </div>
            )}
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default RetirementCalculator; 