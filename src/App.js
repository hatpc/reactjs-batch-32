import { Routes, Route } from 'react-router-dom';

import TodoPage from './pages/todo';
import HomePage from './pages/home';
import AuthLayout from './components/layout/auth';

import { LOCATION } from './constants/index';

import './App.css';

function App() { // = Home Page

  return (
    <>
          <Routes>
            <Route path={LOCATION.HOME} element={<AuthLayout />}>
              <Route index element={<HomePage />} />
              <Route path={LOCATION.TODO} element={<TodoPage />} />
            </Route>
          </Routes>
    </>
  );
}

export default App;
