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
import Tours from './Components/Tours/Tours';
import $ from 'jquery';

function App() {
  $(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.header').addClass('scrollChange');
        }else{
            $('.header').removeClass('scrollChange');
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    $('.menu-btn').click(function(){
      $('.header .menu').toggleClass('active');
      $('.menu-btn i').toggleClass('active');
      });
  });
  return (
    <div>
      <div className="scroll-up-btn">
        <i className="fas fa-angle-up"></i>
      </div>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path={["/" , "/home" , "/Home"]} exact component={Home}/>
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
