import http from '../http-common';

class ItemsService {
  getAll() {
    return http.get("/items");
  }

  getItemById(id: number) {
    return http.get(`items/${id}`);
  }

  putItemById(id: number) {
    return http.put(`items/${id}`);
  }

  saveFavourite(userId: number, itemId: number) {
    return http.post(`/items/saveFavourite/${userId}/${itemId}`)
  }

  removeFavourite(userId: number, itemId: number) {
    return http.post(`items/removeFavourite/${userId}/${itemId}`)
  }

}
export default new ItemsService();
