require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS audios, covers;
            
            CREATE TABLE audios (
                song_id SERIAL PRIMARY KEY,
                url VARCHAR(256),
                album_id INT
            );

            CREATE TABLE covers (
                cover_id SERIAL PRIMARY KEY,
                url VARCHAR(256),
                cover_name VARCHAR(100),
                total_plays INT
            );

            INSERT INTO covers (url, cover_name, total_plays)
            VALUES
            ('https://docs.google.com/uc?export=download&id=1qMiYoBfDs3lj2DzYTUxAY4iKnZY5KG1V', 'Mr. Brightside', 0),
            ('https://docs.google.com/uc?export=download&id=1XuRnVmkPuHycbNJ4Imd6zARFomBkQ4mY', 'All These Things That Ive Done', 0);
            
            INSERT INTO audios (url, album_id)
            VALUES 
            ('https://docs.google.com/uc?export=download&id=1m0hXNmFa2GkzCJLnpoLhKcfnKmuplAsh', 0),
            ('https://docs.google.com/uc?export=download&id=1zRzd2XI3YhIzkv6tlQSXUiI5qMtvW_-V', 0),
            ('https://docs.google.com/uc?export=download&id=1ndgfDJ-u7h2m2UI33Lb9XOmiAJ78ki5N', 0),
            ('https://docs.google.com/uc?export=download&id=1hlpTmYU_InPcYYNEmjMzIXBHH7q7vL-_', 0),
            ('https://docs.google.com/uc?export=download&id=1nNdTRcxhIWPzMJ-jUbmvd6Lx9zhkzf65', 0),
            ('https://docs.google.com/uc?export=download&id=1VtL-FlNSaMkgOnDGI_t4DWr9BXuOPPXa', 0),
            ('https://docs.google.com/uc?export=download&id=1qxkqARLakFiSyGZyHn0B9WpXoOPqRY9K', 0),
            ('https://docs.google.com/uc?export=download&id=10LP3mANNDr0YLG6fHmbjmWY7Al60bZqE', 0),
            ('https://docs.google.com/uc?export=download&id=13F6aCQQuSFDQIQZWn-QXlU0258LHDo3z', 0),
            ('https://docs.google.com/uc?export=download&id=1djYKaxYXM_akRNPkvNH0PCBvSUtDVa-f', 0),
            ('https://docs.google.com/uc?export=download&id=1KyjRT_uc1XEmbi4AGIWn_6owHQimfVnp', 0),
            ('https://docs.google.com/uc?export=download&id=1g-EDRY08Q25BwX4nikS5aj4njElEKHbm', 0),
            
            
            ('https://docs.google.com/uc?export=download&id=106BR8qGfS5QL2f65Pudwzt8N8EjZf6Jr', 1),
            ('https://docs.google.com/uc?export=download&id=1WLY3eeTfq-y6MneNZ0CVh7RT9qGooi18', 1),
            ('https://docs.google.com/uc?export=download&id=1sBEkXy-bbB2bcXeoUWEDtMDItRb3y_U0', 1),
            ('https://docs.google.com/uc?export=download&id=1CUDnUCONOxR6X37QDcd0MeySgo3KDVJ9', 1),
            ('https://docs.google.com/uc?export=download&id=1JZwuVTONRAn-EN3IbAa97XpW7B6IK6ZD', 1),
            ('https://docs.google.com/uc?export=download&id=1Xl24U053bhtcNc8g1tcWee-9_5WWFq85', 1),
            ('https://docs.google.com/uc?export=download&id=1_jr2bhlACltd5ThCrQgfJ_2Ywq4-RPku', 1),
            ('https://docs.google.com/uc?export=download&id=1pbg4ryWqdgu3ZR-KKu0rWtiOhpYrOaxx', 1),
            ('https://docs.google.com/uc?export=download&id=1o_2HFImzHBdtMcJBUxQLx85PvtjQXqHO', 1),
            ('https://docs.google.com/uc?export=download&id=126e0h9mwK2srHZRwpAKGFs49HcDcR6w9', 1),
            ('https://docs.google.com/uc?export=download&id=1OrVccH7mR2YoU-TOis9-Y5kH95WReEc7', 1),
            ('https://docs.google.com/uc?export=download&id=1kHI7I1VCPkd1HvbK0Cy2Ylt8CkfFz-WN', 1),
            ('https://docs.google.com/uc?export=download&id=1yv5XI0J9RgSR4zY8dUJb-bsph2rP8stR', 1),


            ('https://docs.google.com/uc?export=download&id=1RafcsAIxGj24Dfw1VjKQm-oAKp4sCmBZ', 2),
            ('https://docs.google.com/uc?export=download&id=1hPTCbg2996zFOlg8PfTtwxOAYtOktAam', 2),
            ('https://docs.google.com/uc?export=download&id=16I7K2SVGu1JkXJYdCiQTQleui1ybGi2e', 2),
            ('https://docs.google.com/uc?export=download&id=1A8wiIGCJSjsvz0wCuwYNIXibfOHE8XJ0', 2),
            ('https://docs.google.com/uc?export=download&id=1VsgxaccX1AYGjHa1eW1cGhcG3cWfb-yg', 2),
            ('https://docs.google.com/uc?export=download&id=1Bssgra-AQ9BSkUKFbjs6hFqZDReOBgqG', 2),
            ('https://docs.google.com/uc?export=download&id=1nGjXrAwQXTK3Mo7Blp74yKJ56bw9-f9q', 2),
            ('https://docs.google.com/uc?export=download&id=10E3U7eZPD6DlMSpBiYx0KXYD8p-s5sl2', 2),
            ('https://docs.google.com/uc?export=download&id=1q8cvrCme-rhrYoD7gOYkT9mu7oKMBRoG', 2),
            ('https://docs.google.com/uc?export=download&id=1DZW1hoyKvljXcsLyAbfYVpMj8bAWXW5o', 2),
            ('https://docs.google.com/uc?export=download&id=1G-Nd4YL73VqlmdxysMVxqybCBvQ3kmar', 2),
            ('https://docs.google.com/uc?export=download&id=1vq1FUJTDBUFz2Af5T4WFUQyhXMl1oAPv', 2),
            ('https://docs.google.com/uc?export=download&id=1vp60m6PUWRCh4LlR7GPe-75ueptk1rWd', 2),
            ('https://docs.google.com/uc?export=download&id=1b9yYkNJmdjB3sPHiK-EY45A-U9j_oZyH', 2),
            ('https://docs.google.com/uc?export=download&id=1hFjikmQMlP-F4UhF8pG9Wn35vBAmquNe', 2),
            ('https://docs.google.com/uc?export=download&id=15J0HTTkJxvm7S1WpW3GKdKHuE1ziZIVc', 2),
            ('https://docs.google.com/uc?export=download&id=1VpJqVpXde7Cv3x447SijjrkS9QkH_F8j', 2),


            ('https://docs.google.com/uc?export=download&id=1EVGkzUxnzmPtmoliDEZhI-Z3OywxPbtx', 3),
            ('https://docs.google.com/uc?export=download&id=1WdS04aQVlpCTOvP6Lg5bE99yK9ZbxnRm', 3),
            ('https://docs.google.com/uc?export=download&id=1Ba_-z08uXGXpuvp_GaqMM-w-taIGwVDp', 3),
            ('https://docs.google.com/uc?export=download&id=1lqiHVaAVS831pCPTh6ZL56HTDclldCCP', 3),
            ('https://docs.google.com/uc?export=download&id=1l7zUM-4sLUCTnXmrg3VvMYXRLmyHD14d', 3),
            ('https://docs.google.com/uc?export=download&id=12X-TsPusWude5xMiQAPwf2sUoOtJuQRa', 3),
            ('https://docs.google.com/uc?export=download&id=1v7rstLyxUbdX9ivAGEf_SYy1WI_U--EB', 3),
            ('https://docs.google.com/uc?export=download&id=1OscCI3plLVpZHK16feevUwQpgqhURGot', 3),
            ('https://docs.google.com/uc?export=download&id=17yrE0Fu7_tb4W3pOk7043S5qGOvsknyD', 3),
            ('https://docs.google.com/uc?export=download&id=1UAHbdg_pw7VyvK0HiRDw_WfRldTF9ui3', 3),
            ('https://docs.google.com/uc?export=download&id=1NLvf_3ecjOVYO4ZMq91VR87NFNwVaL13', 3),
            ('https://docs.google.com/uc?export=download&id=1-8H1lmhqCBWhbIFAtGC-0KT3hGNyOn6H', 3),
            ('https://docs.google.com/uc?export=download&id=1I4-CrtadeBgdcvzG2LjtkxPXWYvdc6vV', 3),
            ('https://docs.google.com/uc?export=download&id=1wvwFswYq7Efd8rJp7ipO0IkyCPlHwJkK', 3),
            ('https://docs.google.com/uc?export=download&id=1xKinBKQH-zetM8lJgu1rWeLAFmTr703o', 3),
            ('https://docs.google.com/uc?export=download&id=1QmE7s24sT9qWK4hdUAeWvNamCmo90phP', 3),


            ('https://docs.google.com/uc?export=download&id=1hCb7f9mJQ_VGP2lXKZ1KXuNcuMjmHMbE', 4),
            ('https://docs.google.com/uc?export=download&id=1uDSxZSxVfAq5YH0eNtVGey5ErFQJSl44', 4),
            ('https://docs.google.com/uc?export=download&id=1YDVFpnmkQYfTY3mbscIgZ6mXXHMpRTZv', 4),
            ('https://docs.google.com/uc?export=download&id=1AxSGcEvBxlzrH52s8fWScMJURpCoa5dO', 4),
            ('https://docs.google.com/uc?export=download&id=1sypV05APfMqo37kplVFZlJ-A96rIeqcl', 4),
            ('https://docs.google.com/uc?export=download&id=1NcoTTSY-0gSbXpR1kZ1EIgFF-DQu2Sfw', 4),
            ('https://docs.google.com/uc?export=download&id=1FImis20IDfWZFKE8xlalUmcmgPcNfWQQ', 4),
            ('https://docs.google.com/uc?export=download&id=1KDIPMy2-Ba6FVhPb0yRrq3g6_k-qwzH0', 4),
            ('https://docs.google.com/uc?export=download&id=1MFYKTb2eTraq0Hk6mefa3oIbL3cfGpuP', 4),
            ('https://docs.google.com/uc?export=download&id=1a4STQR1YEccG-qPE1IGXeYXNmVhUgDyU', 4),
            ('https://docs.google.com/uc?export=download&id=1RkYONfkhgPjoU32c3XUeBD7V9eIEotTF', 4),
            ('https://docs.google.com/uc?export=download&id=1JPHf5tCKpRNNlJhfAr9wydnnsBx24N0x', 4),
            ('https://docs.google.com/uc?export=download&id=1VPRfQRauNyiRAyhXUAzmMwfGLAAoCGvn', 4),
            ('https://docs.google.com/uc?export=download&id=13BI5voBK82FSJDltdDFeofAJQmJdTh33', 4),
            ('https://docs.google.com/uc?export=download&id=1-U2x7XIm46rsCN9JZ7okLkSTZZ3AWSrd', 4),
            ('https://docs.google.com/uc?export=download&id=1-Yu3JTuBJwCTcJARP5iotf-gSsUR68HR', 4),


            ('https://docs.google.com/uc?export=download&id=1US9TbVyRxcJItArNyOM0Hk7z6TB-6Rz0', 5),
            ('https://docs.google.com/uc?export=download&id=1C-KkqjLG2ktMPZ2iVXvg6zfhe8TXv5nE', 5),
            ('https://docs.google.com/uc?export=download&id=1KxV-06dJPK4xc6aBpgGh-ws8D0P4RW1r', 5),
            ('https://docs.google.com/uc?export=download&id=1L0CvNfF3WemOcrSI9QrGC8NlmbU3bpTS', 5),
            ('https://docs.google.com/uc?export=download&id=1fPSQLsygdRJlj3MsusbT19Kqw4vaMj0D', 5),
            ('https://docs.google.com/uc?export=download&id=1V0s9ubVBgwpCUW2suqiNWxKJ3UEA5x31', 5),
            ('https://docs.google.com/uc?export=download&id=1aGjRe86Akggon2TT9Z77Ww01-c0IOI9q', 5),
            ('https://docs.google.com/uc?export=download&id=1fwi-UDJtTKPv6Tf2gs5NjlAaJGnnCBk9', 5),
            ('https://docs.google.com/uc?export=download&id=1RiiKt7SmINRxnQvbW80W3fMNJcpSmxYo', 5),
            ('https://docs.google.com/uc?export=download&id=1cy9tfpIlhe74Fvpjg6UbF5APSAuV1YQq', 5),


            ('https://docs.google.com/uc?export=download&id=10QWh7m9kRxIlvUozP6Zdl6MCTiPc-3_1', 6),
            ('https://docs.google.com/uc?export=download&id=1llI-za5gz1DlEcYDloytxLAskV_-coR_', 6),
            ('https://docs.google.com/uc?export=download&id=1bCdKtGBkgyplJDORaiRXEeehLH84PFyu', 6),
            ('https://docs.google.com/uc?export=download&id=1GuO4-MZnZc3WxYrvDFNW0MRYZLhVXeEw', 6),
            ('https://docs.google.com/uc?export=download&id=1xidy1Kwi4Hq0uwP86DY7yiTKopphCu-e', 6),
            ('https://docs.google.com/uc?export=download&id=1CepJ8PkMIRVGDMkn_FoQCBWJJdSZa8Av', 6),
            ('https://docs.google.com/uc?export=download&id=1h5anSa-7bmtVJOFrfLautH7CQ8zMHrIa', 6),
            ('https://docs.google.com/uc?export=download&id=1OY4_pHQ__FazAEbaSlbY-AbjStZdbAP0', 6),
            ('https://docs.google.com/uc?export=download&id=1U-iSUrQm6mozYu80kKf0uAyecy0FXcuB', 6),
            ('https://docs.google.com/uc?export=download&id=1lZDKUsEhdMA9zzrvyEWDGI3YW_jUce78', 6),
            ('https://docs.google.com/uc?export=download&id=104bt3vElOnFrcWDZjFoU6jfyD4uvz2zd', 6),
            ('https://docs.google.com/uc?export=download&id=1fWJNMWD5cHDrRcD3hnY-lqLUe9IxqFe6', 6),
            ('https://docs.google.com/uc?export=download&id=1tK50TLCAKu1YVJqHHh6zk6A-kcyCpMhP', 6),


            ('https://docs.google.com/uc?export=download&id=1AHPbE3mNpwFXc9nxUoBAni2QES7Fl4xu', 7),
            ('https://docs.google.com/uc?export=download&id=16ZBFNPlbX3wvgRzDBELQf5ticPrQGBb_', 7),
            ('https://docs.google.com/uc?export=download&id=1PjllSZ0JMBCXMZYxj25IJMhBxua-hWSQ', 7),
            ('https://docs.google.com/uc?export=download&id=1j6P1V_ya5TZoLTG5mgtIVQ6IsxkaVYHc', 7),
            ('https://docs.google.com/uc?export=download&id=1p07EU0G-G6a3Y9RG0dKTQJznuPmiIvNt', 7),
            ('https://docs.google.com/uc?export=download&id=16NADHs_zEyD8bzRpaWBgmSF5IUpz0eim', 7),
            ('https://docs.google.com/uc?export=download&id=1oQC5XzS4HbavHu6g90k8xfjea2T6rSsN', 7),
            ('https://docs.google.com/uc?export=download&id=1_iYWN4Ozb60WXuE3Ncb8F5g5mNnsPoZ6', 7),
            ('https://docs.google.com/uc?export=download&id=1F6c-AddZTUvYat6D4ORHjBRk6uAooh7m', 7),
            ('https://docs.google.com/uc?export=download&id=192s_xF1Kh1R9aze8MAhwBu6nrbBBA1Og', 7),
            ('https://docs.google.com/uc?export=download&id=1-QEO2SB6-fSB-r198ZP-cFhswFhoqbLM', 7),
            ('https://docs.google.com/uc?export=download&id=1d-l6eVAqhAhbuMh47jt2lB6wJDwD62ig', 7),
            ('https://docs.google.com/uc?export=download&id=1OFwCWI0i7fX95N1Cikc48ptws0ZXHaRP', 7),
            ('https://docs.google.com/uc?export=download&id=132CmAtplBgU_clKg2zc5t2W3eD39I7S1', 7),
            ('https://docs.google.com/uc?export=download&id=17R3AAudhHieBAKGhQFw_A7nOjZ6s1D7K', 7),
            ('https://docs.google.com/uc?export=download&id=1kajhnExcNAmG6g7moTRbrmLEyJR6v4nL', 7),
            ('https://docs.google.com/uc?export=download&id=12Q3xWTU-AlPwaaT4MvWG-WWFj43F66vd', 7),
            ('https://docs.google.com/uc?export=download&id=1DB4hJgyBtoG742nLPAMqlaWtSx9BLkns', 7);
            `).then(() => {
                console.log('DB seeded!');
                res.sendStatus(200);
            }).catch(err => console.log('Error seeding database.', err));
    }
}