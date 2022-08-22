import './App.css';
import { AddPost } from './shared/components/AddPost/AddPost';
import { CategoryLabel } from './shared/components/CategoryLabel/CategoryLabel';
import { CheckBox } from './shared/components/CheckBox/CheckBox';
import { CommentColomn } from './shared/components/CommentColomn/CommentColomn';
import { CustomDropdown } from './shared/components/Dropdown/Dropdown';

const App = _ => {
  return (
    <div className='app'>
      <AddPost/>
    </div>
  )
}

export default App;
