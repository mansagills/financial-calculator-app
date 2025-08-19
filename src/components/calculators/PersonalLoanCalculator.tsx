import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface PersonalLoanFormData {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  loanPurpose: string;
  creditScore: string;
}

interface PersonalLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  apr: number;
  amortizationSchedule: Array<{
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

const PersonalLoanCalculator: React.FC = () => {
  const [formData, setFormData] = useState<PersonalLoanFormData>({
    loanAmount: '',
    interestRate: '',
    loanTerm: '36',
    loanPurpose: 'debt-consolidation',
    creditScore: '700'
  });

  const [results, setResults] = useState<PersonalLoanResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePersonalLoan = () => {
    const loanAmount = parseFloat(formData.loanAmount);
    const interestRate = parseFloat(formData.interestRate);
    const loanTerm = parseInt(formData.loanTerm);

    if (isNaN(loanAmount) || isNaN(interestRate)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    // Calculate monthly payment using amortization formula
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Calculate APR (simplified - same as interest rate for this calculator)
    const apr = interestRate;

    // Generate amortization schedule
    const amortizationSchedule: Array<{
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }> = [];

    let balance = loanAmount;
    for (let payment = 1; payment <= numberOfPayments; payment++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      amortizationSchedule.push({
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      apr,
      amortizationSchedule
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <BaseCalculator
      title="Personal Loan Calculator"
      description="Calculate monthly payments and see the total costs of this loan over time."
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
            min="1000"
            max="100000"
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
            max="50"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (Months)</label>
          <select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleInputChange}
          >
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
            <option value="72">72 months</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loanPurpose">Loan Purpose</label>
          <select
            id="loanPurpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleInputChange}
          >
            <option value="debt-consolidation">Debt Consolidation</option>
            <option value="home-improvement">Home Improvement</option>
            <option value="medical">Medical Expenses</option>
            <option value="education">Education</option>
            <option value="wedding">Wedding</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="creditScore">Credit Score Range</label>
          <select
            id="creditScore"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleInputChange}
          >
            <option value="300">300-579 (Poor)</option>
            <option value="580">580-669 (Fair)</option>
            <option value="670">670-739 (Good)</option>
            <option value="740">740-799 (Very Good)</option>
            <option value="800">800-850 (Excellent)</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculatePersonalLoan}>
          Calculate Personal Loan
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Personal Loan Results</h3>
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
          <div className="result-item">
            <span className="result-label">APR:</span>
            <span className="result-value">{formatPercent(results.apr)}</span>
          </div>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Amortization Schedule (First 12 Payments)</h4>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {results.amortizationSchedule.slice(0, 12).map((payment) => (
              <div key={payment.payment} className="result-item">
                <span className="result-label">Payment {payment.payment}:</span>
                <span className="result-value">
                  {formatCurrency(payment.principal)} principal, {formatCurrency(payment.interest)} interest
                </span>
              </div>
            ))}
            {results.amortizationSchedule.length > 12 && (
              <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
                ... and {results.amortizationSchedule.length - 12} more payments
              </div>
            )}
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default PersonalLoanCalculator; 