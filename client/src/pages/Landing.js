import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../components";

export default function Landing() {
  return (
    <Wrapper>
      <main>
        <nav>
        <Logo/>
        </nav>
        <div className="container page">
          {/* info*/}
          <div className="info">
            <h1>
              job <span>tracking</span> App
            </h1>
            <p>
              I'm baby kinfolk franzen humblebrag chicharrones artisan listicle
              leggings scenester blackbird spyplane gentrify 90's master
              cleanse. Try-hard williamsburg enamel pin tbh yes plz, hammock
              leggings kogi iPhone knausgaard authentic adaptogen. Kogi
              asymmetrical migas sriracha jawn, subway tile poke sartorial
              tattooed cliche pinterest put a bird on it hella four dollar
              toast. Direct trade mustache solarpunk YOLO, distillery cornhole
              woke ascot gochujang man bun. Gluten-free cupping shoreditch la
              croix. Air plant chia hell of lumbersexual brunch.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  );
}
