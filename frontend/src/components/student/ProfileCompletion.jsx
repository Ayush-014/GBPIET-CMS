import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProfileCompletion() {
  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchUserFromBackend(storedUser._id);
    }
  }, []);

  const fetchUserFromBackend = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3001/api/v1/students/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const fetchedUser = res.data.data;
      setUser(fetchedUser);
      calculateCompletion(fetchedUser);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const isFilled = (field) => {
    if (Array.isArray(field)) return field.length > 0;
    if (typeof field === 'string') return field.trim() !== "";
    return field !== null && field !== undefined;
  };

  const calculateCompletion = (data) => {
    const totalFields = 9;
    let completedFields = 0;

    if (isFilled(data.name)) completedFields++;
    if (isFilled(data.email)) completedFields++;
    if (isFilled(data.instituteId)) completedFields++;
    if (isFilled(data.department)) completedFields++;
    if (isFilled(data.batch)) completedFields++;
    if (isFilled(data.cgpa)) completedFields++;
    if (isFilled(data.skills)) completedFields++;
    if (isFilled(data.achievements)) completedFields++;
    if (isFilled(data.resume)) completedFields++;

    const calculatedPercent = Math.floor((completedFields / totalFields) * 100);
    setPercent(calculatedPercent);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow p-4 flex justify-center items-center w-full max-w-xs mx-auto">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col items-center w-full max-w-xs mx-auto">
      <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 font-sB">
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            textColor: '#235782',
            pathColor: '#235782',
            trailColor: '#d6d6d6',
            textSize: '16px',
            strokeLinecap: 'round'
          })}
        />
      </div>

      <div className="text-center text-sm sm:text-base font-sB mb-3">
        Your Profile is {percent}% Complete.
      </div>

      <button 
        onClick={() => navigate(`/profile/${user._id}`)}
        className="px-4 py-2 bg-[#235782] text-white text-sm font-sB rounded hover:bg-[#1d476a] transition">
        Complete Your Profile
      </button>
    </div>
  );
}
