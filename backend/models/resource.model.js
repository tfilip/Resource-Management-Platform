module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        organisation_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'organisations',
                key: 'id'
            }
        }
    });
    return Resource;
};