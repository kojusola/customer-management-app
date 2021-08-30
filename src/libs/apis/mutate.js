import { axiosClient } from "libs";

const mutate = ({ key, method, data }) => {
  return axiosClient()
    [method?.toLowerCase()](`/${key}`, data)
    .then((res) => res.data);
};

export default mutate;
