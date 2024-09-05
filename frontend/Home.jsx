import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section
        className="missingPersonsImgSection"
        style={{
          backgroundImage: "url('./darkened-missing-persons-poster.svg')",
        }}
      >
        <div className="tempParent"></div>
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
      <section className="instructorSection">
        <h2 className="sixCapsFont pb-5">Instructors</h2>
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Ellen Ripley</h3>
          <h3 className="sixCapsFont movieTitle">Aliens</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Ellen Ripley from Aliens film"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./EllenRipley.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Stealth and evasion: Learned to move silently and avoid
                    detection in order to outsmart the enemy.
                  </li>
                  <li>
                    Combat tactics: Encounters with the Xenomorphs developed
                    effective combat strategies, including using improvised
                    weapons and understanding the enemies&apos; vulnerabilities.{" "}
                  </li>
                  <li>
                    Leadership and teamwork: Demonstrates exceptional leadership
                    skills and the ability to inspire and motivate others to
                    work together.{" "}
                  </li>
                  <li>
                    Resilience and adaptability: Staying calm under pressure,
                    adapting to changing circumstances, and never giving up.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            Ellen Ripley, a former Warrant Officer and commercial spacecraft
            pilot, has become a legend in the horror movie world. Her survival
            against the deadly Xenomorphs in the sci-fi horror film Aliens
            solidified her status as a fierce and resourceful hero. After her
            harrowing experience on LV-426, Ripley found herself haunted by the
            memories of the creatures she had faced. Driven by a desire to
            ensure others were prepared for such dangers, she founded
            Ripley&apos;s Survival Bootcamp. Her firsthand knowledge of the
            Xenomorphs and their tactics makes her uniquely qualified to train
            others in the art of survival.
          </p>
        </div>
      </section>

      <section className="instructorSection">
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Laurie Strode</h3>
          <h3 className="sixCapsFont movieTitle">Halloween Franchise</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Laurie Strode from Halloween franchise"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./LaurieStrode.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Real-world experience: First-hand knowledge of surviving a
                    relentless killer, and vicious stalker.
                  </li>
                  <li>
                    Intuition and survival instincts: Ability to anticipate
                    danger and react swiftly to any situation.
                  </li>
                  <li>
                    Resilience and determination: Unwavering spirit in the face
                    of adversity. Show no fear in the face of adversary.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            Laurie Strode, a survivor of multiple encounters with the infamous
            Michael Myers, brings a unique perspective to our course on
            surviving the slasher. Having faced unimaginable horror, she has
            developed unparalleled instincts for self-preservation and
            situational awareness. Her resilience and unwavering determination
            make her the perfect guide for those seeking to navigate the
            terrifying world of slasher films.
          </p>
        </div>
      </section>

      <section className="instructorSection">
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Ash Williams</h3>
          <h3 className="sixCapsFont movieTitle">Evil Dead</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Ellen Ripley from Aliens film"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./AshWilliams.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Combat expertise: Proficient in various weapons, including
                    the iconic chainsaw seen in Evil Dead.
                  </li>
                  <li>
                    Humor and wit: Ability to maintain a positive attitude in
                    dire situations. A good attitude can go a long way.
                  </li>
                  <li>
                    Quick thinking and adaptability: Capacity to devise creative
                    solutions to perilous problems. Find a use out of what is
                    nearby.
                  </li>
                  <li>
                    Resilience and adaptability: Staying calm under pressure,
                    adapting to changing circumstances, and never giving up.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            A chainsaw-wielding legend in the fight against demonic forces, Ash
            Williams brings a blend of humor and horror to our course on
            surviving demons and deadites. His countless battles with the undead
            have honed his skills in combat, weaponry, and quick thinking.
            Ash&apos;s infectious personality and unconventional approach to
            survival make him an entertaining and informative instructor.
          </p>
        </div>
      </section>

      <section className="instructorSection">
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Ed and Lorraine Warren</h3>
          <h3 className="sixCapsFont movieTitle">The Conjuring Franchise</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Ellen Ripley from Aliens film"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./EdAndLorraineWarren.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Decades of experience: Extensive knowledge of paranormal
                    phenomena and investigations.
                  </li>
                  <li>
                    Spiritual understanding: Deep understanding of the nature of
                    good and evil. Ability to discern between friendly or
                    unfriendly entities.
                  </li>
                  <li>
                    Practical advice: Proven techniques for protecting oneself
                    from supernatural threats.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            Renowned paranormal investigators Ed and Lorraine Warren bring
            decades of experience and expertise to our course on surviving the
            paranormal. Their investigations into haunted locations have given
            them a unique perspective on the world of ghosts, demons, and other
            supernatural entities. The Warrens&apos; knowledge of exorcisms,
            spiritual protection, and the history of hauntings make them
            invaluable guides for anyone facing the unknown.
          </p>
        </div>
      </section>

      <section className="instructorSection">
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Chris Washington</h3>
          <h3 className="sixCapsFont movieTitle">Get Out</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Ellen Ripley from Aliens film"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./ChrisWashington.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Critical thinking: Ability to analyze situations and
                    identify hidden threats. Ability to keep cool when under
                    mental duress.
                  </li>
                  <li>
                    Observation skills: Keen eye for detail and subtle clues.
                    Suitable process to observe those around you and their
                    truest intentions.
                  </li>
                  <li>
                    Self-preservation: Instinctive drive to protect oneself from
                    harm. Trusting a gut feeling and assessing if the situation
                    is safe.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            As a survivor of a sinister social experiment, Chris Washington
            brings a unique perspective to our course on surviving the suburbs.
            His experience with the sinister intentions of a seemingly normal
            family has taught him the importance of trust, observation, and
            self-preservation. Chris&apos;s ability to think critically and
            identify hidden dangers makes him the perfect guide for anyone
            navigating the potentially perilous world of suburbia.
          </p>
        </div>
      </section>

      <section className="instructorSection">
        <div className="instructorLabelDiv">
          <h3 className="sixCapsFont">Yoichi Asakawa</h3>
          <h3 className="sixCapsFont movieTitle">The Ring</h3>
        </div>
        <div className="instructorMasterDiv">
          <div className="bulletPointAndImgDiv">
            <div>
              <div
                alt="image of Ellen Ripley from Aliens film"
                className="instructorImgsDiv"
                style={{
                  backgroundImage: "url('./YoichiAsakawa.svg')",
                }}
              >
                {" "}
                <div className="listDiv">
                  <li>
                    Supernatural knowledge: Understanding of the rules and
                    dangers of the paranormal. Strategies developed for
                    surviving being targeted by a demonic spirit.
                  </li>
                  <li>
                    Cautionary tales: Real-world examples of the consequences of
                    ignoring supernatural warnings. Ability to acknowledge when
                    to take action against spiritual powers.
                  </li>
                  <li>
                    Intuition and foresight: Ability to sense impending danger
                    and take preventative measures. Using your mental skill as
                    apposed to physical skill to fight the enemy.
                  </li>
                </div>
              </div>
            </div>
          </div>
          <p>
            As a survivor of the cursed videotape, Yoichi Asakawa brings a
            chilling firsthand account to our course on surviving supernatural
            horrors. His experience with the malevolent Sadako Yamamura has
            equipped him with a deep understanding of the supernatural and the
            lengths to which evil entities will go to claim their victims.
            Yoichi&apos;s knowledge and cautionary tales are essential for
            anyone seeking to navigate the terrifying world of the unknown.
          </p>
        </div>
      </section>
    </div>
  );
};

export { Home };
