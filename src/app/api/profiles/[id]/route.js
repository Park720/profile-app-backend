import Link from 'next/link';
import prisma from '@/app/lib/prisma';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const profile = await prisma.profiles.findUnique({
        where: { id: parseInt(slug) }
    });
    return {
        title: `${profile?.name} | Profile App`,
        description: `${profile?.title} - ${profile?.email}`,
    };
}

export default async function ProfileDetail({ params }) {
    const { slug } = await params;
    const profile = await prisma.profiles.findUnique({
        where: { id: parseInt(slug) }
    });

    if (!profile) {
        return <p>Profile not found</p>;
    }

    return (
        <main>
            <h1>{profile.name}</h1>
            <img src={profile.image_url || "/vercel.svg"} alt={profile.name} width={150} height={150} />
            <p>{profile.email}</p>
            <p>{profile.title}</p>
            <p>{profile.bio}</p>
            <Link href="/">← Back</Link>
        </main>
    );
}