import React, { useState, useEffect } from "react";
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]); //conceito de estado

  function getRepositories() {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }
  
  useEffect(()=> {
  getRepositories();
  }, []);

  async function handleAddRepository() {
    // adiciona repositório
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/infojanio',
      techs: ['NodeJS', 'ReactJS', 'React Native']
        });

        const repository = response.data;
        setRepositories([...repositories, repository]); //conceito de imutabilidade
  }

  async function handleRemoveRepository(id) {
    // remove repositório
    await api.delete(`repositories/${id}`)
    
    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )
    setRepositories(newRepositories);
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
