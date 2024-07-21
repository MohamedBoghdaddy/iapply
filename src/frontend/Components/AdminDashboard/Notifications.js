import React, { useState } from "react";
import axios from "axios";

function Notifications() {
  const [formData, setFormData] = useState({ phone_number: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/notifications", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        onChange={handleChange}
      />
      <input
        type="text"
        name="message"
        placeholder="Message"
        onChange={handleChange}
      />
      <button type="submit">Send Notification</button>
    </form>
  );
}

export default Notifications;
