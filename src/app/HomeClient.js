'use client';

import { useState } from 'react';
import Card from './components/Card';
import CardContainer from './components/CardContainer'; 

export default function HomeClient({ profiles }) {
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");
    const [name, setName] = useState("");

    const majors = [...new Set(profiles.map(p => p.major))];
    const years = [...new Set(profiles.map(p => p.year))];

    const filtered = profiles.filter(p =>
        (major === "" || p.major === major) &&
        (year === "" || p.year === year) &&
        (name === "" || p.name.toLowerCase().includes(name.toLowerCase()))
    );

    const handleClear = () => {
        setMajor("");
        setYear("");
        setName("");
    };

    return (
        <div>
            <div>
                <select value={major} onChange={(e) => setMajor(e.target.value)}>
                    <option value="">All Majors</option>
                    {majors.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>

                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">All Years</option>
                    {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
                </select>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button onClick={handleClear}>Clear</button>
            </div>

            {filtered.length > 0 ? (  
                <CardContainer title="Student Profiles">
                    {filtered.map((profile) => (
                        <Card
                            key={profile.id}
                            name={profile.name}
                            year={profile.year}
                            major={profile.major}
                            email={profile.email}
                        />
                    ))}
                </CardContainer>
            ) : (
                <p>No profiles found.</p>
            )}
        </div>
    );
}