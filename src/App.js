import './App.css';
import AppRouter from './apps/Router';
import { SettingsProfile } from './pages/SettingsProfile/SettingsProfile';
import { Profile } from './pages/Profile/Profile'

const App = _ => {
  return (
    <div className='app'>
      <Profile/>
    </div>
  )
}

export default App;
