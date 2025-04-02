
// import React, { useEffect, useState } from "react";
// import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Trainings.css";

// const Trainings = () => {
//   const [trainings, setTrainings] = useState([]);

//   useEffect(() => {
//     const fetchTrainings = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/trainings"); // Use correct API URL
//         setTrainings(response.data);
//       } catch (error) {
//         console.error("Error fetching trainings:", error);
//       }
//     };

//     fetchTrainings();
//   }, []);

//   // Function to format the date in dd/mm/yyyy format
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day = d.getDate().toString().padStart(2, '0'); // Ensure two digits for day
//     const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-11) and add 1 for 1-12 range
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <div className="trainings-padding">
//     <div className="trainings-container">
//       {trainings.map((training) => (
//         <div key={training.id} className="training-card">
//           <img src={training.image_url} alt={training.title} />
//           <div className="training-info">
//             <p>
//               <FaCalendarAlt /> {formatDate(training.start_date)} - {formatDate(training.end_date)}
//             </p>
//             <h3>{training.title}</h3>

//             <p>{training.overview.split(" ").slice(0, 15).join(" ")}...</p>
//             <Link to={`/training/${training.id}`} className="read-more">
//               Read More <FaArrowRight />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Trainings;


import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Trainings.css";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trainings"); // Use correct API URL
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  // Function to format the date in dd/mm/yyyy format
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-11) and add 1 for 1-12 range
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="trainings-padding">
      <div className="trainings-container">
        {trainings.map((training) => (
          <div key={training.id} className="training-card">
            {/* Prepend the base URL to the image path */}
            <img src={`http://localhost:5000${training.image_url}`} alt={training.title} />
            <div className="training-info">
              <p>
                <FaCalendarAlt /> {formatDate(training.start_date)} - {formatDate(training.end_date)}
              </p>
              <h3>{training.title}</h3>
              <p>{training.overview.split(" ").slice(0, 15).join(" ")}...</p>
              <Link to={`/training/${training.id}`} className="read-more">
                Read More <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainings;