// src/pages/Home.js
import React, { useEffect, useState, useRef } from 'react';
import { fetchAgents } from '../api/valorantAPI'; // Função que busca os agentes
import AgentCard from '../components/AgentCard'; // Componente para exibir cada agente

const Home = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const loadAgents = async () => {
      const data = await fetchAgents();
      setAgents(data);
    };

    loadAgents();
  }, []);
  const agentListRef = useRef(null);


  const scroll = (direction) => {
    if (direction === 'left') {
      agentListRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    } else {
      agentListRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="agent-details">
      <h1>Agentes do Valorant</h1>
      {agents.length === 0 ? (
        <p>Carregando agentes...</p>
      ) : (
        <div className="agent-list-container">
          <button className="nav-button left" onClick={() => scroll('left')}>←</button>
          <div className="agent-list" ref={agentListRef}>
            {agents.map(agent => (
              <AgentCard key={agent.uuid} agent={agent} />
            ))}
          </div>
          <button className="nav-button right" onClick={() => scroll('right')}>→</button>
        </div>
      )}
    </div>
  );
};

export default Home;
