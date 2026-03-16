'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';  // ✅ 추가

export default function FetchedProfileClient({ titles }) {
    const [profiles, setProfiles] = useState([]);
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(title)}&name=${encodeURIComponent(name)}`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => setProfiles(res.profiles ?? []));
    }, [title, name]);

    const handleClear = () => {
        setTitle("");
        setName("");
    };

    return (
        <div>
            <div>
                <select value={title} onChange={(e) => setTitle(e.target.value)}>
                    <option value="">All Titles</option>
                    {titles.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button onClick={handleClear}>Clear</button>
            </div>

            {profiles.length > 0 ? (  // ✅ filtered → profiles
                <CardContainer title="Fetched Profiles">
                    {profiles.map((profile) => (
                        <Link key={profile.id} href={`/profile/${profile.id}`}>
                            <Card
                                name={profile.name}
                                major={profile.title}
                                email={profile.email}
                                image={profile.image_url}
                            />
                        </Link>
                    ))}
                </CardContainer>
            ) : (
                <p>No profiles found.</p>
            )}
        </div>
    );
}