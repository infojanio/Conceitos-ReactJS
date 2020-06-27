import React, { useState, useEffect } from "react";
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]); //inicialização do estado, com array vazio

  function getRepositories() {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }
  
  useEffect(()=> { //no 1º parâmetro qual função quero disparar 
  getRepositories();
  }, []); //2º parâmetro, quando será disparado, array de dependência, dispara quando a variável for alterada

  async function handleAddRepository() {
    // adiciona repositório
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/infojanio',
      techs: ['NodeJS', 'ReactJS', 'React Native'] 
        });

        const repository = response.data;
        //copiar os repositórios que já tenho, e adicionar o novo no array 
        setRepositories([...repositories, repository]); //conceito imutabilidade
  }

  async function handleRemoveRepository(id) {
    // remove repositório
    await api.delete(`repositories/${id}`); //Usamos a crase p/ passar o id como variável
    
    const deleteRepositories = repositories.filter(
      repository => repository.id !== id
    )
    setRepositories(deleteRepositories);
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
