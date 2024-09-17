import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StaffPage from './components/staffPage/staffPage';
import CardDetailsPage from './components/cardDetailsPage/cardDetailsPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Header } from './components/header/header';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<StaffPage />} />
          <Route path="/card/:id" element={<CardDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
