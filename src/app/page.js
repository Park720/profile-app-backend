import styles from "./page.module.css";
import cardStyles from "@/app/components/Card.module.css";
import Link from "next/link";
import Filters from "@/app/components/Filters";
import prisma from '@/app/lib/prisma'
import CardContainer from "./components/CardContainer";

export const runtime = "nodejs";

async function fetchTitles() {
  const data = await prisma.profiles.findMany({
    distinct: ["title"],
    select: { title: true },
  });
  return data ? data.map((t) => t.title) : [];
}
async function getData({ title, search }) {
  const profiles = await prisma.profiles.findMany({
    where: {
      ...(title && { title: { contains: title, mode: "insensitive" } }),
      ...(search && { name: { contains: search, mode: "insensitive" } }),
    },
  });
  return profiles;
}
export default async function Home({ searchParams }) {
  const searchParamsData = await searchParams;
  const selectedTitle = searchParamsData?.title || "";
  const search = searchParamsData?.search || "";
  const [titles, profiles] = await Promise.all([
    fetchTitles(),
    getData({ title: selectedTitle, search }),
  ]);

  return (
    <main className={styles.main}>
      <h1>Profile App </h1>
      <div className="section">
        <div className="container">
          <CardContainer>
            <Filters titles={titles} title={selectedTitle} search={search} />
            {profiles.length === 0 ? (
              <p>No profiles found.</p>
            ) : (
              <div className="grid">
                {profiles.map((profile) => (
                  <Link key={profile.id} href={`/profile/${profile.id}`}>
                    <div className={cardStyles.profileCard}>
                      <img
                        src={profile.image_url || "/vercel.svg"}
                        alt={profile.name}
                      />
                      <div>
                        <p>{profile.name}</p>
                        <p>{profile.title}</p>
                        <p>{profile.email}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContainer>
        </div>
      </div>
    </main>
  );
}