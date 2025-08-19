import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface MortgageFormData {
  homePrice: string;
  downPayment: string;
  loanTerm: string;
  interestRate: string;
}

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
}

const MortgageCalculator: React.FC = () => {
  const [formData, setFormData] = useState<MortgageFormData>({
    homePrice: '',
    downPayment: '',
    loanTerm: '30',
    interestRate: ''
  });

  const [results, setResults] = useState<MortgageResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateMortgage = () => {
    const homePrice = parseFloat(formData.homePrice);
    const downPayment = parseFloat(formData.downPayment);
    const loanTerm = parseInt(formData.loanTerm);
    const interestRate = parseFloat(formData.interestRate);

    if (isNaN(homePrice) || isNaN(downPayment) || isNaN(interestRate)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly payment formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount
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
      title="Mortgage Calculator"
      description="Estimate your monthly mortgage payment and see the total cost of your loan."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="homePrice">Home Price ($)</label>
          <input
            type="number"
            id="homePrice"
            name="homePrice"
            value={formData.homePrice}
            onChange={handleInputChange}
            placeholder="Enter home price"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="downPayment">Down Payment ($)</label>
          <input
            type="number"
            id="downPayment"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleInputChange}
            placeholder="Enter down payment"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (Years)</label>
          <select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleInputChange}
          >
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate (%)</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
            placeholder="Enter interest rate"
            min="0"
            max="20"
            step="0.01"
          />
        </div>

        <button className="calculate-btn" onClick={calculateMortgage}>
          Calculate Mortgage Payment
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Mortgage Results</h3>
          <div className="result-item">
            <span className="result-label">Loan Amount:</span>
            <span className="result-value">{formatCurrency(results.loanAmount)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Monthly Payment:</span>
            <span className="result-value">{formatCurrency(results.monthlyPayment)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest:</span>
            <span className="result-value">{formatCurrency(results.totalInterest)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Payment:</span>
            <span className="result-value">{formatCurrency(results.totalPayment)}</span>
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default MortgageCalculator; 