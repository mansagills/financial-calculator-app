import React, { useState } from 'react';
import BaseCalculator from '../BaseCalculator';

interface LifeInsuranceFormData {
  age: string;
  annualIncome: string;
  spouseIncome: string;
  children: string;
  mortgage: string;
  otherDebts: string;
  funeralExpenses: string;
  educationCosts: string;
  yearsOfCoverage: string;
  existingCoverage: string;
}

interface LifeInsuranceResults {
  recommendedCoverage: number;
  incomeReplacement: number;
  debtCoverage: number;
  educationCoverage: number;
  finalExpenses: number;
  monthlyPremium: number;
  annualPremium: number;
}

const LifeInsuranceCalculator: React.FC = () => {
  const [formData, setFormData] = useState<LifeInsuranceFormData>({
    age: '',
    annualIncome: '',
    spouseIncome: '',
    children: '0',
    mortgage: '',
    otherDebts: '',
    funeralExpenses: '10000',
    educationCosts: '0',
    yearsOfCoverage: '20',
    existingCoverage: '0'
  });

  const [results, setResults] = useState<LifeInsuranceResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLifeInsurance = () => {
    const age = parseInt(formData.age);
    const annualIncome = parseFloat(formData.annualIncome);
    const spouseIncome = parseFloat(formData.spouseIncome);
    const children = parseInt(formData.children);
    const mortgage = parseFloat(formData.mortgage);
    const otherDebts = parseFloat(formData.otherDebts);
    const funeralExpenses = parseFloat(formData.funeralExpenses);
    const educationCosts = parseFloat(formData.educationCosts);
    const yearsOfCoverage = parseInt(formData.yearsOfCoverage);
    const existingCoverage = parseFloat(formData.existingCoverage);

    if (isNaN(age) || isNaN(annualIncome)) {
      alert('Please fill in all required fields with valid numbers');
      return;
    }

    // Calculate income replacement (typically 10x annual income)
    const incomeReplacement = annualIncome * 10;

    // Calculate debt coverage
    const debtCoverage = mortgage + otherDebts;

    // Calculate education costs (if children exist)
    const educationCoverage = children > 0 ? educationCosts * children : 0;

    // Final expenses
    const finalExpenses = funeralExpenses;

    // Total recommended coverage
    const recommendedCoverage = incomeReplacement + debtCoverage + educationCoverage + finalExpenses - existingCoverage;

    // Calculate estimated premium (simplified calculation based on age and coverage)
    const baseRate = age < 30 ? 0.0005 : 
                    age < 40 ? 0.0008 : 
                    age < 50 ? 0.0012 : 
                    age < 60 ? 0.002 : 0.003;
    
    const monthlyPremium = recommendedCoverage * baseRate / 12;
    const annualPremium = monthlyPremium * 12;

    setResults({
      recommendedCoverage,
      incomeReplacement,
      debtCoverage,
      educationCoverage,
      finalExpenses,
      monthlyPremium,
      annualPremium
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
      title="Life Insurance Calculator"
      description="Find a personalized policy that meets your needs."
    >
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="age">Your Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            min="18"
            max="80"
            step="1"
          />
        </div>

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
          <label htmlFor="spouseIncome">Spouse Annual Income ($)</label>
          <input
            type="number"
            id="spouseIncome"
            name="spouseIncome"
            value={formData.spouseIncome}
            onChange={handleInputChange}
            placeholder="Enter spouse's annual income"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="children">Number of Children</label>
          <input
            type="number"
            id="children"
            name="children"
            value={formData.children}
            onChange={handleInputChange}
            placeholder="Enter number of children"
            min="0"
            max="10"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mortgage">Mortgage Balance ($)</label>
          <input
            type="number"
            id="mortgage"
            name="mortgage"
            value={formData.mortgage}
            onChange={handleInputChange}
            placeholder="Enter mortgage balance"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="otherDebts">Other Debts ($)</label>
          <input
            type="number"
            id="otherDebts"
            name="otherDebts"
            value={formData.otherDebts}
            onChange={handleInputChange}
            placeholder="Enter other debts"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="educationCosts">Education Costs per Child ($)</label>
          <input
            type="number"
            id="educationCosts"
            name="educationCosts"
            value={formData.educationCosts}
            onChange={handleInputChange}
            placeholder="Enter education costs per child"
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearsOfCoverage">Years of Coverage Needed</label>
          <select
            id="yearsOfCoverage"
            name="yearsOfCoverage"
            value={formData.yearsOfCoverage}
            onChange={handleInputChange}
          >
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="existingCoverage">Existing Life Insurance ($)</label>
          <input
            type="number"
            id="existingCoverage"
            name="existingCoverage"
            value={formData.existingCoverage}
            onChange={handleInputChange}
            placeholder="Enter existing coverage"
            min="0"
            step="1000"
          />
        </div>

        <button className="calculate-btn" onClick={calculateLifeInsurance}>
          Calculate Life Insurance Needs
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Your Life Insurance Results</h3>
          <div className="result-item">
            <span className="result-label">Recommended Coverage:</span>
            <span className="result-value">{formatCurrency(results.recommendedCoverage)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Estimated Monthly Premium:</span>
            <span className="result-value">{formatCurrency(results.monthlyPremium)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Estimated Annual Premium:</span>
            <span className="result-value">{formatCurrency(results.annualPremium)}</span>
          </div>
          
          <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Coverage Breakdown</h4>
          <div className="result-item">
            <span className="result-label">Income Replacement:</span>
            <span className="result-value">{formatCurrency(results.incomeReplacement)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Debt Coverage:</span>
            <span className="result-value">{formatCurrency(results.debtCoverage)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Education Coverage:</span>
            <span className="result-value">{formatCurrency(results.educationCoverage)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Final Expenses:</span>
            <span className="result-value">{formatCurrency(results.finalExpenses)}</span>
          </div>
        </div>
      )}
    </BaseCalculator>
  );
};

export default LifeInsuranceCalculator; 