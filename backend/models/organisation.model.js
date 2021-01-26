module.exports = (sequelize, Sequelize) => {
    const Organisation = sequelize.define("organisations", {
        name: {
            type: Sequelize.STRING
        },
        admin_id: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Organisation;
};