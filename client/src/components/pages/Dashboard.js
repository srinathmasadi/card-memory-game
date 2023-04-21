import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/dashboard.css'
import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
  // declare authContext, and destructure authContext
  const authContext = useContext(AuthContext);
  const { usersData, getAllUsers } = authContext;
  const [userStats, setUserStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(''); //Search for user

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (usersData && usersData.length > 0) {
      setUserStats(getUserStats(usersData));
    }
  }, [usersData]);

  function getUserStats(userArr) {
    let userStats = {};

    userArr.forEach((user) => {
      const { name } = user.user;
      const { numOfMoves } = user;

      if (!userStats[name]) {
        userStats[name] = { gamesPlayed: 1, totalMoves: numOfMoves };
      } else {
        userStats[name].gamesPlayed++;
        userStats[name].totalMoves += numOfMoves;
      }
    });

    for (let user in userStats) {
      const { gamesPlayed, totalMoves } = userStats[user];
      userStats[user].avgMoves = Math.round((totalMoves / gamesPlayed) * 100) / 100;
    }

    return userStats;
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Object.keys(userStats)
    .filter((user) => user.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageCount = Math.ceil(Object.keys(userStats).length / usersPerPage);

  const handlePrevClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage !== pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="table-container">
      <h1>Results of Players Played So Far</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Number of Games Played</th>
              <th>Average Number of Moves</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <span>
                    <span className="fi fi-af"></span>
                  </span>
                  <span>{user}</span>
                </td>
                <td>{userStats[user].gamesPlayed}</td>
                <td>{userStats[user].avgMoves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	<div className="pagination">
  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
    <span className="fi fi-previous"></span>
  </button>
  {Array.from({ length: Math.ceil(Object.keys(userStats).length / usersPerPage) }, (_, i) => (
    <button
      key={i}
      onClick={() => paginate(i + 1)}
      className={currentPage === i + 1 ? "active" : ""}
    >
      {i + 1}
    </button>
  ))}
  <button onClick={handleNextClick} disabled={currentPage === Math.ceil(Object.keys(userStats).length / usersPerPage)}>
  <span className="fi fi-arrows-horizontal"></span>
</button>
</div>

</div>
  );
}
  export default Dashboard