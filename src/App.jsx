
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageGallery from './components/auth/ImageGallery'
import HomePage from './components/Homepage';
import AuthenticationPage from './components/auth/AuthenticationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imagegallery" element={<ImageGallery />} />
        <Route path="/authenticate" element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
