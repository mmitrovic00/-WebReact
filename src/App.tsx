import React from 'react';
import './App.css';
import AppRoutes from './Routes';
import { RecoilRoot } from "recoil"

function App() {
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  );
}

export default App;
