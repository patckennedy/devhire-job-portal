import useStore from '../../zustand/store';
import Companies from './Companies';

// import Footer from '../Footer/Footer';
import Hero from './Hero';

function HomePage() {
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);

    return (
        <>
            {/* <Footer /> */}
            {/* <JobDetails /> */}
            <Hero />
            {/* <Companies /> */}
        </>
    );
}
