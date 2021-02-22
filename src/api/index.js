import axios from "axios";

export const key = '39f5cc0d37ae1fa0cb26c4fefc3801e6';

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});