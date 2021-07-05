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
import CreditDiv from './Components/CeditDiv/CreditDiv';
import MemoryFullAlbum from './Components/MemoryFullAlbum/MemoryFullAlbum';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import ViewBlog from './Components/Blogs/ViewBlog';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiResponses: ""};
  }

  callAPI = () => {
    fetch('http://localhost:9000/')
      .then(res => res.text())
      .then(res => console.log('api response', res));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        
        <div className="scroll-up-btn">
          <i className="fas fa-angle-up"></i>
        </div>
        <Router>
          <ScrollToTop />
          <Header></Header>
          <Switch>
            <Route path={["/" , "/home" , "/Home"]} exact component={Home}/>
            <Route path={["/Gallery" , "/gallery" , "/photos"] }  component={Gallery}/>
            <Route path={["/Blogs" , "/blogs"]} component={Blogs}/>
            <Route path={["/Join-Us" , "/join-us" , "/Join-CUAC"]} component={JoinUs}/>
            <Route path={["/Gallery" , "/gallery" , "/photos" , "/Memories"] } exact component={Gallery}/>
            <Route path={["/Events" , "/events" , "/Tours" , "tours"]} exact component={Tours}/>
            <Route path={["/Blogs" , "/blogs"]} exact component={Blogs}/>
            <Route path={["/MemoriesOF/:MemoryName"]} component={MemoryFullAlbum}/>
            <Route path={['/view-blog', '/View-Blog', '/View-blog']} exact component={ViewBlog}></Route>
            {/* Brute-force styled, look into the root of the problem, delete this afterwards.*/}
            <div style={{marginTop: '96px'}}>
              <Route path={['/admin']} component={Admin}/>
            </div>
            <Route path={["/Join-us" , "/join-us" , "/Join-CUAC"]} exact component={JoinUs}/>
            
          </Switch>
          <Footer></Footer>
          <CreditDiv/>
        </Router>
      </div>
    );
  }
}

export default App;
