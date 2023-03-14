import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useManageData = (initialData, dataName) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(dataName)) || initialData
  );

  useEffect(() => {
    localStorage.setItem(dataName, JSON.stringify(data));
  }, [data, dataName]);

  const createItem = (item) => {
    const newItem = {
      ...item,
      id: uuidv4()
    }

    setData([...data, newItem]);
  };

  const getItem = (id) => {
    return data.find((item) => item.id === id);
  };

  const updateItem = (id, updates) => {
    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedItem = { ...data[itemIndex], ...updates };
      const newData = [
        ...data.slice(0, itemIndex),
        updatedItem,
        ...data.slice(itemIndex + 1),
      ];
      setData(newData);
    }
  };

  const deleteItems = (idsToDelete) => {
    const updatedData = data.filter((item) => !idsToDelete.includes(item.id));
    setData(updatedData);
  };

  // const deleteItems = (id) => {
  //   const itemIndex = data.findIndex((item) => item.id === id);
  //   if (itemIndex !== -1) {
  //     const newData = [
  //       ...data.slice(0, itemIndex),
  //       ...data.slice(itemIndex + 1),
  //     ];
  //     setData(newData);
  //   }
  // };

  return {
    data,
    createItem,
    getItem,
    updateItem,
    deleteItems,
  };
};
