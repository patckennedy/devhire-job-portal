import useStore from '../../zustand/store';
import Footer from '../Footer/Footer';
import Hero from './Hero';

function HomePage() {
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);

    return (
        <>
            {/* <div className="flex justify-center items-center h-screen">
                <h2 className="text-center font-bold text-4xl">Home Page</h2>  */}
                {/* <p>Your username is: {user.username}</p>
                <p>Your ID is: {user.id}</p>
                <button onClick={logOut}>Log Out</button> */}
            {/* </div> */}
            {/* <Footer /> */}
            <Hero />
        </>
    );
}

export default HomePage;
