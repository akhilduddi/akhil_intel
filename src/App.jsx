import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import ModuleView from './components/ModuleView';
import TestQuestion from './components/TestQuestion';
import TestResults from './components/TestResults';
import './styles/layout.css';
import Home from './components/Home';
import DiscoverYourSelf from './components/DiscoverYourSelf';
import Supreme from './components/Supreme';
import Material from './components/Material';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/materials" element={<Material />} />

            {/* Protected Routes */}
            <Route path="/discover-yourself" element={
              <ProtectedRoute>
                <DiscoverYourSelf />
              </ProtectedRoute>
            } />
            <Route path="/supreme" element={
              <ProtectedRoute>
                <Supreme />
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/module/:id" element={
              <ProtectedRoute>
                <ModuleView />
              </ProtectedRoute>
            } />
            <Route path="/test/:id" element={
              <ProtectedRoute>
                <TestQuestion />
              </ProtectedRoute>
            } />
            <Route path="/results/:id" element={
              <ProtectedRoute>
                <TestResults />
              </ProtectedRoute>
            } />
            <Route path="/testQuestions" element={
              <ProtectedRoute>
                <TestQuestion />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;