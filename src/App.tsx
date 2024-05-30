import{BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Application from './pages/Application'
import Drivers from './pages/Drivers'
import Region from './pages/Region'
import Store from './pages/Store'

function App() {

  return (
    <>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Application/>}/>
          <Route path='/Drivers' element={<Drivers/>}/>
          <Route path='/Region' element={<Region/>}/>
          <Route path='/Store' element={<Store/>}/>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
