export function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'CareClarity',
        'url': 'https://careclarity.vercel.app',
        'description': 'AI-assisted guidance and care coordination for parents of children with neurodevelopmental conditions.',
        'foundingDate': '2025',
        'areaServed': {
            '@type': 'Country',
            'name': 'India',
        },
        'serviceType': [
            'AI Health Guidance',
            'Doctor Discovery',
            'Appointment Booking',
            'Caregiver Resources',
        ],
        'knowsAbout': [
            'Autism Spectrum Disorder',
            'Neurodevelopmental Conditions',
            'Pediatric Neurology',
            'Special Education',
            'Caregiver Support',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
