import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./ScrollTop";

function Browser(){
    return(
        <BrowserRouter>
            <ScrollToTop></ScrollToTop>
            <App></App>
        </BrowserRouter>
    )
}

export default Browser