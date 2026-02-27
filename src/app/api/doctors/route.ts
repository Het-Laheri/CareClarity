import { NextRequest, NextResponse } from 'next/server';

/**
 * In-memory doctor store. Pre-seeded with the same data from lib/doctors.ts.
 * In production, this would be Firestore.
 */

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    location: string;
    online: boolean;
    imageId: string;
    bio: string;
}

let doctors: Doctor[] = [
    { id: 'doc1', name: 'Dr. Priya Sharma', specialization: 'Pediatric Neurology', location: 'Mumbai, Maharashtra', online: true, imageId: 'doctor-1', bio: 'Dr. Sharma is a renowned pediatric neurologist at Hinduja Hospital with over 18 years of experience in developmental disorders, epilepsy, and neurodevelopmental conditions.' },
    { id: 'doc2', name: 'Dr. Rajesh Menon', specialization: 'Developmental-Behavioral Pediatrics', location: 'Bangalore, Karnataka', online: false, imageId: 'doctor-2', bio: 'Dr. Menon is a developmental pediatrician at NIMHANS, Bangalore. He specializes in ADHD, learning disabilities, and autism spectrum disorders.' },
    { id: 'doc3', name: 'Dr. Ananya Gupta', specialization: 'Child Psychiatry', location: 'New Delhi, Delhi', online: true, imageId: 'doctor-3', bio: 'Dr. Gupta is a child and adolescent psychiatrist practicing at AIIMS, New Delhi. She helps children and families navigate emotional and behavioral challenges.' },
    { id: 'doc4', name: 'Dr. Kavitha Nair', specialization: 'Occupational Therapy', location: 'Chennai, Tamil Nadu', online: true, imageId: 'doctor-4', bio: 'Dr. Nair is a senior occupational therapist at CMC Vellore. She specializes in sensory integration therapy and play-based therapy.' },
    { id: 'doc5', name: 'Dr. Arjun Patel', specialization: 'Speech-Language Pathology', location: 'Ahmedabad, Gujarat', online: false, imageId: 'doctor-5', bio: 'Dr. Patel is a certified speech-language pathologist specializing in communication disorders in children, including apraxia of speech.' },
    { id: 'doc6', name: 'Dr. Sneha Reddy', specialization: 'Applied Behavior Analysis (ABA)', location: 'Hyderabad, Telangana', online: true, imageId: 'doctor-6', bio: 'Dr. Reddy is a Board Certified Behavior Analyst (BCBA) who designs and oversees ABA therapy programs.' },
];

let nextDocNum = 7;

// GET /api/doctors — list all doctors
export async function GET() {
    return NextResponse.json(doctors);
}

// POST /api/doctors — add a doctor
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, specialization, location, online, bio } = body;
        if (!name || !specialization) {
            return NextResponse.json({ error: 'name and specialization are required' }, { status: 400 });
        }
        const doctor: Doctor = {
            id: `doc${nextDocNum++}`,
            name,
            specialization,
            location: location || '',
            online: online ?? false,
            imageId: body.imageId || 'doctor-1',
            bio: bio || '',
        };
        doctors.push(doctor);
        return NextResponse.json(doctor, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

// PUT /api/doctors — update a doctor (pass id in body)
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

        const idx = doctors.findIndex((d) => d.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });

        doctors[idx] = { ...doctors[idx], ...updates };
        return NextResponse.json(doctors[idx]);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

// DELETE /api/doctors?id=<id>
export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 });

    const before = doctors.length;
    doctors = doctors.filter((d) => d.id !== id);
    if (doctors.length === before) {
        return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
