import { useState, useEffect } from 'react';
import DynamicComponent from '../dynamicComponent/DynamicComponen';
import { HashRouter } from 'react-router-dom'
import useHttp from '../../hooks/useHttp';
import {  Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  const { request } = useHttp();
  const [ tabs, setTabs ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request('./tabs.json');
      setTabs(response.sort((a, b) => a.order - b.order))
    };
    fetchData()
      .catch(console.error)
    
  }, []);

  const renderNaw = () => {
    return (
      <ul>
        {tabs.map(elem => {
          return (
            <li key={elem.id}>
              <NavLink 
                to={elem.id}
                className={({ isActive}) =>
                  isActive ? "active" : ""
                }
              >
                {elem.id}
              </NavLink>
            </li>
          )
          })}
      </ul>
    )
  };

  const renderRoutes = () => {
    return tabs.map((elem, index) => {
      return <Route 
        key={index}
        path={elem.id} 
        element={<DynamicComponent componentName={elem.id}/>} 
      />
    })
  }


  return (
    <HashRouter>
      <div>
        <header>
          <h1><NavLink to='/'>Test App</NavLink></h1>
          {renderNaw()}
        </header>
        {tabs.length > 0 && (
        <Routes>
          <Route path="/" element={<DynamicComponent componentName={tabs[0].id} />} />
          {renderRoutes()}
        </Routes>
        )}
      </div>
    </HashRouter>
  );
}

export default App;
