import './App.css';
// import CartApp from './Apps/CartApp/CartApp';
// import TodoApp from './Apps/TodoApp/TodoApp';
import { BrowserRouter as Router } from 'react-router-dom'
import WebFormApp from './Apps/WebFormApp/WebFormApp';
// import { Provider } from 'react-redux'
// import TodoStore from './Apps/TodoApp/Redux/store'
// import CartStore from './Apps/CartApp/Redux/store'

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Provider store={TodoStore}>
          <TodoApp />
        </Provider> */}
        {/* <Provider store={CartStore}>
          <CartApp />
        </Provider> */}
        <WebFormApp/>
      </Router>
    </div>
  );
}

export default App;
