const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.send(repositories);
  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = 
  {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  
  return response.status(201).send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository=>repository.id ===id);
  
  if (repositoryIndex<0)
  {
      return response.status(400).send('Id not found');
  } else 
  {
    repositories[repositoryIndex].title = title;
    repositories[repositoryIndex].url = url;
    repositories[repositoryIndex].techs = techs; 
  
    return response.status(200).send(repositories[repositoryIndex]);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex((repository)=>repository.id ===id);
  if (repositoryIndex<0)
  {
      return response.status(400).send('Id not found');
  } else 
  {
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository=>repository.id ===id)
  if (repositoryIndex<0)
  {
      return response.status(400).send('Id not found');
  } else 
  {
    repositories[repositoryIndex].likes +=1 ; 
    return response.status(200).send(repositories[repositoryIndex]);
  }

});

module.exports = app;
