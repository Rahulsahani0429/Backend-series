import { User } from "../models/userModel.js";

// export const getMyProfile = async (req, res) => {
//   res.json(req.user);
// };

//this is my second method

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        msg: "user not found",
        status: "false",
      });
    }
    res
      .status(200)
      .json({ msg: "user information found", userInfo: user, status: true });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server Error", status: false, Error: error.message });
  }
};

//first method

// export const updateMyProfile = async (req, res) => {
//   try {
//     const { name, email, password, age } = req.body;

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (age) user.age = age;
//     if (password) user.password = await bcrypt.hash(password, 12);

//     await user.save();

//     res.status(200).json({ msg: "Profile updated" });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// second method

export const updateMyProfile = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ msg: "User not found" });
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ msg: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};


//  export const updateMyProfile = async (req, res) => {
//   try {
//     const { name, email, password, age } = req.
body;

//     // 🔐 Find logged-in user by ID
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // ✅ Check if name is changed
//     if (name && name !== user.name) {
//       user.name = name;
//     }

//     // ✅ Check if age is changed
//     if (age && age !== user.age) {
//       user.age = age;
//     }

//     // ✅ Check if email is changed
//     if (email && email !== user.email) {
//       const existing = await User.findOne({ email });
//       if (existing) {
//         return res.status(400).json({ msg: "Email already in use" });
//       }
//       user.email = email;
//     }

//     // ✅ Check if password is provided
//     if (password) {
//       const hashed = await bcrypt.hash(password, 12);
//       user.password = hashed;
//     }

//     // ✅ Save updated user
//     await user.save();

//     // ✅ Send response
//     res.status(200).json({ msg: "Profile updated successfully" });

//   } catch (error) {
//     res.status(500).json({
//       msg: "Server error",
//       error: error.message,
//     });
//   }
// };

// third method

// export const updateMyProfile = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     // console.log('HDHJD',name);
//     const { _id } = req.user;
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).json({ msg: "user not found" });
//     }
//     // Name
//     if (name && name !== user.name) {
//       user.name = name;
//     } else if (name == user.name) {
//       return res
//         .status(400)
//         .json({ msg: "your name is already use", status: false });
//     }
//     // Email
//     if (email && email !== user.email) {
//       const existing = await User.findOne({ email });
//       if (existing) {
//         return res
//           .status(400)
//           .json({ msg: "this email is already used by other" });
//       }
//       user.email = email;
//     } else if (email == user.email) {
//       return res.status(400).json({ msg: "your email is already used" });
//     }

//     // Role

//     if (role && role !== user.role) {
//       user.role = role;
//     } else if (role === user.role) {
//       return res.status(400).json({ msg: "you already have this role" });
//     }

//     // Password
//     if (password) {
//       const isSame = await bcrypt.compare(password, user.password);

//       if (isSame) {
//         return res.status(400).json({
//           msg: "password matched so new password differet from current password",
//         });
//       }
//       user.password = await bcrypt.hash(password, 12);
//     }
//     await user.save();
//     res.status(200).json({ msg: "profile update successfully" });
//   } catch (error) {
//     // console.log(error.message);
//     return res.status(500).json({ msg: "Server Error", Error: error.message });
//   }
// };
 
 // this first method

// export const getUserByRole = async (req, res) => {
//   const { role } = req.query;
//   const users = await User.find(role ? { role } : {}).select("-password");
//   res.json(users);
// };

// this second method

export const getUserByRole = async (req,res) =>{
  try {
    const {role} = req.query;
  const users = await User.find(role ? {role} : {}).select("-password");
  if(users){
    return res.status(200).json({msg:"Users Fetched Successfully", status:true, users, count:users.length  })
  }
  }catch (error) {
    return res.status(500).json({msg:"Server Error", Error:error.message, status:false })
  }
 
}

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, age } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if (age) user.age = age;

  await user.save();
  res.json({ msg: "User update" });
};

export const deleteById = async () => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  res.json({ msg: "user deleted" });
};
