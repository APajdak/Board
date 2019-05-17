import axios from "axios";

class BoardApi {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url
    });
    this.setInterceptors();
  }

  setInterceptors = () => {
    this.instance.interceptors.request.use(function(config) {
      const token = localStorage.getItem("token");
      config.headers.AuthToken = token ? `Bearer ${token}` : "";
      return config;
    });
  };

  get = path => this.instance.get(path);

  post = (path, payload) => this.instance.post(path, payload);

  patch = (path, payload) => this.instance.patch(path, payload);

  delete = path => this.instance.delete(path);
}

export default new BoardApi("http://localhost:4000/api");
