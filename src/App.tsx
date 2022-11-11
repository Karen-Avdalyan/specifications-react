import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from "./components/header";
import { ChakraProvider } from '@chakra-ui/react'
import { CreateSpecification } from "./pages/create-specification";
import { Specifications } from "./pages/specifications";


export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/specifications" element={<Specifications />}></Route>
            <Route path="/create-specification" element={<CreateSpecification />}></Route>
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}
