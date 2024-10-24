import dynamic from 'next/dynamic';

// Import the Home component dynamically with SSR disabled
const Home = dynamic(() => import('../components/Home'), { ssr: false });

export default Home;
