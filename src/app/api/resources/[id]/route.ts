import { NextRequest, NextResponse } from 'next/server';
import { resources } from '@/lib/resources-data';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid Resource ID' }, { status: 400 });
    }

    const resource = resources.find(r => r.id === numericId);

    if (!resource) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json(resource);
}
