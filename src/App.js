import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Notes from './pages/Notes';
import Layout from './components/Layout';
import Edit from './pages/Edit';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/Notes"/>} />
              <Route path="/Notes" element={<Notes />} />
              <Route path="Notes/:id/edit" element={<Edit />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
