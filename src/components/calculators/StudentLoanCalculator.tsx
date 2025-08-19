import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface StudentLoanFormData {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  repaymentPlan: string;
}

interface StudentLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
}

const StudentLoanCalculator: React.FC = () => {
  const [formData, setFormData] = useState<StudentLoanFormData>({
    loanAmount: '',
    interestRate: '',
    loanTerm: '10',
    repaymentPlan: 'standard'
  });

  const [results, setResults] = useState<StudentLoanResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateStudentLoan = () => {
    const loanAmount = parseFloat(formData.loanAmount);
    const interestRate = parseFloat(formData.interestRate);
    const loanTerm = parseInt(formData.loanTerm);

    if (isNaN(loanAmount) || isNaN(interestRate)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment: number;

    if (formData.repaymentPlan === 'income-based') {
      // Simplified income-based repayment calculation
      // This is a basic approximation - actual IBR calculations are more complex
      monthlyPayment = Math.min(
        (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)),
        loanAmount * 0.15 / 12 // 15% of discretionary income cap
      );
    } else {
      // Standard repayment plan
      monthlyPayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }

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
      title="Student Loan Calculator"
      description="Calculate your monthly student loan payments and see the total cost of your education debt."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount ($)</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            placeholder="Enter loan amount"
            min="0"
            step="1000"
          />
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

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (Years)</label>
          <select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleInputChange}
          >
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="repaymentPlan">Repayment Plan</label>
          <select
            id="repaymentPlan"
            name="repaymentPlan"
            value={formData.repaymentPlan}
            onChange={handleInputChange}
          >
            <option value="standard">Standard Repayment</option>
            <option value="income-based">Income-Based Repayment</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateStudentLoan}>
          Calculate Loan Payment
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Student Loan Results</h3>
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

export default StudentLoanCalculator;
