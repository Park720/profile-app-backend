import Link from 'next/link';

async function fetchProfile(slug) {
    const response = await fetch(
        `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${slug}`,
        { next: { revalidate: 60 } }
    );
    const data = await response.json();
    return data;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const profile = await fetchProfile(slug);
    return {
        title: `${profile.name} | Profile App`,
        description: `${profile.title} - ${profile.email}`,
    };
}

export default async function ProfileDetail({ params }) {
    const { slug } = await params;
    const profile = await fetchProfile(slug);

    return (
        <main>
            <h1>{profile.name}</h1>
            <img src={profile.image_url} alt={profile.name} width={150} height={150} />
            <p>{profile.email}</p>
            <p>{profile.title}</p>
            <p>{profile.bio}</p>
            <Link href="/">← Back</Link>
        </main>
    );
}