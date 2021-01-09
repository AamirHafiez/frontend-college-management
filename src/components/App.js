import '../assets/css/App.css';
import HomeContainer from './Home/HomeContainer'
import StudentDashboardContainer from './StudentDashboard/StudentDashboardContainer';
import TeacherDashboardContainer from './TeacherDashboard/TeacherDashboardContainer';

import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomeContainer/>
          </Route>
          <Route path='/student/dashboard'>
            <StudentDashboardContainer/>
          </Route>
          <Route path='/teacher/dashboard'>
            <TeacherDashboardContainer/>
          </Route>
        </Switch>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
