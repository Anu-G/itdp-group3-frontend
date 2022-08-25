import './App.css';
import { CategorizePage } from './pages/CategorizePage/CategorizePage';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { SignUp } from './pages/SignUp/SignUp';
import { TimelineCard } from './pages/TimelineCard/TimelineCard';
import { ImagesViewProfile } from './shared/components/ImagesViewProfile/ImagesViewProfile';
import { LoadingScreen } from './shared/components/LoadingScreen/LoadingScreen';

const App = _ => {
  return (
    <div className='app'>
      {/* <SignUp/> */}
      {/* <ForgotPassword/> */}
      {/* <Login /> */}
      {/* <Profile/> */}
      {/* <CategorizePage/> */}
      {/* <TimelineCard /> */}
      <LoadingScreen/>
    </div >
  )
}

export default App;
