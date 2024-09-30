import "../courses.css";

const Courses = () => {
  return (
    <>
      <div className="pageWrapper courseMasterDiv">
        <div className="selectInstructorDiv">
          <div className="courseTitlesDiv sixCapsFont">
            <p>Find a Course</p>
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
              <h2 className="sixCapsFont">Ellen Ripley</h2>
              <h2 className="sixCapsFont">Alien</h2>
              <h4>Course 1: Alien Survival</h4>
              <h4>Price: $230</h4>
              <p>
                Learn from the iconic space marine, Ellen Ripley, as she teaches
                you the skills necessary to survive encounters with
                extraterrestrial threats, navigate hostile environments, and
                overcome fear in extreme situations.
              </p>
              <h4>Course 2: Space Survival</h4>
              <h4>Price: $200</h4>
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
              <h2 className="sixCapsFont">Halloween</h2>
              <h4>Course 1: Slasher Survival Tactics</h4>
              <h4>Price: $300</h4>
              <p>
                Learn from the ultimate slasher survivor, Laurie Strode, as she
                teaches you the essential skills to outwit and outlast a
                relentless killer.
              </p>
              <h4>Course 2: Home Security and Prevention</h4>
              <h4>Price: $200</h4>
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
              <h2 className="sixCapsFont">Evil Dead</h2>
              <h4>Course 1: Demonic Warfare</h4>
              <h4>Price: $300</h4>
              <p>
                Join the chainsaw-wielding legend, Ash Williams, as he shares
                his hard-earned wisdom on battling demonic forces, using
                unconventional weaponry, and surviving the undead.
              </p>
              <h4>Course 2: Humor as a Survival Tool</h4>
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
              <h2 className="sixCapsFont"> The Conjuring</h2>
              <h4>Course 1: Suburbia Survival</h4>
              <h4>Price: $250</h4>
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
              <h2 className="sixCapsFont">Get Out</h2>
              <h4>Course 1: Suburbia Survival</h4>
              <h4>Price: $250</h4>
              <p>
                Uncover the hidden dangers lurking in seemingly normal suburbs.
                Learn from Chris Washington&apos;s experience to identify red
                flags, escape captivity, and protect yourself from psychological
                manipulation.
              </p>

              <h4>Course 2: Psychological Warfare</h4>
              <h4>Price: $350</h4>
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
              <h2 className="sixCapsFont">The Ring</h2>
              <h4>Course 1: Supernatural Survival</h4>
              <h4>Price: $250</h4>
              <p>
                Learn from the survivor of the cursed videotape, Yoichi Asakawa,
                as he shares his knowledge of the supernatural world, protection
                techniques, and how to escape cursed locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Courses };
