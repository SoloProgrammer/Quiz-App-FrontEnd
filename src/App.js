import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import QuizApp from './Apps/QuizApp/QuizApp';
import store from './Apps/QuizApp/Redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <QuizApp />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
