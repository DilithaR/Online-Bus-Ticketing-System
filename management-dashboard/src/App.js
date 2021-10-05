import './App.css';
import Sidebar from './components/views/Side Nav/SideBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Inspectors} from "./components/views/Inspectors/Inspectors";
import {AddInspector} from "./components/views/Inspectors/AddInspector";
import {TimeTables} from "./components/views/TimeTables/TimeTables";
import {AddTimeTable} from "./components/views/TimeTables/AddTimeTable";
import {EditTimeTable} from "./components/views/TimeTables/EditTimeTable";
import {Passengers} from "./components/views/Passengers/Passenger";
import {TravelRecords} from "./components/views/Passengers/TravelRecords";
import {Payments} from "./components/views/Payments/Payments";
/*import AdminLogin from "./components/views/AdminLogin";*/
import {AddConductor} from "./components/views/Conductor/AddConductor";
import {Conductors} from "./components/views/Conductor/Conductors";

function App() {
    return (
        <Router>
            <Sidebar/>
            <div>
                <Switch>
                    <Route path='/' exact component={TimeTables}/>
                    <Route path='/inspectors/add-inspector' exact component={AddInspector}/>
                    <Route path='/inspectors' exact component={Inspectors}/>
                    <Route path='/timetables' exact component={TimeTables}/>
                    <Route path='/timetables/add-timetable' exact component={AddTimeTable}/>
                    <Route path='/timetables/edit-timetable' exact component={EditTimeTable}/>
                    <Route path='/passengers' exact component={Passengers}/>
                    <Route path='/passengers/travel-records' exact component={TravelRecords}/>
                    <Route path='/payments' exact component={Payments}/>
                    {/*<Route path='/admin-login' exact component={AdminLogin}/>*/}
                    <Route path='/conductors/add-conductor' exact component={AddConductor}/>
                    <Route path='/conductors' exact component={Conductors}/>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
