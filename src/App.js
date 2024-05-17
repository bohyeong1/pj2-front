import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import MainApp from './main/mainApp/MainApp';
import SubApp from './sub/subApp/SubApp';
import Detail_infoApp from './detail_info/detail_infoApp/Detail_infoApp';
import ReservationApp from './reservation/reservationApp/ReservationApp';
import AgreeTerms from './membership/agreeTerms/AgreeTerms';
import Membership_join from './membership/membership-join/Membership-join';
import Mem_join_complete from './membership/mem-join-comlete/Mem-join-complete';
import Private_history from './Privacy/private-history/Private-history';
import Private_management from './Privacy/private-management/Private-management';
import Private_message from './Privacy/private-message/Private-message';
import Private_point from './Privacy/private-point/Private-point';
import Private_resister from './Privacy/private-resister/Private-resister';
import Login from './membership/login/Login';

function App() {
  return (
    <div className="App">

      {/* <MainApp></MainApp> */}
      {/* <SubApp></SubApp> */}
      {/* <Detail_infoApp></Detail_infoApp> */}
      {/* <ReservationApp></ReservationApp> */}
      {/* <AgreeTerms></AgreeTerms> */}
      <Membership_join></Membership_join>
      {/* <Mem_join_complete></Mem_join_complete> */}
      {/* <Private_history></Private_history> */}
      {/* <Private_management></Private_management> */}
      {/* <Private_message></Private_message> */}
      {/* <Private_point></Private_point> */}
      {/* <Private_resister></Private_resister> */}
      {/* <Login></Login> */}
    </div>
  );
}

export default App;
