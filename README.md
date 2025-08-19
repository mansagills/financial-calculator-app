# Financial Calculators - financecalc.com

A comprehensive financial calculator web application built with React and TypeScript, designed to help users make informed financial decisions. The application features a clean, modern interface with vibrant colors and provides accurate calculations for various financial scenarios.

## Features

### 🏠 Mortgage Calculator
- Calculate monthly mortgage payments
- View total interest and payment breakdown
- Support for different loan terms (15, 20, 30 years)
- Input validation and error handling

### 📊 House Affordability Calculator
- Determine how much house you can afford
- Based on income, debt, and down payment
- Uses standard debt-to-income ratios
- Shows maximum loan amount and monthly payment

### 💳 Credit & Debt Calculator
- Calculate debt payoff timelines
- View total interest paid
- Support for different payment strategies
- Shows number of payments required

### 📈 Investment Calculator
- Compound interest calculations
- Support for regular contributions
- Multiple compounding frequencies
- Yearly growth projections

### 🎓 Student Loan Calculator
- Calculate monthly payments and total costs
- Support for different repayment plans
- Grace period considerations
- Amortization schedule

### ⏰ Retirement Calculator
- Determine retirement savings needs
- Account for inflation and social security
- Calculate required monthly contributions
- Show savings growth projections

### 📋 Tax Calculator
- Calculate federal and state tax liability
- Show marginal and effective tax rates
- Support for different filing statuses
- Tax bracket breakdown

### 👤 Life Insurance Calculator
- Determine appropriate coverage amounts
- Consider income replacement, debts, and education
- Estimate premium costs
- Coverage breakdown by category

### 💰 Personal Loan Calculator
- Calculate monthly payments and total costs
- Support for different loan purposes
- Credit score considerations
- Amortization schedule

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Deployment**: Ready for production build

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-calculator-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Project Structure

```
src/
├── components/
│   ├── CalculatorGrid.tsx          # Main calculator grid page
│   ├── BaseCalculator.tsx          # Base component for all calculators
│   └── calculators/
│       ├── MortgageCalculator.tsx
│       ├── BudgetingCalculator.tsx
│       ├── CreditDebtCalculator.tsx
│       ├── InvestmentCalculator.tsx
│       ├── StudentLoanCalculator.tsx
│       ├── RetirementCalculator.tsx
│       ├── TaxCalculator.tsx
│       ├── LifeInsuranceCalculator.tsx
│       └── PersonalLoanCalculator.tsx
├── App.tsx                         # Main app component with routing
├── App.css                         # Global styles
└── index.tsx                       # App entry point
```

## Design Features

### Branding & Styling
- Clean, minimalist white background
- Gold-toned circular icons with white illustrations
- Bold black titles and light gray descriptions
- Consistent typography using system fonts
- Responsive 3x3 grid layout

### User Experience
- Intuitive navigation with React Router
- Form validation and error handling
- Responsive design for mobile and desktop
- Hover effects and smooth transitions
- Accessible design with proper ARIA labels

### Calculator Features
- Real-time calculations
- Detailed breakdowns and schedules
- Currency formatting
- Percentage formatting
- Input validation and constraints

## Accessibility

The application is built with accessibility in mind:
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme

## SEO Optimization

- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- Descriptive page titles
- Structured content

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ by the financecalc.com team
