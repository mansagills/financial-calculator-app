import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CalculatorGrid from './components/CalculatorGrid';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import BudgetingCalculator from './components/calculators/BudgetingCalculator';
import CreditDebtCalculator from './components/calculators/CreditDebtCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import StudentLoanCalculator from './components/calculators/StudentLoanCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import TaxCalculator from './components/calculators/TaxCalculator';
import LifeInsuranceCalculator from './components/calculators/LifeInsuranceCalculator';
import PersonalLoanCalculator from './components/calculators/PersonalLoanCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CalculatorGrid />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/budgeting" element={<BudgetingCalculator />} />
          <Route path="/credit-debt" element={<CreditDebtCalculator />} />
          <Route path="/investments" element={<InvestmentCalculator />} />
          <Route path="/student-loans" element={<StudentLoanCalculator />} />
          <Route path="/retirement" element={<RetirementCalculator />} />
          <Route path="/taxes" element={<TaxCalculator />} />
          <Route path="/life-insurance" element={<LifeInsuranceCalculator />} />
          <Route path="/personal-loan" element={<PersonalLoanCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
