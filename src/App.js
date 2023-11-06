import './style/reset.css';
import './App.css';
import ReactBuilder from './components/ReactBuilder/ReactBuilder';
import { AppContextWrapper } from './context/store';

function App() {
  return (
    <div className='App'>
      <AppContextWrapper>
        <ReactBuilder />
      </AppContextWrapper>
    </div>
  );
}

export default App;
