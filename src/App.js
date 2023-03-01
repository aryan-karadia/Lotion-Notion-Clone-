import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Notes />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
