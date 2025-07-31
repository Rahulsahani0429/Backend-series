// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function UserInfo() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axios.get('http://localhost:5000/api/userinfo', {
//           headers: { Authorization: token },
//         });
//         setUser(res.data);
//       } catch (err) {
//         alert('Unauthorized or token expired');
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">User Info</h2>
//       {user ? (
//         <div>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2">Logout</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default UserInfo;
