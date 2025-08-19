import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface BudgetingFormData {
  annualIncome: string;
  monthlyDebts: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
}

interface BudgetingResults {
  maxHomePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  debtToIncomeRatio: number;
}

const BudgetingCalculator: React.FC = () => {
  const [formData, setFormData] = useState<BudgetingFormData>({
    annualIncome: '',
    monthlyDebts: '',
    downPayment: '',
    interestRate: '4.5',
    loanTerm: '30'
  });

  const [results, setResults] = useState<BudgetingResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateAffordability = () => {
    const annualIncome = parseFloat(formData.annualIncome);
    const monthlyDebts = parseFloat(formData.monthlyDebts);
    const downPayment = parseFloat(formData.downPayment);
    const interestRate = parseFloat(formData.interestRate);
    const loanTerm = parseInt(formData.loanTerm);

    if (isNaN(annualIncome) || isNaN(monthlyDebts) || isNaN(downPayment)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyIncome = annualIncome / 12;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Front-end ratio (housing costs): typically 28% of gross monthly income
    const maxHousingPayment = monthlyIncome * 0.28;
    
    // Back-end ratio (total debt): typically 36% of gross monthly income
    const maxTotalDebtPayment = monthlyIncome * 0.36;
    const maxLoanPayment = maxTotalDebtPayment - monthlyDebts;

    // Use the lower of the two ratios
    const maxMonthlyPayment = Math.min(maxHousingPayment, maxLoanPayment);

    // Calculate maximum loan amount using the payment formula
    // P = L[c(1 + c)^n]/[(1 + c)^n - 1] -> L = P[(1 + c)^n - 1]/[c(1 + c)^n]
    const maxLoanAmount = maxMonthlyPayment * 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) /
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments));

    const maxHomePrice = maxLoanAmount + downPayment;
    const debtToIncomeRatio = ((maxMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;

    setResults({
      maxHomePrice,
      maxLoanAmount,
      monthlyPayment: maxMonthlyPayment,
      debtToIncomeRatio
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <BaseCalculator
      title="House Affordability Calculator"
      description="Calculate how much house you can afford based on your income and expenses."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income ($)</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            placeholder="Enter your annual income"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyDebts">Monthly Debt Payments ($)</label>
          <input
            type="number"
            id="monthlyDebts"
            name="monthlyDebts"
            value={formData.monthlyDebts}
            onChange={handleInputChange}
            placeholder="Enter monthly debt payments"
            min="0"
            step="100"
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
            placeholder="Enter your down payment"
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
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateAffordability}>
          Calculate Affordability
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your House Affordability Results</h3>
          <div className="result-item">
            <span className="result-label">Maximum Home Price:</span>
            <span className="result-value">{formatCurrency(results.maxHomePrice)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Maximum Loan Amount:</span>
            <span className="result-value">{formatCurrency(results.maxLoanAmount)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Monthly Payment:</span>
            <span className="result-value">{formatCurrency(results.monthlyPayment)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Debt-to-Income Ratio:</span>
            <span className="result-value">{formatPercent(results.debtToIncomeRatio)}</span>
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default BudgetingCalculator; 