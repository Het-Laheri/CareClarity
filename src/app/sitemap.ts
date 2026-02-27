import { MetadataRoute } from 'next';
import { doctors } from '@/lib/doctors';

const BASE_URL = 'https://careclarity.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/forgot-password`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Dynamic doctor profile pages
    const doctorPages: MetadataRoute.Sitemap = doctors.map((doctor) => ({
        url: `${BASE_URL}/dashboard/discover/${doctor.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...doctorPages];
}
