import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.js";


import {ToDoList} from "./screens/ToDoList";
import ToDoDashboard from "./screens/ToDoDashboard";
import { useTheme } from './appContext/AppThemeContext';
import { AppThemeChanger } from './components/AppThemeChanger';


function App() {

  const {theme, toggleTheme} = useTheme();
 
  return (
    <div style={ ("dark" == theme ) ? AppStyles.dark : AppStyles.light} >
    <Router>
    
      <header  className="App-header" style={AppStyles.appHeader}>
      
      <Link  to="/" style={("dark" == theme ) ? AppStyles.linkDark : AppStyles.linkLight}> Home </Link>
      <Link to="/todo-list" style={("dark" == theme ) ? AppStyles.linkDark : AppStyles.linkLight}> Show All </Link>
      <Link to="/dashboard" style={("dark" == theme ) ? AppStyles.linkDark : AppStyles.linkLight}>Get Statistics</Link>
      <AppThemeChanger />

      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<ToDoList />}/>
        <Route path="/dashboard" element={<ToDoDashboard />}/>
      
      </Routes>

    </Router>
    </div>
  );
}

const AppStyles = {
  linkDark: {
    margin: "5rem",
    textDecoration: "none",
    color: 'white',
   
  },
  linkLight: {
    margin: "5rem",
    textDecoration: "none",
    color: 'black',
    
  },
  appHeader: {
    minHeight: "10vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px"
  },
  dark: {
    backgroundColor: "#242020",
    color: "white"
  },
  light: {
    backgroundColor: "white",
    color: "black"
  }

}

export default App;



