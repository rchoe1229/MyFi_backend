
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {amount: 3200, category: 'Business', type: "Income", date: "2021-03-29", id: "010cb348-3d7e-47a0-94be-16af6da1ba87"},
        {amount: 2000, category: 'Investments', type: "Income", date: "2021-03-22", id: "3274cb9b-8cab-4945-ac26-0a30935d2983"},
        {amount: 700, category: 'Car', type: "Expense", date: "2021-03-29", id: "3274cb9b-8cab-4945-ac26-0a30935d2983"}
      ]);
    });
};
