import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import MarketCapTable from './components/Front_page';
import CFooter from './components/CFooter';
import CHeader from './components/CHeader';
import HowToUse from './components/HowToUse';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import LandingPage from './components/LandingPage';
import SearchBar from './components/SearchBar';
import RecoverPage from './components/RecoverPage';

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <MarketCapTable/>
    <CFooter/>
    <CHeader/>
    <HowToUse/>
    <LandingPage/>
    <RecoverPage/>
    <SearchBar/>
    <SignInPage/>
    <SignUpPage/>
    
   </div>
  )
}

export default App
