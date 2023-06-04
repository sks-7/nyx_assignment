import './App.css';
import { Route, Routes } from 'react-router-dom';
import UpdatePage from './pages/UpdatePage';
import RecordPage from './pages/RecordPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecordPage />} />
        <Route path="/edit/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;
