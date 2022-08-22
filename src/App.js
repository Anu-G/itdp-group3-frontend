import './App.css';
import { SignUp } from './pages/SignUp/SignUp';
import { Title2Blue, Title2White, Title3White, TitleWhite } from './shared/components/Label/Label';


const App = _ => {
  return (
    <div className='app'>
      <SignUp/>
    </div>
  )
}

export default App;
