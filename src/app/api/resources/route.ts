import { NextRequest, NextResponse } from 'next/server';
import { resources as resourceStore, Resource } from '@/lib/resources-data';

/**
 * In-memory resource store backed by the shared data layer.
 * Both this API and the AI RAG Tool use the same source of truth.
 */
let resources: Resource[] = [...resourceStore];
let nextId = Math.max(...resources.map(r => r.id)) + 1;

export type { Resource };

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
