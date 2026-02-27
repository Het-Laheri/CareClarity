import { doctors } from '@/lib/doctors';

export function DoctorJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        'mainEntity': {
            '@type': 'MedicalOrganization',
            'name': 'CareClarity',
            'medicalSpecialty': 'Pediatrics',
            'description': 'Care coordination for children with neurodevelopmental conditions.',
            'member': doctors.map(d => ({
                '@type': 'Physician',
                'name': d.name,
                'medicalSpecialty': d.specialization,
                'location': {
                    '@type': 'Place',
                    'name': d.location
                }
            }))
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
