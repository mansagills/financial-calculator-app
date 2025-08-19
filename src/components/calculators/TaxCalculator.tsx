import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface TaxFormData {
  filingStatus: string;
  annualIncome: string;
  deductions: string;
  state: string;
}

interface TaxResults {
  taxableIncome: number;
  marginalTaxRate: number;
  effectiveTaxRate: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  takeHomePay: number;
  taxBrackets: Array<{
    bracket: string;
    rate: number;
    amount: number;
  }>;
}

const TaxCalculator: React.FC = () => {
  const [formData, setFormData] = useState<TaxFormData>({
    filingStatus: 'single',
    annualIncome: '',
    deductions: '12950',
    state: 'none'
  });

  const [results, setResults] = useState<TaxResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 2024 Federal Tax Brackets
  const getTaxBrackets = (filingStatus: string) => {
    switch (filingStatus) {
      case 'single':
        return [
          { min: 0, max: 11600, rate: 10 },
          { min: 11600, max: 47150, rate: 12 },
          { min: 47150, max: 100525, rate: 22 },
          { min: 100525, max: 191950, rate: 24 },
          { min: 191950, max: 243725, rate: 32 },
          { min: 243725, max: 609350, rate: 35 },
          { min: 609350, max: Infinity, rate: 37 }
        ];
      case 'married':
        return [
          { min: 0, max: 23200, rate: 10 },
          { min: 23200, max: 94300, rate: 12 },
          { min: 94300, max: 201050, rate: 22 },
          { min: 201050, max: 383900, rate: 24 },
          { min: 383900, max: 487450, rate: 32 },
          { min: 487450, max: 731200, rate: 35 },
          { min: 731200, max: Infinity, rate: 37 }
        ];
      default:
        return [];
    }
  };

  const calculateTax = () => {
    const annualIncome = parseFloat(formData.annualIncome);
    const deductions = parseFloat(formData.deductions);
    const filingStatus = formData.filingStatus;

    if (isNaN(annualIncome) || isNaN(deductions)) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const taxableIncome = Math.max(0, annualIncome - deductions);
    const brackets = getTaxBrackets(filingStatus);
    
    let federalTax = 0;
    let marginalTaxRate = 0;
    const taxBrackets: Array<{
      bracket: string;
      rate: number;
      amount: number;
    }> = [];

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      const prevBracket = i > 0 ? brackets[i - 1] : { min: 0, max: 0, rate: 0 };
      
      if (taxableIncome > bracket.min) {
        const bracketAmount = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
        const bracketTax = bracketAmount * (bracket.rate / 100);
        federalTax += bracketTax;
        
        taxBrackets.push({
          bracket: `${formatCurrency(bracket.min)} - ${bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}`,
          rate: bracket.rate,
          amount: bracketTax
        });

        if (taxableIncome <= bracket.max) {
          marginalTaxRate = bracket.rate;
        }
      }
    }

    // Calculate state tax (simplified - using average state tax rate of 5%)
    const stateTaxRate = formData.state === 'none' ? 0 : 0.05;
    const stateTax = taxableIncome * stateTaxRate;
    const totalTax = federalTax + stateTax;
    const effectiveTaxRate = (totalTax / annualIncome) * 100;
    const takeHomePay = annualIncome - totalTax;

    setResults({
      taxableIncome,
      marginalTaxRate,
      effectiveTaxRate,
      federalTax,
      stateTax,
      totalTax,
      takeHomePay,
      taxBrackets
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
      title="Tax Calculator"
      description="Understand marginal and effective tax rates and your annual tax liability."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="filingStatus">Filing Status</label>
          <select
            id="filingStatus"
            name="filingStatus"
            value={formData.filingStatus}
            onChange={handleInputChange}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head">Head of Household</option>
            <option value="separate">Married Filing Separately</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income ($)</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            placeholder="Enter annual income"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deductions">Standard Deduction ($)</label>
          <input
            type="number"
            id="deductions"
            name="deductions"
            value={formData.deductions}
            onChange={handleInputChange}
            placeholder="Enter deductions"
            min="0"
            step="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State of Residence</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="none">No State Tax</option>
            <option value="california">California</option>
            <option value="newyork">New York</option>
            <option value="texas">Texas</option>
            <option value="florida">Florida</option>
            <option value="other">Other State</option>
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateTax}>
          Calculate Tax Liability
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Tax Results</h3>
          <div className="result-item">
            <span className="result-label">Taxable Income:</span>
            <span className="result-value">{formatCurrency(results.taxableIncome)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Marginal Tax Rate:</span>
            <span className="result-value">{formatPercent(results.marginalTaxRate)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Effective Tax Rate:</span>
            <span className="result-value">{formatPercent(results.effectiveTaxRate)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Federal Tax:</span>
            <span className="result-value">{formatCurrency(results.federalTax)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">State Tax:</span>
            <span className="result-value">{formatCurrency(results.stateTax)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Tax:</span>
            <span className="result-value">{formatCurrency(results.totalTax)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Take Home Pay:</span>
            <span className="result-value">{formatCurrency(results.takeHomePay)}</span>
          </div>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Tax Bracket Breakdown</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {results.taxBrackets.map((bracket, index) => (
              <div key={index} className="result-item">
                <span className="result-label">{bracket.bracket} ({formatPercent(bracket.rate)}):</span>
                <span className="result-value">{formatCurrency(bracket.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default TaxCalculator; 