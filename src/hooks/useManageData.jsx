import { useEffect, useState } from "react";
import axios from "axios";

const URL_API = "http://localhost:3000";

export const useManageData = (dataName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => setData(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    return axios
      .get(`${URL_API}/${dataName}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItems = (userIds) => {
    const promises = userIds.map((userId) => {
      return axios.delete(`${URL_API}/${dataName}/${userId}`);
    });

    return Promise.all(promises)
      .then((responses) => {
        const updatedData = data.filter((item) => !userIds.includes(item.id));
        setData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createItem = (item) => {
    return axios
      .post(`${URL_API}/${dataName}`, item)
      .then((response) => {
        setData([...data, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateItem = (id, updates) => {
    return axios
      // .put(`${URL_API}/${dataName}/${id}`, updates)
      .patch(`${URL_API}/${dataName}/${id}`, updates)
      .then((response) => {
        const updatedList = data.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          } else {
            return item;
          }
        });
        setData(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserById = (userId) => {
    return axios
      .get(`${URL_API}/users/${userId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    data,
    createItem,
    getUserById,
    updateItem,
    deleteItems,
  };
};
