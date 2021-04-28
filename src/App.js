import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Gallery from './Components/Gallery/Gallery';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Blogs from './Components/Blogs/Blogs';
import JoinUs from './Components/JoinUs/JoinUs';
import Admin from './Components/Admin/Admin';
import { AuthProvider } from './Utilities/Auth';
import Tours from './Components/Tours/Tours';

function App() {
  return (
    <div>
      
      <div className="scroll-up-btn">
        <i className="fas fa-angle-up"></i>
      </div>
      
      <Router>
        <Switch>
          <Route path={["/" , "/home" , "/Home"]} exact component={Home}/>
          <Route path={["/Gallery" , "/gallery" , "/photos"] }  component={Gallery}/>
          <Route path={["/Blogs" , "/blogs"]} component={Blogs}/>
          <Route path={["/Join-Us" , "/join-us" , "/Join-CUAC"]} component={JoinUs}/>
          <Route path='/admin' component={Admin}/>
          <Route path={["/Gallery" , "/gallery" , "/photos" , "/Memories"] } exact component={Gallery}/>
          <Route path={["/Events" , "/events" , "/Tours" , "tours"]} exact component={Tours}/>
          <Route path={["/Blogs" , "/blogs"]} exact component={Blogs}/>
          <Route path={["/Join-us" , "/join-us" , "/Join-CUAC"]} exact component={JoinUs}/>
        </Switch>
        <Footer></Footer>
      </Router>
      
    </div>
  );
}

export default App;
