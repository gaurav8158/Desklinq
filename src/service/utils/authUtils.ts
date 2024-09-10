// import axios from "axios";

// export const login = async (payload: any) => {
//     console.log(payload)
//   const u = await axios
//     .post(`https://api-dev.desklinq.com/v1/auth/login`, payload)
//     .then((response) => {
//         console.log(response)
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   localStorage.setItem("token", u?.data.token);
//   return u;
// };

// export const signup = async (payload: any) => {
//   const payloads = {
//     ...payload,
//     role: "64a0fc4f8e2e8b60cd2e1909",
//   };
//   let u = await axios
//     .post(`https://api-dev.desklinq.com/v1/auth/register`, payloads)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   localStorage.setItem("token", u?.data.token);
//   return u;
// };
