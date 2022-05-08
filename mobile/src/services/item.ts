import http from '../http-common';

class ItemsService {
    getAll() {
        return http.get("/items");
      }
    
    }
export default new ItemsService();
