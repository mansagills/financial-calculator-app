import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface CreditDebtFormData {
  debtAmount: string;
  monthlyPayment: string;
  interestRate: string;
  paymentStrategy: string;
}

interface CreditDebtResults {
  totalPayments: number;
  totalInterest: number;
  payoffTime: number;
  yearsToPayoff: number;
  monthsToPayoff: number;
}

const CreditDebtCalculator: React.FC = () => {
  const [formData, setFormData] = useState<CreditDebtFormData>({
    debtAmount: '',
    monthlyPayment: '',
    interestRate: '',
    paymentStrategy: 'minimum'
  });

  const [results, setResults] = useState<CreditDebtResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDebtPayoff = () => {
    const debtAmount = parseFloat(formData.debtAmount);
    const monthlyPayment = parseFloat(formData.monthlyPayment);
    const interestRate = parseFloat(formData.interestRate);

    if (isNaN(debtAmount) || isNaN(monthlyPayment) || isNaN(interestRate)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    let remainingBalance = debtAmount;
    let totalInterest = 0;
    let paymentCount = 0;

    // Calculate how long it takes to pay off the debt
    while (remainingBalance > 0 && paymentCount < 600) { // Max 50 years
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      if (principalPayment <= 0) {
        alert('Your monthly payment is too low to pay off this debt. Please increase your payment amount.');
        return;
      }

      remainingBalance -= principalPayment;
      totalInterest += interestPayment;
      paymentCount++;
    }

    if (paymentCount >= 600) {
      alert('This debt cannot be paid off with the current payment amount. Please increase your monthly payment.');
      return;
    }

    const totalPayments = paymentCount * monthlyPayment;
    const yearsToPayoff = Math.floor(paymentCount / 12);
    const monthsToPayoff = paymentCount % 12;

    setResults({
      totalPayments,
      totalInterest,
      payoffTime: paymentCount,
      yearsToPayoff,
      monthsToPayoff
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (years: number, months: number) => {
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  return (
    <BaseCalculator
      title="Credit & Debt Calculator"
      description="Calculate the total interest and time it will take for you to pay off your debt."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="debtAmount">Total Debt Amount ($)</label>
          <input
            type="number"
            id="debtAmount"
            name="debtAmount"
            value={formData.debtAmount}
            onChange={handleInputChange}
            placeholder="Enter total debt amount"
            min="0"
            step="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyPayment">Monthly Payment ($)</label>
          <input
            type="number"
            id="monthlyPayment"
            name="monthlyPayment"
            value={formData.monthlyPayment}
            onChange={handleInputChange}
            placeholder="Enter monthly payment"
            min="0"
            step="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Annual Interest Rate (%)</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
            placeholder="Enter annual interest rate"
            min="0"
            max="50"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentStrategy">Payment Strategy</label>
          <select
            id="paymentStrategy"
            name="paymentStrategy"
            value={formData.paymentStrategy}
            onChange={handleInputChange}
          >
            <option value="minimum">Minimum Payment</option>
            <option value="fixed">Fixed Amount</option>
            <option value="aggressive">Aggressive Payoff</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateDebtPayoff}>
          Calculate Debt Payoff
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Debt Payoff Results</h3>
          <div className="result-item">
            <span className="result-label">Time to Payoff:</span>
            <span className="result-value">{formatTime(results.yearsToPayoff, results.monthsToPayoff)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Paid:</span>
            <span className="result-value">{formatCurrency(results.totalInterest)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Payments:</span>
            <span className="result-value">{formatCurrency(results.totalPayments)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Number of Payments:</span>
            <span className="result-value">{results.payoffTime}</span>
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default CreditDebtCalculator; 