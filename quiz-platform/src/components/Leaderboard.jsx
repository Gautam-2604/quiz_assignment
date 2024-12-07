import React from "react";

const Leaderboard = ({ leaderboard }) => {
  const sortedLeaderboard = Object.entries(leaderboard).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Leaderboard</h3>
      <ul className="list-disc mt-2">
        {sortedLeaderboard.map(([player, score], index) => (
          <li key={index}>
            {player}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
