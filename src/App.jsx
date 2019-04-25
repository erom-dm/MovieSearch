import React from 'react';
import Header from './components/Header';
import Main from './components/MainWindow';
import Footer from './components/Footer';
import './App.css';

const App = () => (
  <div className="app-container">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
