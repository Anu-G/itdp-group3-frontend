import './App.css';
import { ButtonComponent } from './shared/components/Button';
import { InputPasswordLabelMd, InputTextLabelLg } from './shared/components/InputWithLabel';

const App = _ => {
  return (
    <div>
      <InputPasswordLabelMd id="password" label={"Password"} />
      <ButtonComponent label={"test"} />
    </div>
  )
}

export default App;
