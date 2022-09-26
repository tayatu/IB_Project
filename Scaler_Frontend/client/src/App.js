import { Routes, Route, Link } from "react-router-dom";
import EditInterview from "./pages/EditInterview";
import Home from "./pages/Home";
import ScheduleInterview from "./pages/ScheduleInterview";
import UpcomingInterviews from "./pages/UpcomingInterviews";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduleInterview" element={<ScheduleInterview />} />
        <Route path="/interviews" element={<UpcomingInterviews />} />
        <Route path="/editInterview/:interviewId" element={<EditInterview />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
