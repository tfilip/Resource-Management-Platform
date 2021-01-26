module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        resource_create: {
            type: Sequelize.INTEGER
        },
        resource_view: {
            type: Sequelize.INTEGER
        },
        resource_delete: {
            type: Sequelize.INTEGER
        },
        resource_reserve: {
            type: Sequelize.INTEGER
        },
    });

    return Role;
};