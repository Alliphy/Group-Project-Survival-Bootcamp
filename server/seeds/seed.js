import { db } from "../config/db.js";
import {
  Appointment,
  Avail,
  Client,
  Course,
  Instructor,
} from "../models/index.js";

await db.sync({ force: true });

const testUser = await Client.create({
  email: "test@test.com",
  firstName: "Test",
  lastName: "User",
  password: "test",
});

const instructorRipley = await Instructor.create({
  email: "eripley@stinc.com",
  firstName: "Ellen",
  lastName: "Ripley",
  password: "getawayfromher",
});
const instructorStrode = await Instructor.create({
  email: "lstrode@stinc.com",
  firstName: "Laurie",
  lastName: "Strode",
  password: "somebodywatchingme",
});
const instructorWilliams = await Instructor.create({
  email: "awilliams@stinc.com",
  firstName: "Ash",
  lastName: "Williams",
  password: "groovy",
});
const instructorWarrens = await Instructor.create({
  email: "enlwarrens@stinc.com",
  firstName: "Ed and Lorraine",
  lastName: "Warren",
  password: "banishye",
});
const instructorWashington = await Instructor.create({
  email: "cwashington@stinc.com",
  firstName: "Chris",
  lastName: "Washington",
  password: "getout",
});
const instructorAsakawa = await Instructor.create({
  email: "yasakawa@stinc.com",
  firstName: "Yoichi",
  lastName: "Asakawa",
  password: "sevendays",
});

const alienSurvival = await Course.create({
  title: "Alien Survival",
  description:
    "Learn from the iconic space marine, Ellen Ripley, as she teaches you the skills necessary to survive encounters with extraterrestrial threats, navigate hostile environments, and overcome fear in extreme situations.",
  instructorId: 1,
  price: 250,
});
const spaceSurvival = await Course.create({
  title: "Space Survival",
  description:
    "Discover the challenges of space travel and learn how to prepare for emergencies, maintain spacecraft, and survive in isolated environments.",
  instructorId: 1,
  price: 150,
});
const slasherSurvivalTactics = await Course.create({
  title: "Slasher Survival Tactics",
  description:
    "Learn from the ultimate slasher survivor, Laurie Strode, as she teaches you the essential skills to outwit and outlast a relentless killer.",
  instructorId: 2,
  price: 200,
});
const homeSecurityAndPrevention = await Course.create({
  title: "Home Security and Prevention",
  description:
    "Protect yourself and your loved ones with Laurie's expert guidance on home security, recognizing suspicious activity, and creating a personal safety plan.",
  instructorId: 2,
  price: 150,
});
const demonicWarfare = await Course.create({
  title: "Demonic Warfare",
  description:
    "Join the chainsaw-wielding legend, Ash Williams, as he shares his hard-earned wisdom on battling demonic forces, using unconventional weaponry, and surviving the undead.",
  instructorId: 3,
  price: 250,
});
const humorAsASurvivalTool = await Course.create({
  title: "Humor as a Survival Tool",
  description:
    "Discover the surprising power of laughter in the face of danger. Ash's infectious humor will teach you how to maintain a positive mindset and outsmart your enemies.",
  instructorId: 3,
  price: 100,
});
const paranormalInvestigations = await Course.create({
  title: "Paranormal Investigations",
  description:
    "Join renowned paranormal investigators Ed and Lorraine Warren for a deep dive into the world of ghosts, demons, and other supernatural entities. Learn how to conduct investigations, identify evidence, and protect yourself from negative influences.",
  instructorId: 4,
  price: 250,
});
const suburbiaSurvival = await Course.create({
  title: "Suburbia Survival",
  description:
    "Uncover the hidden dangers lurking in seemingly normal suburbs. Learn from Chris Washington's experience to identify red flags, escape captivity, and protect yourself from psychological manipulation.",
  instructorId: 5,
  price: 250,
});
const psychologicalWarfare = await Course.create({
  title: "Psychological Warfare",
  description:
    "Understand the tactics of mind control and manipulation. Develop resilience, emotional fortitude, and strategies for psychological self-defense.",
  instructorId: 5,
  price: 200,
});
const supernaturalSurvival = await Course.create({
  title: "Supernatural Survival",
  description:
    "Learn from the survivor of the cursed videotape, Yoichi Asakawa, as he shares his knowledge of the supernatural world, protection techniques, and how to escape cursed locations.",
  instructorId: 6,
  price: 250,
});

const testAppointment = await Appointment.create({
  date: "1999-12-31",
});

const testAvail = await Avail.create({
  date: "2000-01-01",
});

await instructorRipley.addAvail(testAvail, { through: testAppointment });

const getWeekdayObjects = () => {
  const startDate = new Date(); // Today's date
  const endDate = new Date("2024-11-30"); // End of November 2024
  const weekdaysArray = [];

  // Loop through each day from startDate to endDate
  while (startDate <= endDate) {
    const day = startDate.getDay();
    if (day !== 5 && day !== 6) {
      // Exclude Sundays (0) and Saturdays (6)
      // ^^NOTE^^ //
      // This does not work as originally thought. It was excluding Sundays and Mondays, NOT
      // Saturdays and Sundays. Making the numbers 5 an 6 made it work as intended.
      const dateString = startDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      //  Use Create method to make new entry in avails table
      const initDate = Avail.create({
        date: dateString,
        ripley: true,
        strode: true,
        williams: true,
        warrens: true,
        washington: true,
        asakawa: true,
      });
      weekdaysArray.push(
        // Push db entry
        initDate
      );
    }
    // Move to the next day
    startDate.setDate(startDate.getDate() + 1);
  }
  return weekdaysArray;
};

const availWeekdays = await Promise.all(getWeekdayObjects());

await db.close();
