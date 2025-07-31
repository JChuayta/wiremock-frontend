import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import CreateMappingPage from './pages/CreateMappingPage';
import EditMappingPage from './pages/EditMappingPage';
import HomePage from './pages/HomePage';
import RequestsPage from './pages/RequestsPage';
import ViewMappingPage from './pages/ViewMappingPage';
import ViewRequestPage from './pages/ViewRequestPage';

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
            <Route path="/mapping/:id" element={<ViewMappingPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/request/:id" element={<ViewRequestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 