import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import CreateMappingPage from './pages/CreateMappingPage';
import EditMappingPage from './pages/EditMappingPage';
import HomePage from './pages/HomePage';
import RequestsPage from './pages/RequestsPage';

function App() {
  return (
    <Router>
      <div className="h-full flex flex-col">
        <Header />
        <main className="main-content flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateMappingPage />} />
            <Route path="/edit/:id" element={<EditMappingPage />} />
            <Route path="/requests" element={<RequestsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 