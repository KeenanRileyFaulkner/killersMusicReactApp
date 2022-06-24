require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const calcRandomTrackNum = arr => {
    return (Math.floor(Math.random() * arr.length));
}

module.exports = {
    getSong: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            SELECT url FROM audios
            WHERE ${id} = album_id`)
        .then(dbRes => {
            const randomTrack = calcRandomTrackNum(dbRes[0]);
            res.status(200).send(dbRes[0][randomTrack].url);
        })
        .catch(err => console.log(err));
    }
}