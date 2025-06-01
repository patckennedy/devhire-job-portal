import useStore from '../../zustand/store';
import Hero from './Hero';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';

function HomePage() {
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);

    return (
        <>
            <Hero />
            <HowItWorks />
            <Testimonials />
        </>
    );
}

export default HomePage;
