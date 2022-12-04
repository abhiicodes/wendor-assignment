import { useState } from 'react'
import Navbar from './components/Navbar'
import store from './redux/store'
import AllRoutes from './Routes/AllRoutes'


function App() {
console.log(store.getState())

  return (
    <div>
      <Navbar/>
    <AllRoutes/>
    </div>
  )
}

export default App
