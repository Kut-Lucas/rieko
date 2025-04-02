
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TrainingDetails.css";

// Utility function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const TrainingDetails = () => {
  const { id } = useParams(); // Get the training ID from the URL
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        console.log("Fetching training details for ID:", id); // Debug: Log the training ID
        const response = await axios.get(`http://localhost:5000/api/trainings/${id}`);
        console.log("API Response:", response.data); // Debug: Log the API response
        setTraining(response.data);
      } catch (error) {
        console.error("Error fetching training details:", error); // Debug: Log any errors
        setError("Failed to fetch training details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!training) {
    return <div>No training found.</div>;
  }

  console.log("Training State:", training); // Debug: Log the training state

  return (
    <div className="training-details-container">
      <div className="training-details-card">
        {/* Training Image */}
        <img src={`http://localhost:5000${training.image_url}`} alt={training.title} />

        <div className="training-details-info">
          {/* Training Title */}
          <h2>{training.title}</h2>

          {/* Training Dates */}
          <p>
            <FaCalendarAlt /> {formatDate(training.start_date)} - {formatDate(training.end_date)}
          </p>

          {/* Training Duration */}
          <p>
            <strong>Duration:</strong> {training.duration}
          </p>

          {/* Training Location */}
          <p>
            <FaLocationArrow /> {training.location}
          </p>

          {/* Contact Info */}
          {training.contact_info && (
            <div>
              <p>
                <FaPhoneAlt /> {JSON.parse(training.contact_info).phone}
              </p>
              <p>
                <strong>Email:</strong> {JSON.parse(training.contact_info).email}
              </p>
            </div>
          )}

          {/* Training Overview */}
          <p>
            <strong>Training Overview:</strong> {training.overview}
          </p>

          {/* Key Objectives */}
          <div>
            <h3>Key Objectives:</h3>
            <ul>
              {training.objectives && training.objectives.length > 0 ? (
                training.objectives.map((obj, index) => <li key={index}>{obj}</li>)
              ) : (
                <li>No objectives found.</li>
              )}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3>Modules:</h3>
            {training.modules && training.modules.length > 0 ? (
              training.modules.map((module, index) => (
                <div key={index}>
                  <h4>{module.name}</h4>
                  <ul>
                    {module.items && module.items.length > 0 ? (
                      module.items.map((item, i) => <li key={i}>{item}</li>)
                    ) : (
                      <li>No items found for this module.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No modules found.</p>
            )}
          </div>

          {/* Benefits */}
          <div>
            <h3>What You'll Gain:</h3>
            <ul>
              {training.benefits && training.benefits.length > 0 ? (
                training.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
              ) : (
                <li>No benefits found.</li>
              )}
            </ul>
          </div>

          {/* Target Audience */}
          <div>
            <h3>Who Should Attend:</h3>
            <ul>
              {training.attendees && training.attendees.length > 0 ? (
                training.attendees.map((attendee, index) => <li key={index}>{attendee}</li>)
              ) : (
                <li>No attendees found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;