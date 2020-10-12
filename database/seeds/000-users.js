
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'admin1', password: '123456'},
        {id: 2, username: 'admin2', password: '123456'},
        {id: 3, username: 'admin3', password: '123456'}
      ]);
    });
};