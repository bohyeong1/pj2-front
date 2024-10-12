import './App.scss';
import React from 'react';
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
// =================================================
// final routes //
import FinalRoutes from './Routes';

function App(){

  // =================================================
  // gsap plugin regist //
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  // =================================================
  // set style custom hooks //
  useSetVh()

  return(
    <Provider store = {store}>
      <div className="App">
        <Overay></Overay>
        <FinalRoutes></FinalRoutes>
      </div>
    </Provider>
  )
}

export default App;
