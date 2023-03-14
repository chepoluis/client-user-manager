import { mockDataUser } from "../../../data/mockData";

export const signInWithEmail = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockDataUser.find(
        (user) => user.email === email && user.password === password
      );
      
      if (user) {
        resolve(user);
      } else {
        reject(false);
      }
    }, 2000);
  });
};
