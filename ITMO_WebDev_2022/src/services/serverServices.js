// import { delay } from '../generalUtils.js';

const DATA_TODO_LIST_RESOURCE = 'todos';

function processResponse(response) {
  console.log(`> ServerService -> requestTodos: response.data =`, response);
  if (response.ok === false) throw new Error(response.statusText);
  return response.json();
}

class ServerService {
  constructor(url) {
    this.url = url;
  }

  get path() {
    return `${this.url}/${DATA_TODO_LIST_RESOURCE}`;
  }

  async requestTodos() {
    console.log(`> ServerService -> requestTodos`);
    try {
      const listOfTodos = await fetch(this.path, {
        method: 'GET',
      }).then((response) => processResponse(response, 'requestTodos'));

      console.log(
        `> ServerService -> requestTodos: listOfTodos =`,
        listOfTodos
      );
      // await delay(3000);
      return listOfTodos;
    } catch (error) {
      console.log(`> ServerService -> requestTodos: error = ${error}`);
      throw error;
    }
  }
  async saveTodo(todoVO) {
    return fetch(this.path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoVO),
    })
      .then((response) => processResponse(response, 'saveTodo'))
      .catch((error) => {
        console.log(`> ServerService -> requestTodos: error = ${error}`);
        throw error;
      });
  }
}

export default ServerService;
