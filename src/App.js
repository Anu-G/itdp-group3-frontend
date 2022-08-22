import './App.css';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { CategoryLabel } from './shared/components/CategoryLabel/CategoryLabel';
import { CheckBox } from './shared/components/CheckBox/CheckBox';
import { CommentColomn } from './shared/components/CommentColomn/CommentColomn';
import { CustomDropdown } from './shared/components/Dropdown/Dropdown';
import Navbar from './shared/components/Navbar/Navbar';

const App = _ => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    </div>
  )
}

export default App;
