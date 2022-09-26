import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link } from "react-router-dom";

const Home = () => {
  useDocumentTitle("Interview Platform");
  return (
    <main className="pt-32 pb-12">
      <h2 className="text-center font-bold text-2xl">
        Welcome! <br />
        To The Interview Creation Portal
        <br />
      </h2>
      <br />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <ul className="flex flex-wrap items-center">
                <li>
                    <Link
                    to="/interviews"
                    className="cursor-pointer mr-4 btn-sm bg-blue-500 text-white"
                    >
                    Upcoming Interviews
                    </Link>
                </li>
                <li>
                    <Link
                    to="/scheduleInterview"
                    className="bg-blue-500 text-white cursor-pointer btn-sm"
                    >
                    Schedule Interview
                    </Link>{" "}
                </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;