import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Signup}  from './pages/Signup'
import { Signin } from './pages/Signin'
import { DashBoard} from './pages/DashBoard'
import { SendMoney} from './pages/SendMoney'
import { Home } from './pages/Home'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/send" element={<SendMoney />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
