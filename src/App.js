
import FetchDetails from "./Components/FetchDetails";
import "./index.css"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div >
    <FetchDetails/>
    <ToastContainer />
    </div>
  );
}

export default App;
