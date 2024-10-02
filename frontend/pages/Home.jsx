import { Link } from "react-router-dom";
import { Instructors } from "./InstructorsUi.jsx";
import "../home.css";

const Home = () => {
  return (
    <div className="pageWrapper">
      <div className="w-screen h-screen bg-no-repeat bg-left-bottom bg-[url('/spooky-hands.jpeg')] libreBaskervilleMediumFont homePageHandsImgDiv">
        {" "}
        <div className="spookyTimeIncDiv">
          <p className="sixCapsFont">Spooky Time Inc Presents...</p>
          <p className="libreBaskervilleLargeFont">
            Ripley&apos;s Survival BootCamp
          </p>
        </div>
      </div>
      <section
        className="missingPersonsImgSection"
        style={{
          backgroundImage: "url('./darkened-missing-persons-poster.svg')",
        }}
      >
        <div className="aboutBootcampDiv">
          <h2 className="sixCapsFont">About the BootCamp</h2>
          <p className="libreBaskervilleLargeFont">
            Are you tired of being the first to die in your favorite horror
            movies? Do you dream of outsmarting the killer, escaping the haunted
            house, or surviving the zombie apocalypse? Look no further than
            Ripley&apos;s Survival Bootcamp. Our intensive training program is
            designed to equip you with the skills and knowledge needed to
            survive the most terrifying scenarios. Led by experienced survival
            experts and former horror movie stars, our bootcamp offers a unique
            blend of practical training and theoretical knowledge.
          </p>
          <Link className="signUpLink sixCapsFont">Sign Up</Link>
        </div>
      </section>
      <Instructors />
    </div>
  );
};

export { Home };
