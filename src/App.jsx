
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageGallery from './ImageGallery'
import HomePage from './Homepage';
import AuthenticationPage from './AuthenticationPage';

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
