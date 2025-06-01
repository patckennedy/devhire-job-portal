import { Link } from 'react-router-dom';

const JobBoardHero = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50">
            {/* Background pattern) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

            <div className="container mx-auto px-4 py-20 md:py-28">
                <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            Launch Your{' '}
                            <span className="text-purple-600">Career</span> With
                            The Right Opportunity
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Connect with top employers and find jobs that match
                            your skills and ambitions. Our platform connects you
                            with opportunities that advance your career.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/resources">
                                <button className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-200">
                                    Resources
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image Content - Hidden on mobile */}
                    <div className="lg:w-1/2 hidden lg:block">
                        <div className="relative">
                            <img
                                src="/images/dhero1.png"
                                alt="developer image"
                                className="w-full h-auto rounded-xl shadow-xl"
                            />
                            {/* Floating badge */}
                            <div className="absolute -bottom-5 -right-5 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="font-medium text-gray-800">
                                    200+ Jobs Added Monthly
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobBoardHero;
