import './App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/config/configStore';
import Overay from './utilComponent/modal/overay/overay';
// =================================================
// gsap plugin //
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// =================================================
// common style custom hooks //
import useSetVh from './manage_scss_style/commonness/commonness_hooks';
import { useSetVw } from './manage_scss_style/commonness/commonness_hooks';
// =================================================
// final routes //
import FinalRoutes from './Routes';
// =================================================
// react query //
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const query_client = new QueryClient()

function App(){
    // =================================================
    // gsap plugin regist //
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // =================================================
    // set style custom hooks //
    useSetVh()
    useSetVw()

    return(
        <QueryClientProvider client={query_client}>
            <Provider store = {store}>
                <div className="App">
                    <Overay></Overay>
                    <FinalRoutes></FinalRoutes>
                </div>
            </Provider>
        </QueryClientProvider>
    )
}

export default App;
