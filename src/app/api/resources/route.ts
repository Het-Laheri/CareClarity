import { NextRequest, NextResponse } from 'next/server';

/**
 * In-memory resource store. In production this would be Firestore.
 * Resources can be read by anyone, but CRUD operations should be
 * protected by auth (skipped here for speed).
 */

export interface Resource {
    id: number;
    title: string;
    category: string;
    ageGroup: string;
    description: string;
    tags: string[];
}

let resources: Resource[] = [
    { id: 1, title: "Understanding Sensory Processing Disorder", category: "Sensory Needs", ageGroup: "3-5 years", description: "An introductory guide to sensory processing challenges and strategies to help your child manage daily situations in Indian environments.", tags: ["sensory", "sensory sensitivities", "sensory processing", "understand-needs"] },
    { id: 2, title: "Developing Communication Skills in Non-Verbal Children", category: "Communication", ageGroup: "All Ages", description: "Explore alternative and augmentative communication (AAC) methods and techniques available in India.", tags: ["communication", "non-verbal", "non-verbal communication"] },
    { id: 3, title: "Your Child's Rights: RPWD Act 2016 & Inclusive Education", category: "Education", ageGroup: "6-9 years", description: "Understand your child's legal rights under the Rights of Persons with Disabilities Act 2016 and how to access inclusive education in Indian schools.", tags: ["education", "rights", "ieps"] },
    { id: 4, title: "Strategies for Managing Meltdowns", category: "Behavioral Support", ageGroup: "All Ages", description: "Practical tips for de-escalating challenging situations and understanding triggers.", tags: ["behavior", "meltdowns", "challenging behaviors"] },
    { id: 5, title: "Early Intervention Services in India", category: "Early Intervention", ageGroup: "0-2 years", description: "Learn about government programs like RBSK (Rashtriya Bal Swasthya Karyakram) and early intervention centres across India for toddlers.", tags: ["early intervention", "toddler", "understand-needs"] },
    { id: 6, title: "Building Social Skills Through Play", category: "Social Skills", ageGroup: "3-5 years", description: "Fun, play-based activities to help your child understand social cues and interact with peers.", tags: ["social skills", "social", "play", "activities"] },
    { id: 7, title: "Finding the Right Specialist for Your Child", category: "Professional Support", ageGroup: "All Ages", description: "A comprehensive guide to identifying, vetting, and connecting with the right pediatric specialists and therapists in India.", tags: ["find-support", "specialist", "therapist", "professional"] },
    { id: 8, title: "Creating Effective IEPs: A Parent's Guide", category: "Education", ageGroup: "6-9 years", description: "Step-by-step guidance for parents on creating, reviewing, and advocating for Individualized Education Plans under Indian education law.", tags: ["education", "ieps"] },
    { id: 9, title: "Activity Ideas for Fine Motor Development", category: "Activities", ageGroup: "3-5 years", description: "Creative at-home activities that promote fine motor skill development through play — using easily available materials in India.", tags: ["activities", "fine motor", "development"] },
    { id: 10, title: "Understanding Your Child's Diagnosis", category: "Understanding Conditions", ageGroup: "All Ages", description: "A compassionate guide to understanding neurodevelopmental diagnoses, common terminology, and what they mean for your family's journey.", tags: ["understand-needs", "diagnosis", "asd", "autism"] },
    { id: 11, title: "Routine Building for Children with ASD", category: "Behavioral Support", ageGroup: "3-5 years", description: "How to design structured routines that provide comfort and predictability for your child.", tags: ["routine", "routine changes", "behavior", "asd"] },
    { id: 12, title: "Adolescent Transition Planning", category: "Education", ageGroup: "14-18 years", description: "Planning ahead: vocational training, life skills, and higher education options for adolescents with neurodevelopmental conditions in India.", tags: ["education", "transition", "adolescent", "understand-needs"] },
];

let nextId = 13;

// GET /api/resources — list all resources
export async function GET() {
    return NextResponse.json(resources);
}

// POST /api/resources — add a resource
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, category, ageGroup, description, tags } = body;
        if (!title || !category) {
            return NextResponse.json({ error: 'title and category are required' }, { status: 400 });
        }
        const resource: Resource = {
            id: nextId++,
            title,
            category,
            ageGroup: ageGroup || 'All Ages',
            description: description || '',
            tags: tags || [],
        };
        resources.push(resource);
        return NextResponse.json(resource, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

// PUT /api/resources — update a resource (pass id in body)
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

        const idx = resources.findIndex((r) => r.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Resource not found' }, { status: 404 });

        resources[idx] = { ...resources[idx], ...updates };
        return NextResponse.json(resources[idx]);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

// DELETE /api/resources?id=<id>
export async function DELETE(req: NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 });

    const before = resources.length;
    resources = resources.filter((r) => r.id !== id);
    if (resources.length === before) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
