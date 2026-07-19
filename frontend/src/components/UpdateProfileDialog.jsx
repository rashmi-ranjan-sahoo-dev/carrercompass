// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";

// import { USER_API_END_POINT } from "../utils/contact";
// import { setUser } from "../redux/authSlice";

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const { user } = useSelector((store) => store.auth);

//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     bio: "",
//     skills: "",
//     file: null,
//   });

//   useEffect(() => {
//     if (user) {
//       setInput({
//         fullname: user.fullname || "",
//         email: user.email || "",
//         phoneNumber: user.phoneNumber || "",
//         bio: user.profile?.bio || "",
//         skills: user.profile?.skills?.join(", ") || "",
//         file: null,
//       });
//     }
//   }, [user]);

//   const changeEventHandler = (e) => {
//     setInput((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const fileChangeHandler = (e) => {
//     setInput((prev) => ({
//       ...prev,
//       file: e.target.files?.[0] || null,
//     }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));

//         toast.success(res.data.message);

//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Profile update failed."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={submitHandler}>
//           <div className="space-y-4">

//             <div>
//               <Label>Full Name</Label>
//               <Input
//                 name="fullname"
//                 value={input.fullname}
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input
//                 name="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Phone Number</Label>
//               <Input
//                 name="phoneNumber"
//                 value={input.phoneNumber}
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Bio</Label>
//               <Input
//                 name="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Skills</Label>
//               <Input
//                 name="skills"
//                 placeholder="React, Node.js, MongoDB"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Resume (PDF)</Label>
//               <Input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={fileChangeHandler}
//               />
//             </div>
//           </div>

//           <DialogFooter className="mt-6">
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 "Update Profile"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { USER_API_END_POINT } from "../utils/contact";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    password: "",
    profilePhoto: null,
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        password: "",
        profilePhoto: null,
        resume: null,
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileChangeHandler = (e) => {
    const { name, files } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.password.trim()) {
      formData.append("password", input.password);
    }

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    if (input.resume) {
      formData.append("resume", input.resume);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="space-y-4">

            <div>
              <Label>Full Name</Label>
              <Input
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Bio</Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Skills</Label>
              <Input
                name="skills"
                placeholder="React, Node.js, MongoDB"
                value={input.skills}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>New Password (Optional)</Label>
              <Input
                type="password"
                name="password"
                placeholder="Leave blank if you don't want to change"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Profile Photo</Label>
              <Input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={fileChangeHandler}
              />
            </div>

            <div>
              <Label>Resume (PDF)</Label>
              <Input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={fileChangeHandler}
              />
            </div>

          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;