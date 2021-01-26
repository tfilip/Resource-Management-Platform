module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Resource;
};