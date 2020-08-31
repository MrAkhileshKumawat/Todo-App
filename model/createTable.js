module.exports=(knex)=>{
    knex.schema.hasTable('city').then( function (exists) {
        if (!exists) {
            return knex.schema.createTable('city', function (table) {
                table.increments('id').primary();
                table.string('name', 100).unique().notNullable();
            });
        }
    });
    
    
    knex.schema.hasTable('users').then(async function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', function (table) {
                table.increments('id').primary();
                table.string('name', 100).notNullable();
                table.string('eMail',100).unique().notNullable();
                table.string('password').notNullable();
                table.integer("age").notNullable()
                table.integer("cityId").notNullable()
            });
        }
    });

    knex.schema.hasTable('todo').then(async function (exists) {
        if (!exists) {
            return knex.schema.createTable('todo', function (table) {
                table.increments('id').primary();
                table.integer('assignedTo').notNullable();
                table.string('text',200).notNullable();
                table.string('dueDate',10).notNullable();
            });
        }
    });
}
