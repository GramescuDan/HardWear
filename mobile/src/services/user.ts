import http from '../http-common';
import { EditableInputs } from '../screens/account/my-profile';
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

    editProfile(data: EditableInputs<string>) {
      console.log(data)
      return http.put(`/users/${data.id}`, data)
    }

    
    }
export default new UserService();
