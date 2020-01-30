import React from 'react';
import './App.scss';
import Root from './Root';
import AuthState from './Context/auth/AuthState';
import InvoiceState from './Context/invoice/InvoiceState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('xtoken')) {
  setAuthToken(localStorage.getItem('xtoken'));
}

function App() {
  return (
    <AuthState>
      <InvoiceState>
        <Root />
      </InvoiceState>
    </AuthState>

  );
}

export default App;
