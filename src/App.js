import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AnswerList from './components/AnswerList/AnswerList';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Router>
     <Route path="/" exact render={(props) => <Login  {...props}/>} />
     <Route path="/exam" exact render={(props) => <AnswerList {...props}/>} />

    </Router>
    </div>
  );
}

export default App;
