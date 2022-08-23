import './App.css';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';

const App = _ => {
  return (
    <div className='app'>
      {/* <SignUp/> */}
      {/* <ForgotPassword/> */}
      <Login />
    </div >
  )
}

export default App;
