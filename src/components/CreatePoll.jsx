import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "/src/serv/API.js";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (question.trim() === "" || validOptions.length < 2) {
      return alert("Please provide a question and at least 2 options.");
    }

    try {
      const response = await createPoll({ question, options: validOptions });
      navigate(`/poll/${response.data._id}`);
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addOption}>
          Add Option
        </button>
        <br />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePoll;
