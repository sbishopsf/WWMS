import './styles/globals.css';
import React from 'react';
import QuoteGenerator from './components/QuoteGenerator';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <QuoteGenerator />
    </div>
  );
}

export default App;