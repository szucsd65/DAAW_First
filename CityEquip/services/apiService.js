const API_BASE = process.env.API_URL || 'http://localhost:3001';
const API_KEY = process.env.API_KEY || 'cityequip-webapp-2026';

class ApiService {
  static headers = { 'X-API-Key': API_KEY };

  static async getEquipments({ type } = {}) {
    const params = type ? `?type=${type}` : '';
    const response = await fetch(`${API_BASE}/equipments${params}`, { 
      headers: this.headers 
    });
    return response.json();
  }

  static async getEquipment(id) {
    const response = await fetch(`${API_BASE}/equipments/${id}`, { 
      headers: this.headers 
    });
    return response.json();
  }
}

module.exports = ApiService;

