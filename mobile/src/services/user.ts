import http from '../http-common';

class UserService {
    getAll() {
        return http.get("/users");
      }

    // login(data: {email: string, password: string}) {
    //     return http.post('/login', data);
    // }

    
    }
export default new UserService();
