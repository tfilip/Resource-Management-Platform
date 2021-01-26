module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Resource;
};