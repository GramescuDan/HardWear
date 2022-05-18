import http from '../http-common';

class ItemsService {
  getAll() {
    return http.get("/items");
  }

  getItemById(id: number) {
    return http.get(`items/${id}`);
  }

  // cart final checkout - to do
  putItemById(id: number) {
    return http.put(`items/${id}`);
  }

}
export default new ItemsService();
