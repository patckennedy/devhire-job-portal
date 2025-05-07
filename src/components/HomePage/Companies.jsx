import React from 'react';

const companyLogos = [
    '/companies/amazon.svg',
    '/companies/atlassian.svg',
    '/companies/ibm.svg',
    '/companies/meta.svg',
    '/companies/targetPNG2.png',
];

const Companies = () => {
    return (
        <section className="bg-black py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-gray-300 text-xl md:text-2xl font-semibold mb-8">
                    Trusted by leading companies
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {companyLogos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Company ${index + 1}`}
                            className="h-12 w-auto opacity-70 hover:opacity-100 transition"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
