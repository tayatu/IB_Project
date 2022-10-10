import Moment from "react-moment";
import moment from "moment";
import {Link} from "react-router-dom";
import axios from "axios";
import useGetUpcomingInterviews from "../hooks/useGetUpcomingInterviews";
import useDocumentTitle from "../hooks/useDocumentTitle";

const UpcomingInterviews = () => {
  useDocumentTitle("Upcoming Interviews");
  const { status, data, error } = useGetUpcomingInterviews();

  const deleteInterview = async (id) => {
    axios
      .delete(`http://localhost:8000/interviews/deleteInterview/${id}`)
      .then((res) => {
        alert("Interview deleted successfully!");
      })
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error fetching upcoming interviews</div>}
        {status === "success" && (
          <>
          <h2>
            <Link
              to="/scheduleInterview"
              className="bg-blue-500 text-white cursor-pointer btn-sm"
              >
              Schedule Interview
            </Link>{" "}
          </h2>
          
            <h2 className="text-2xl mb-8 font-bold text-center">
              Upcoming Interviews
            </h2>
            {data.data.map(({ start_time, end_time, id,title }) => {
              return <div className="flex flex-col p-4 border-4 rounded-md m-4" key = {id}>

                <div>Id: {id} </div>
                <div>
                  Title : {title}
                </div>
                
                <div>
                  Date :  <Moment format="DD-MM-YYYY">
                    {end_time}
                  </Moment>
                </div>

                <div className="grid grid-cols-2 mb-2">
                  <div>
                    Start Time: {moment.utc(start_time).format("hh:mm A")}
                  </div>
                  <div>
                    End Time: {moment.utc(end_time).format("hh:mm A")}
                  </div>
                  <div>
                    Day:{moment(end_time).format("dddd")}
                    {/* {moment.day} */}

                  </div>
                </div>
                
                <Link
                  to={`/editInterview/${id}`}
                  className="btn-sm w-fix mx-auto bg-blue-400 text-white"
                >
                  Edit
                </Link>
                <button
                  
                  className="btn-sm w-fix mx-auto bg-blue-400 text-white"
                  onClick={() => {deleteInterview(id)}}
                >
                  Delete
                </button>
              </div>
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default UpcomingInterviews;
