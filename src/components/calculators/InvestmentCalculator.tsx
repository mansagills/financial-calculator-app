import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface InvestmentFormData {
  initialAmount: string;
  monthlyContribution: string;
  yearsToInvest: string;
  expectedReturn: string;
}

interface InvestmentResults {
  initialInvestment: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
}

const InvestmentCalculator: React.FC = () => {
  const [formData, setFormData] = useState<InvestmentFormData>({
    initialAmount: '',
    monthlyContribution: '',
    yearsToInvest: '',
    expectedReturn: ''
  });

  const [results, setResults] = useState<InvestmentResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateInvestment = () => {
    const initialAmount = parseFloat(formData.initialAmount);
    const monthlyContribution = parseFloat(formData.monthlyContribution);
    const yearsToInvest = parseInt(formData.yearsToInvest);
    const expectedReturn = parseFloat(formData.expectedReturn);

    if (isNaN(initialAmount) || isNaN(monthlyContribution) || isNaN(yearsToInvest) || isNaN(expectedReturn)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyReturn = expectedReturn / 100 / 12;
    const numberOfMonths = yearsToInvest * 12;

    // Calculate future value with compound interest
    let futureValue = initialAmount;
    
    // Add monthly contributions with compound interest
    for (let month = 1; month <= numberOfMonths; month++) {
      futureValue = futureValue * (1 + monthlyReturn) + monthlyContribution;
    }

    const totalContributions = initialAmount + (monthlyContribution * numberOfMonths);
    const totalInterest = futureValue - totalContributions;

    setResults({
      initialInvestment: initialAmount,
      totalContributions,
      totalInterest,
      finalAmount: futureValue
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
      title="Investment Calculator"
      description="Calculate the future value of your investments with compound interest and regular contributions."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="initialAmount">Initial Investment ($)</label>
          <input
            type="number"
            id="initialAmount"
            name="initialAmount"
            value={formData.initialAmount}
            onChange={handleInputChange}
            placeholder="Enter initial amount"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyContribution">Monthly Contribution ($)</label>
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={formData.monthlyContribution}
            onChange={handleInputChange}
            placeholder="Enter monthly contribution"
            min="0"
            step="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearsToInvest">Years to Invest</label>
          <input
            type="number"
            id="yearsToInvest"
            name="yearsToInvest"
            value={formData.yearsToInvest}
            onChange={handleInputChange}
            placeholder="Enter years to invest"
            min="1"
            max="50"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedReturn">Expected Annual Return (%)</label>
          <input
            type="number"
            id="expectedReturn"
            name="expectedReturn"
            value={formData.expectedReturn}
            onChange={handleInputChange}
            placeholder="Enter expected return"
            min="0"
            max="20"
            step="0.1"
          />
        </div>

        <button className="calculate-btn" onClick={calculateInvestment}>
          Calculate Investment Growth
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Investment Results</h3>
          <div className="result-item">
            <span className="result-label">Initial Investment:</span>
            <span className="result-value">{formatCurrency(results.initialInvestment)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Contributions:</span>
            <span className="result-value">{formatCurrency(results.totalContributions)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Earned:</span>
            <span className="result-value">{formatCurrency(results.totalInterest)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Final Amount:</span>
            <span className="result-value">{formatCurrency(results.finalAmount)}</span>
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default InvestmentCalculator;
