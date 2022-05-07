import http from '../http-common';

class UserService {
    getAll() {
        return http.get("/users");
      }

    login(data: {username: string, password: string}) {
        return http.post('users/login', data);
    }

    register(data: {password: string, username: string}) {
      return http.post("/users", data);
    }

    
    }
export default new UserService();
