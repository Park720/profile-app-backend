import HomeClient from './HomeClient';

export const metadata = {
  title: "Profile App",
  description: "Purdue Profile Application",
};

const dummyProfiles = [
  { id: 0, name: "Jane Foster", year: "Freshman", major: "Game Development", email: "foster@purdue.edu" },
  { id: 1, name: "John Doe", year: "Sophomore", major: "Web Programming", email: "doe@purdue.edu" },
  { id: 2, name: "Olivia Smith", year: "Junior", major: "UI/UX Design", email: "smith@purdue.edu" },
  { id: 3, name: "Michael Brown", year: "Senior", major: "Cybersecurity", email: "brown@purdue.edu" },
];

export default function Home() {
  return (
    <main>
      <h1>Student Profiles</h1>
      <HomeClient profiles={dummyProfiles} />
    </main>
  );
}