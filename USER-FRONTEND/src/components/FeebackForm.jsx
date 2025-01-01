// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// const FeedbackPage = () => {
//   const [feedback, setFeedback] = useState({
//     name: "",
//     email: "",
//     rating: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFeedback((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Send feedback to the backend
//       const response = await axios.post("http://localhost:5000/api/feedback/add", feedback);
//       if (response.status === 201) {
//         toast.success("Thank you for your feedback! 🎉", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         setFeedback({ name: "", email: "", rating: "", message: "" }); // Reset form
//       } else {
//         toast.error("Failed to submit feedback. Please try again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       toast.error("An error occurred while submitting your feedback.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 animated-bg">
//       {/* Toast Container */}
//       <ToastContainer />

//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
//         <h2 className="text-3xl font-bold text-center text-[#5B74F6] mb-6">
//           We Value Your Feedback
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={feedback.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={feedback.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
//             />
//           </div>

//           {/* Rating Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Rating (1 to 5)
//             </label>
//             <select
//               name="rating"
//               value={feedback.rating}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
//             >
//               <option value="">Select a rating</option>
//               <option value="1">1 - Very Poor</option>
//               <option value="2">2 - Poor</option>
//               <option value="3">3 - Average</option>
//               <option value="4">4 - Good</option>
//               <option value="5">5 - Excellent</option>
//             </select>
//           </div>

//           {/* Feedback Message Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Feedback
//             </label>
//             <textarea
//               name="message"
//               value={feedback.message}
//               onChange={handleChange}
//               placeholder="Share your thoughts about our website..."
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6] resize-none h-32"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full p-3 text-white rounded-lg bg-gradient-to-r from-[#E849A0] via-[#B453E6] to-[#5B74F6] text-lg shadow-lg transform transition-all duration-300 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
//             }`}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Feedback"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;




import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = feedback;

    // Name validation
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    // Email validation (simple regex for basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    // Feedback message validation
    if (message.trim().length < 10) {
      toast.error("Feedback must be at least 10 characters long.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send feedback to the backend
      const response = await axios.post("http://localhost:5000/api/feedback/add", feedback);
      if (response.status === 201) {
        toast.success("Thank you for your feedback! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        setFeedback({ name: "", email: "", rating: "", message: "" }); // Reset form
      } else {
        toast.error("Failed to submit feedback. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting your feedback.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 animated-bg">
      {/* Toast Container */}
      <ToastContainer />

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-[#5B74F6] mb-6">
          We Value Your Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
            />
          </div>

          {/* Rating Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Rating (1 to 5)
            </label>
            <select
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6]"
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          {/* Feedback Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              placeholder="Share your thoughts about our website..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8762F6] resize-none h-32"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 text-white rounded-lg bg-gradient-to-r from-[#E849A0] via-[#B453E6] to-[#5B74F6] text-lg shadow-lg transform transition-all duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
