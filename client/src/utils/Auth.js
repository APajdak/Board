import jwtDecode from "jwt-decode";

class Auth {
  decodeToken(token) {
    return jwtDecode(token);
  }
  saveData(token) {
    const { name, role, slug, _id } = this.decodeToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ name, slug, role, _id }));
  }
  deleteData() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default new Auth();
