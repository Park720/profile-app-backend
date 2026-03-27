import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import Filters from '../components/Filters';
import Link from 'next/link';

async function fetchTitles() {
    const res = await fetch(
        "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
        { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data ? data.titles : [];
}

async function fetchProfiles({ title, search }) {
    const res = await fetch(
        `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}`,
        { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data ? data.profiles : [];
}

export const metadata = {
    title: "Fetched Profiles | Profile App",
};

export default async function FetchedProfilePage({ searchParams }) {
    const searchParamsData = await searchParams;
    const selectedTitle = searchParamsData?.title ?? "";
    const selectedSearch = searchParamsData?.search ?? "";

    const [titles, profiles] = await Promise.all([
        fetchTitles(),
        fetchProfiles({ title: selectedTitle, search: selectedSearch }),
    ]);

    return (
        <main>
            <h1>Fetched Profiles</h1>
            <Filters titles={titles} title={selectedTitle} search={selectedSearch} action="/fetched-profile" />
            <CardContainer title="Fetched Profiles">
                {profiles && profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <Link key={profile.id} href={`/profile/${profile.id}`}>
                            <Card
                                name={profile.name}
                                major={profile.title}
                                email={profile.email}
                                image={profile.image_url}
                            />
                        </Link>
                    ))
                ) : (
                    <p>No profiles found.</p>
                )}
            </CardContainer>
        </main>
    );
}