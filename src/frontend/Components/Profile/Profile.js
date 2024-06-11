import React, { useState } from "react";
import axios from "axios";

function CreateProfile() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/create-profile", formData)
      .then((response) => alert(response.data.message))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
      />
      <button type="submit">Create Profile</button>
    </form>
  );
}

export default CreateProfile;
