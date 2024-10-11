import "../courses.css";
import { Footer } from "../Layouts/Footer";

const Courses = () => {
  return (
    <>
      <main className="pageWrapper courseMasterDiv">
        <div className="selectInstructorDiv">
          <div className="courseTitlesDiv sixCapsFont">
            <p className="sixCapsFont">Find a Course</p>
          </div>
          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesEllenRipley.svg"
                alt="Ellen Ripley"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <div className="courseInstructorName">
                <h2 className="sixCapsFont">Ellen Ripley</h2>
                <p className="sixCapsFontSmaller">Alien</p>
              </div>
              <p>Course 1: Alien Survival</p>
              <p>Price: $230</p>
              <p>
                Learn from the iconic space marine, Ellen Ripley, as she teaches
                you the skills necessary to survive encounters with
                extraterrestrial threats, navigate hostile environments, and
                overcome fear in extreme situations.
              </p>
              <p>Course 2: Space Survival</p>
              <p>Price: $200</p>
              <p>
                Discover the challenges of space travel and learn how to prepare
                for emergencies, maintain spacecraft, and survive in isolated
                environments.
              </p>
            </div>
          </div>

          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesLaurieStrode.svg"
                alt="Ash Williams"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <h2 className="sixCapsFont">Laurie Strode</h2>
              <p className="sixCapsFontSmaller">Halloween</p>
              <p>Course 1: Slasher Survival Tactics</p>
              <p>Price: $300</p>
              <p>
                Learn from the ultimate slasher survivor, Laurie Strode, as she
                teaches you the essential skills to outwit and outlast a
                relentless killer.
              </p>
              <p>Course 2: Home Security and Prevention</p>
              <p>Price: $200</p>
              <p>
                Protect yourself and your loved ones with Laurie&apos;s expert
                guidance on home security, recognizing suspicious activity, and
                creating a personal safety plan.
              </p>
            </div>
          </div>

          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesAshWilliams.svg"
                alt="Ash Williams"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <h2 className="sixCapsFont">Ash Williams</h2>
              <p className="sixCapsFontSmaller">Evil Dead</p>
              <p>Course 1: Demonic Warfare</p>
              <p>Price: $300</p>
              <p>
                Join the chainsaw-wielding legend, Ash Williams, as he shares
                his hard-earned wisdom on battling demonic forces, using
                unconventional weaponry, and surviving the undead.
              </p>
              <p>Course 2: Humor as a Survival Tool</p>
              <h4>Price: $150</h4>
              <p>
                Discover the surprising power of laughter in the face of danger.
                Ash&apos;s infectious humor will teach you how to maintain a
                positive mindset and outsmart your enemies.
              </p>
            </div>
          </div>

          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesEdAndLorraineWarren.svg"
                alt="Ed and Lorraine Warren"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <h2 className="sixCapsFont">The Warrens</h2>
              <p className="sixCapsFontSmaller"> The Conjuring</p>
              <p>Course 1: Suburbia Survival</p>
              <p>Price: $250</p>
              <p>
                Uncover the hidden dangers lurking in seemingly normal suburbs.
                Learn from Chris Washington&apos;s experience to identify red
                flags, escape captivity, and protect yourself from psychological
                manipulation.
              </p>
            </div>
          </div>

          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesChrisWashington.svg"
                alt="Chris Washington"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <h2 className="sixCapsFont">Chris Washington</h2>
              <p className="sixCapsFontSmaller">Get Out</p>
              <p>Course 1: Suburbia Survival</p>
              <p>Price: $250</p>
              <p>
                Uncover the hidden dangers lurking in seemingly normal suburbs.
                Learn from Chris Washington&apos;s experience to identify red
                flags, escape captivity, and protect yourself from psychological
                manipulation.
              </p>

              <p>Course 2: Psychological Warfare</p>
              <p>Price: $350</p>
              <p>
                Understand the tactics of mind control and manipulation. Develop
                resilience, emotional fortitude, and strategies for
                psychological self-defense.
              </p>
            </div>
          </div>
          <div className="courseContainerDiv">
            <div className="courseInstructorTitleImgDiv">
              <img
                src="./CoursesYoichiAsakawa.svg"
                alt="Yoichi Asakawa"
                className="courseInstructorImgs"
              />
            </div>
            <div className="courseDescriptionDiv">
              <h2 className="sixCapsFont">Yoichi Asakawa</h2>
              <p className="sixCapsFontSmaller">The Ring</p>
              <p>Course 1: Supernatural Survival</p>
              <p>Price: $250</p>
              <p>
                Learn from the survivor of the cursed videotape, Yoichi Asakawa,
                as he shares his knowledge of the supernatural world, protection
                techniques, and how to escape cursed locations.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export { Courses };
