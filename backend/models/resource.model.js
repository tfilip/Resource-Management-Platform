module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        resource_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'resources',
                key: 'id'
            }
        }
    });
    return Resource;
};