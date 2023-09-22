
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageGallery from './ImageGallery'
import HomePage from './Homepage';
import SignUp from './SignUp'
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imagegallery" element={<ImageGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path='/sign-up'      element= {<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
