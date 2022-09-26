import Select from "react-select";
import moment from "moment";
import axios from "axios";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useGetAllUsers from "../hooks/useGetAllUsers";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ScheduleInterview = () => {
  useDocumentTitle("Schedule Interview");

  const navigate = useNavigate();

  const {
    status: getUsersStatus,
    data: getUsersData,
    error: getUsersError,
  } = useGetAllUsers();

  const [participants, setParticipants] = useState([]);
  const [title , setTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const animatedComponents = makeAnimated();

  const getParticipants = () => {
    const users = [];
    getUsersData?.data.forEach((user) => {
      users.push({ label: user.name + " (" + user.email + ")", value: user.id });
    });
    return users;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);

    const users = [];
    participants.forEach((participant) => users.push(participant.value));

    const formattedStartTime = moment.utc(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();
    const formattedendTime = moment.utc(
      `${date} ${endTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();

    const interview = {};
    interview.participants = users;
    interview.start_time = formattedStartTime;
    interview.end_time = formattedendTime;
    interview.title = title;
    console.log(interview)
    axios
      .post("http://localhost:8000/interviews/scheduleInterview", interview)
      .then((res) => {
        setIsFormSubmitting(false);
        alert("Interview was successfully added.");
        navigate("/upcoming");
      })
      .catch((error) => {
        setIsFormSubmitting(false);
        alert(error.response.data.message);
      });
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        <div className="flex flex-col">
          <h2 className="text-xl text-center font-medium mb-4">
            Schedule A New Interview
          </h2>
          {getUsersStatus === "error" && <div> Error fetching all users. </div>}
          {getUsersStatus === "loading" && <div> Loading... </div>}
          {getUsersStatus === "success" && (
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              <label>Title: </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="rounded-md"
              />

              <label>Select Participants : </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                name="participants"
                options={getParticipants()}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOption) => {
                  setParticipants(selectedOption);
                }}
              />

              <label className="mt-4 w-full">Date : </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">Start Time : </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">End Time : </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="rounded-md"
              />

              <button
                type="submit"
                className="btn mx-auto mt-6 bg-blue-500 text-white"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ScheduleInterview;