

//  components/Register.jsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/register', form);
//       alert(res.data.msg);
//       navigate('/login');
//     } catch (err) {
//       alert(err.response.data.msg);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <input name="name" placeholder="Name" onChange={handleChange} className="block w-full mb-2 p-2 border" />
//       <input name="email" placeholder="Email" onChange={handleChange} className="block w-full mb-2 p-2 border" />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full mb-2 p-2 border" />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
//     </form>
//   );
// }

// export default Register;