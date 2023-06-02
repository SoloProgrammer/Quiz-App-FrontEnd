import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import QuizApp from './Apps/QuizApp/QuizApp';

function App() {
  return (
    <div className="App">
      <Router>
        <QuizApp/>
      </Router>
    </div>
  );
}

export default App;
