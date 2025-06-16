import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPoll, votePoll } from "../services/api.js";

const PollPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPoll(id);
        setPoll(response.data);
      } catch (error) {
        console.error("Failed to fetch poll:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = async () => {
    if (selectedOption === null) {
      alert("Please select an option to vote.");
      return;
    }

    try {
      await votePoll(id, selectedOption);
      navigate(`/results/${id}`);
    } catch (error) {
      console.error("Failed to vote:", error);
      alert("Voting failed. Try again.");
    }
  };

  if (loading) return <div>Loading poll...</div>;
  if (!poll) return <div>Poll not found.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{poll.question}</h2>
      {poll.options.map((opt, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name="pollOption"
            value={index}
            checked={selectedOption === index}
            onChange={() => setSelectedOption(index)}
          />
          <label htmlFor={`option-${index}`}>{opt.text}</label>
        </div>
      ))}
      <br />
      <button onClick={handleVote}>Submit Vote</button>
    </div>
  );
};

export default PollPage;
