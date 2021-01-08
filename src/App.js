import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AnswerList from './components/AnswerList/AnswerList';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Result from './components/Result/Result';

function App() {
  return (
    <div className="App">
     <Router>
     <Route path="/" exact render={(props) => <Login  {...props}/>} />
     <Route path="/exam" exact render={(props) => <AnswerList {...props}/>} />
     <Route path="/result/:id" exact render={(props) => <Result {...props}/>} />

    </Router>
    </div>
  );
}

export default App;
