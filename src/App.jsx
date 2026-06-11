import { Routes, Route, BrowserRouter } from "react-router-dom"
import Hero from "./Hero"
import Flappbird from "./Flappybird/flappbird" 
import Tic from "./Tic-tac-toe/tic"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/flappybird" element={<Flappbird />} />
      <Route path="/tic-tac-toe" element={<Tic/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App