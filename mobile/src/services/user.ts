import http from '../http-common';
import { RegInfo } from '../screens/registration-screen';

class UserService {
    getAll() {
        return http.get("/users");
      }

    login(data: {username: string, password: string}) {
        return http.post('users/login', data);
    }

    register(data: RegInfo<string>) {
      return http.post("/users", data);
    }

    
    }
export default new UserService();
