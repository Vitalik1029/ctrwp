const UserAPI = {
  users: [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com' },
    { id: 2, firstName: 'Dhiraj', lastName: 'Ray', email: 'only2dhir@gmail.com' }
  ],
  all: function () {
    return this.users;
  },
  get: function (id) {
    const isUser = (p) => p.id === id;
    return this.users.find(isUser);
  },
  delete: function (id) {
    const isNotDelUser = (p) => p.id !== id;
    this.users = this.users.filter(isNotDelUser);
    return;
  },
  add: function (user) {
    this.users.push(user); 
    return user;
  },
  update: function (user) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return user;
  },
};
export default UserAPI;