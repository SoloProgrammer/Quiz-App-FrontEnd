import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import WebFormApp from './Apps/WebFormApp/WebFormApp';

function App() {
  return (
    <div className="App">
      <Router>
        <WebFormApp/>
      </Router>
    </div>
  );
}

export default App;
