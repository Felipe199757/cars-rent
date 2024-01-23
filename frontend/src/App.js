import { BrowserRouter as Router} from 'react-router-dom'
// import { Link } from 'react-router-dom';
import React from 'react'
import Home from './components/pages/Home';
function App() {
  return (
   <Router>
      <Home/>
   </Router>
    );
}

export default App;
