import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Gallery from './Components/Gallery/Gallery';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Blogs from './Components/Blogs/Blogs';
import JoinUs from './Components/JoinUs/JoinUs';
import Admin from './Components/Admin/Admin';
import { AuthProvider } from './Utilities/Auth';

function App() {
  return (
    <div>
      <Header></Header>
      
      <Router>
        <Switch>
          <Route path={["/" , "/home" , "/Home"]} exact component={Home}/>
          <Route path={["/Gallery" , "/gallery" , "/photos"] }  component={Gallery}/>
          <Route path={["/Blogs" , "/blogs"]} component={Blogs}/>
          <Route path={["/Join-Us" , "/join-us" , "/Join-CUAC"]} component={JoinUs}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
