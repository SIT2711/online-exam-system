import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Exam System</h2>

      <ul style={styles.navLinks}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/exams">Exams</Link></li>
        <li><Link to="/results">Results</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#F8F9FA"
  },

  logo: {
    margin: 0
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0
  }
};

export default Navbar;