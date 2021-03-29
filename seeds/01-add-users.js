
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Ryan', username: 'ryan88rulz', age: 26},
        {name: 'Jordan', username: 'chewwwyyyy91', age: 29},
        {name: 'Chad', username: 'chad', age: 21}
      ]);
    });
};
