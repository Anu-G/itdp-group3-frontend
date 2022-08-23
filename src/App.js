import './App.css';
import { ButtonComponent } from './shared/components/Button/Button';
import { CategoryLabel } from './shared/components/CategoryLabel/CategoryLabel';
import { CheckBox } from './shared/components/CheckBox/CheckBox';
import { CommentColomn } from './shared/components/CommentColomn/CommentColomn';
import ComponentNavbar from './shared/components/ComponentNavbar';
import ComponentSidebar from './shared/components/ComponentSidebar';
import { CustomDropdown } from './shared/components/Dropdown/Dropdown';
import { ErrorForm } from './shared/components/ErrorForm/ErrorForm';
import { InputPasswordLabelMd, InputPasswordLabelSm } from './shared/components/InputWithLabel/InputWithLabel';
import Navbar from './shared/components/Navbar/Navbar';

const App = _ => {
  return (
    <div className='app'>
      {/* <ButtonComponent label={"Click Me!"} isDisable={true} /> */}
      {/* <CategoryLabel /> */}
      {/* <CheckBox /> */}
      {/* <CommentColomn /> */}
      {/* <CustomDropdown label={"Hello"} items={["item1", "item2", "item3"]} locked={false} /> */}
      {/* <ErrorForm message={"please fill"} /> */}
      {/* <InputPasswordLabelMd id={"passwordConfirm"} label={"Confirm Password"} /> */}
      {/* <Navbar /> */}
      {/* <ComponentNavbar /> */}
      <ComponentSidebar />
    </div>
  )
}

export default App;
