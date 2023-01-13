import { Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/SignupPage'
import Homepage from './Pages/Homepage';
import UserCreatedPage from './Pages/UserCreatedPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/success' element={<UserCreatedPage />} />
      </Routes>
    </>
  );
}

export default App;
