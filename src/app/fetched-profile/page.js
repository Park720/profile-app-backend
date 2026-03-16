import FetchedProfileClient from './FetchedProfileClient';

async function fetchTitles() {
    const res = await fetch(
        "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
        { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.titles ?? [];
}

export const metadata = {
    title: "Fetched Profiles | Profile App",
};

export default async function FetchedProfilePage() {
    const titles = await fetchTitles();
    return (
        <main>
            <h1>Fetched Profiles</h1>
            <FetchedProfileClient titles={titles} />
        </main>
    );
}