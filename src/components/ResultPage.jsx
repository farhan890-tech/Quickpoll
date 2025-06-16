import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPoll } from "/src/serv/API.js";


const ResultPage = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getPoll(id);
        const pollData = response.data;
        setPoll(pollData);

        const total = pollData.options.reduce((sum, opt) => sum + opt.votes, 0);
        setTotalVotes(total);
      } catch (error) {
        console.error("Error loading results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading) return <div>Loading results...</div>;
  if (!poll) return <div>Poll not found.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Results for: {poll.question}</h2>
      {poll.options.map((option, index) => {
        const percent = totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(1);
        return (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{option.text}</strong>
            <div
              style={{
                height: "20px",
                width: "100%",
                backgroundColor: "#ddd",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  backgroundColor: "#4caf50",
                  height: "100%",
                  borderRadius: "5px",
                  textAlign: "right",
                  color: "#fff",
                  paddingRight: "5px",
                  fontSize: "12px",
                }}
              >
                {percent}%
              </div>
            </div>
            <p>{option.votes} vote(s)</p>
          </div>
        );
      })}
      <p>Total Votes: {totalVotes}</p>
    </div>
  );
};

export default ResultPage;
