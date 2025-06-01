const HowItWorks = () => {
    const steps = [
        {
            icon: '📝',
            title: 'Create Profile',
            description: 'Set up your account in just 2 minutes',
        },
        {
            icon: '🔍',
            title: 'Find Opportunities',
            description: 'Browse curated job listings',
        },
        {
            icon: '💻',
            title: 'Apply Easily',
            description: 'One-click applications to save time',
        },
    ];

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                            <div className="text-5xl mb-4 text-white">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                {step.title}
                            </h3>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default HowItWorks;
