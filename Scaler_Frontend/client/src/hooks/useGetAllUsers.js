import { useQuery } from "react-query";
import axios from "axios";

export default function useGetAllUsers() {
  return useQuery(
    "users",
    () => {
      return axios.get('http://localhost:8000/participants/getParticipants/').then((res) => res.data);
    }
  );
}
