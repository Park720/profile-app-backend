let profiles = [
    { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
    { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
];
export async function GET(request, { params }) {
    const { id } = await params;
    const profile = profiles.find(profile => profile.id === parseInt(id));
    if (!profile) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
    }
    return Response.json(profile, { status: 200 });
}
export async function PUT(request, { params }) {
    const newProfile = await request.json();
    const { id } = await params;
    try {
        if (!newProfile.name || newProfile.name.trim() === "") {
            return Response.json({ error: "Name is required" }, { status: 400 });
        } else if (!newProfile.major || newProfile.major.trim() === "") {
            return Response.json({ error: "Major is required" }, { status: 400 });
        } else if (!newProfile.year || isNaN(newProfile.year) || (newProfile.year < 1 || newProfile.year > 4)) {
            return Response.json({ error: "Valid year is required" }, { status: 400 });
        } else if (!newProfile.gpa || isNaN(newProfile.gpa) || (newProfile.gpa < 0 || newProfile.gpa > 4)) {
            return Response.json({ error: "Valid GPA is required" }, { status: 400 });
        }
        const index = profiles.findIndex(profile => profile.id === parseInt(id));
        if (index === -1) {
            return Response.json({ error: "Profile not found" }, { status: 404 });
        }
        profiles[index] = {
            ...profiles[index],
            ...newProfile,
            id: profiles[index].id
        };
        return Response.json(profiles[index], { status: 200 });
    } catch (error) {
        return Response.json({ error: "Invalid data format" }, { status: 400 });
    }
    
}
export async function PATCH(request, { params }) {
    const updates = await request.json();
    const { id } = await params;
    
    const index = profiles.findIndex(profile => profile.id === parseInt(id));
    if (index === -1) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    if (updates.name !== undefined && (typeof updates.name !== "string" || updates.name.trim() === "")) {
        return Response.json({ error: "Name must be a non-empty string" }, { status: 400 });
    }
    if (updates.major !== undefined && (typeof updates.major !== "string" || updates.major.trim() === "")) {
        return Response.json({ error: "Major must be a non-empty string" }, { status: 400 });
    }
    if (updates.year !== undefined && (isNaN(updates.year) || updates.year < 1 || updates.year > 4)) {
        return Response.json({ error: "Year must be between 1 and 4" }, { status: 400 });
    }
    if (updates.gpa !== undefined && (isNaN(updates.gpa) || updates.gpa < 0 || updates.gpa > 4)) {
        return Response.json({ error: "GPA must be between 0 and 4" }, { status: 400 });
    }

    profiles[index] = {
        ...profiles[index],
        ...updates,
        id: profiles[index].id
    };
    return Response.json(profiles[index], { status: 200 });
}