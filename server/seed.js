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
            DROP TABLE IF EXISTS audios, covers, albums;

            CREATE TABLE albums (
                album_id SERIAL PRIMARY KEY,
                album_name VARCHAR(50),
                release_year INT,
                image_url VARCHAR(256),
                num_tracks INT
            );
            
            CREATE TABLE audios (
                song_id SERIAL PRIMARY KEY,
                url VARCHAR(256),
                album_id INT REFERENCES albums(album_id),
                song_name VARCHAR(100)
            );

            CREATE TABLE covers (
                cover_id SERIAL PRIMARY KEY,
                image_url VARCHAR(256),
                audio_url VARCHAR(256),
                cover_name VARCHAR(100),
                total_plays INT
            );

            INSERT INTO albums (album_name, release_year, image_url, num_tracks)
            VALUES
            ('Hot Fuss', 2004, 'https://drive.google.com/thumbnail?id=1DewSTrolIXhNjXRkW2hdeL68twQDG0TA', 12),
            ('Sams Town', 2006, 'https://drive.google.com/thumbnail?id=1FV902wT8ZQsv4VeHge61NdWJ8zx6Z-Oz', 13),
            ('Sawdust', 2007, 'https://drive.google.com/thumbnail?id=1sU4GOC6nnbRDISraLD2vXfnx-Ws_4b0S', 17),
            ('Day & Age', 2008, 'https://drive.google.com/thumbnail?id=1CtMmDaOHHRzvjAB94EC97U0YM9yXgPf1', 16),
            ('Battle Born', 2012, 'https://drive.google.com/thumbnail?id=1VpU2X6kNqQf8t82YlDRSspLqZweeiE-F', 16),
            ('Wonderful Wonderful', 2017, 'https://drive.google.com/thumbnail?id=1KQsxmGANyo5iyeQodw_XmQ3dPvUXxS0m', 10),
            ('Imploding The Mirage', 2020, 'https://drive.google.com/thumbnail?id=1iZvolJ9XDm8vbuIFQAn6L7vCCWIhORlB', 13),
            ('Pressure Machine', 2021, 'https://drive.google.com/thumbnail?id=1-ea2zdppYUzXYU9x1nJUKxZzfUTtOcWs', 18);

            INSERT INTO covers (image_url, audio_url, cover_name, total_plays)
            VALUES
            ('https://drive.google.com/thumbnail?id=1-7H7nPD2URtKe3OVIrSzb7_lsv5l7Q79', 'https://docs.google.com/uc?export=download&id=1qMiYoBfDs3lj2DzYTUxAY4iKnZY5KG1V', 'Mr. Brightside', 0),
            ('https://drive.google.com/thumbnail?id=1vHYA9KjpeYC4WMHNNJnO7sypzAxAPSH0', 'https://docs.google.com/uc?export=download&id=1XuRnVmkPuHycbNJ4Imd6zARFomBkQ4mY', 'All These Things That Ive Done', 0);
            
            INSERT INTO audios (url, album_id, song_name)
            VALUES 
            ('https://docs.google.com/uc?export=download&id=1m0hXNmFa2GkzCJLnpoLhKcfnKmuplAsh', 1, 'Jenny Was a Friend of Mine'),
            ('https://docs.google.com/uc?export=download&id=1zRzd2XI3YhIzkv6tlQSXUiI5qMtvW_-V', 1, 'Mr. Brightside'),
            ('https://docs.google.com/uc?export=download&id=1ndgfDJ-u7h2m2UI33Lb9XOmiAJ78ki5N', 1, 'Smile Like You Mean It'),
            ('https://docs.google.com/uc?export=download&id=1hlpTmYU_InPcYYNEmjMzIXBHH7q7vL-_', 1, 'Somebody Told Me'),
            ('https://docs.google.com/uc?export=download&id=1nNdTRcxhIWPzMJ-jUbmvd6Lx9zhkzf65', 1, 'All These Things That Ive Done'),
            ('https://docs.google.com/uc?export=download&id=1VtL-FlNSaMkgOnDGI_t4DWr9BXuOPPXa', 1, 'Andy, Youre a Star'),
            ('https://docs.google.com/uc?export=download&id=1qxkqARLakFiSyGZyHn0B9WpXoOPqRY9K', 1, 'On Top'),
            ('https://docs.google.com/uc?export=download&id=10LP3mANNDr0YLG6fHmbjmWY7Al60bZqE', 1, 'Change Your Mind'),
            ('https://docs.google.com/uc?export=download&id=13F6aCQQuSFDQIQZWn-QXlU0258LHDo3z', 1, 'Believe Me Natalie'),
            ('https://docs.google.com/uc?export=download&id=1djYKaxYXM_akRNPkvNH0PCBvSUtDVa-f', 1, 'Midnight Show'),
            ('https://docs.google.com/uc?export=download&id=1KyjRT_uc1XEmbi4AGIWn_6owHQimfVnp', 1, 'Everything Will Be Alright'),
            ('https://docs.google.com/uc?export=download&id=1g-EDRY08Q25BwX4nikS5aj4njElEKHbm', 1, 'Glamorous Indie Rock and Roll'),
            
            
            ('https://docs.google.com/uc?export=download&id=106BR8qGfS5QL2f65Pudwzt8N8EjZf6Jr', 2, 'Sams Town'),
            ('https://docs.google.com/uc?export=download&id=1WLY3eeTfq-y6MneNZ0CVh7RT9qGooi18', 2, 'Enterlude'),
            ('https://docs.google.com/uc?export=download&id=1sBEkXy-bbB2bcXeoUWEDtMDItRb3y_U0', 2, 'When You Were Young'),
            ('https://docs.google.com/uc?export=download&id=1CUDnUCONOxR6X37QDcd0MeySgo3KDVJ9', 2, 'Bling (Confession of a King)'),
            ('https://docs.google.com/uc?export=download&id=1JZwuVTONRAn-EN3IbAa97XpW7B6IK6ZD', 2, 'For Reasons Unknown'),
            ('https://docs.google.com/uc?export=download&id=1Xl24U053bhtcNc8g1tcWee-9_5WWFq85', 2, 'Read My Mind'),
            ('https://docs.google.com/uc?export=download&id=1_jr2bhlACltd5ThCrQgfJ_2Ywq4-RPku', 2, 'Uncle Johnny'),
            ('https://docs.google.com/uc?export=download&id=1pbg4ryWqdgu3ZR-KKu0rWtiOhpYrOaxx', 2, 'Bones'),
            ('https://docs.google.com/uc?export=download&id=1o_2HFImzHBdtMcJBUxQLx85PvtjQXqHO', 2, 'My List'),
            ('https://docs.google.com/uc?export=download&id=126e0h9mwK2srHZRwpAKGFs49HcDcR6w9', 2, 'This River is Wild'),
            ('https://docs.google.com/uc?export=download&id=1OrVccH7mR2YoU-TOis9-Y5kH95WReEc7', 2, 'Why Do I Keep Counting'),
            ('https://docs.google.com/uc?export=download&id=1kHI7I1VCPkd1HvbK0Cy2Ylt8CkfFz-WN', 2, 'Peace Of Mind'),
            ('https://docs.google.com/uc?export=download&id=1yv5XI0J9RgSR4zY8dUJb-bsph2rP8stR', 2, 'Exitlude'),


            ('https://docs.google.com/uc?export=download&id=1RafcsAIxGj24Dfw1VjKQm-oAKp4sCmBZ', 3, 'Tranquilize'),
            ('https://docs.google.com/uc?export=download&id=1hPTCbg2996zFOlg8PfTtwxOAYtOktAam', 3, 'Shadowplay'),
            ('https://docs.google.com/uc?export=download&id=16I7K2SVGu1JkXJYdCiQTQleui1ybGi2e', 3, 'All The Pretty Faces'),
            ('https://docs.google.com/uc?export=download&id=1A8wiIGCJSjsvz0wCuwYNIXibfOHE8XJ0', 3, 'Leave The Bourbon On The Shelf'),
            ('https://docs.google.com/uc?export=download&id=1VsgxaccX1AYGjHa1eW1cGhcG3cWfb-yg', 3, 'Sweet Talk'),
            ('https://docs.google.com/uc?export=download&id=1Bssgra-AQ9BSkUKFbjs6hFqZDReOBgqG', 3, 'Under The Gun'),
            ('https://docs.google.com/uc?export=download&id=1nGjXrAwQXTK3Mo7Blp74yKJ56bw9-f9q', 3, 'Where The White Boys Dance'),
            ('https://docs.google.com/uc?export=download&id=10E3U7eZPD6DlMSpBiYx0KXYD8p-s5sl2', 3, 'Show You How'),
            ('https://docs.google.com/uc?export=download&id=1q8cvrCme-rhrYoD7gOYkT9mu7oKMBRoG', 3, 'Move Away'),
            ('https://docs.google.com/uc?export=download&id=1DZW1hoyKvljXcsLyAbfYVpMj8bAWXW5o', 3, 'Glamorous Indie Rock And Roll'),
            ('https://docs.google.com/uc?export=download&id=1G-Nd4YL73VqlmdxysMVxqybCBvQ3kmar', 3, 'Who Let You Go'),
            ('https://docs.google.com/uc?export=download&id=1vq1FUJTDBUFz2Af5T4WFUQyhXMl1oAPv', 3, 'The Ballad of Michael Valentine'),
            ('https://docs.google.com/uc?export=download&id=1vp60m6PUWRCh4LlR7GPe-75ueptk1rWd', 3, 'Ruby, Dont Take Your Love to Town'),
            ('https://docs.google.com/uc?export=download&id=1b9yYkNJmdjB3sPHiK-EY45A-U9j_oZyH', 3, 'Daddys Eyes'),
            ('https://docs.google.com/uc?export=download&id=1hFjikmQMlP-F4UhF8pG9Wn35vBAmquNe', 3, 'Sams Town (Abbey Road Version)'),
            ('https://docs.google.com/uc?export=download&id=15J0HTTkJxvm7S1WpW3GKdKHuE1ziZIVc', 3, 'Romeo and Juliet'),
            ('https://docs.google.com/uc?export=download&id=1VpJqVpXde7Cv3x447SijjrkS9QkH_F8j', 3, 'Mr. Brightside (Jaques Lu Cont Remix)'),


            ('https://docs.google.com/uc?export=download&id=1EVGkzUxnzmPtmoliDEZhI-Z3OywxPbtx', 4, 'Losing Touch'),
            ('https://docs.google.com/uc?export=download&id=1WdS04aQVlpCTOvP6Lg5bE99yK9ZbxnRm', 4, 'Human'),
            ('https://docs.google.com/uc?export=download&id=1Ba_-z08uXGXpuvp_GaqMM-w-taIGwVDp', 4, 'Spaceman'),
            ('https://docs.google.com/uc?export=download&id=1lqiHVaAVS831pCPTh6ZL56HTDclldCCP', 4, 'Joyride'),
            ('https://docs.google.com/uc?export=download&id=1l7zUM-4sLUCTnXmrg3VvMYXRLmyHD14d', 4, 'A Dustland Fairytale'),
            ('https://docs.google.com/uc?export=download&id=12X-TsPusWude5xMiQAPwf2sUoOtJuQRa', 4, 'This is Your Life'),
            ('https://docs.google.com/uc?export=download&id=1v7rstLyxUbdX9ivAGEf_SYy1WI_U--EB', 4, 'I Cant Stay'),
            ('https://docs.google.com/uc?export=download&id=1OscCI3plLVpZHK16feevUwQpgqhURGot', 4, 'Neon Tiger'),
            ('https://docs.google.com/uc?export=download&id=17yrE0Fu7_tb4W3pOk7043S5qGOvsknyD', 4, 'The World We Live In'),
            ('https://docs.google.com/uc?export=download&id=1UAHbdg_pw7VyvK0HiRDw_WfRldTF9ui3', 4, 'Goodnight, Travel Well'),
            ('https://docs.google.com/uc?export=download&id=1NLvf_3ecjOVYO4ZMq91VR87NFNwVaL13', 4, 'Tidal Wave'),
            ('https://docs.google.com/uc?export=download&id=1-8H1lmhqCBWhbIFAtGC-0KT3hGNyOn6H', 4, 'A Crippling Blow'),
            ('https://docs.google.com/uc?export=download&id=1I4-CrtadeBgdcvzG2LjtkxPXWYvdc6vV', 4, 'Forget About What I Said'),
            ('https://docs.google.com/uc?export=download&id=1wvwFswYq7Efd8rJp7ipO0IkyCPlHwJkK', 4, 'Four Winds (Bright Eyes Cover)'),
            ('https://docs.google.com/uc?export=download&id=1xKinBKQH-zetM8lJgu1rWeLAFmTr703o', 4, 'Joy Ride (Night Version)'),
            ('https://docs.google.com/uc?export=download&id=1QmE7s24sT9qWK4hdUAeWvNamCmo90phP', 4, 'O, Sad American Night'),


            ('https://docs.google.com/uc?export=download&id=1hCb7f9mJQ_VGP2lXKZ1KXuNcuMjmHMbE', 5, 'Flesh and Bone'),
            ('https://docs.google.com/uc?export=download&id=1uDSxZSxVfAq5YH0eNtVGey5ErFQJSl44', 5, 'Runaways'),
            ('https://docs.google.com/uc?export=download&id=1YDVFpnmkQYfTY3mbscIgZ6mXXHMpRTZv', 5, 'The Way It Was'),
            ('https://docs.google.com/uc?export=download&id=1AxSGcEvBxlzrH52s8fWScMJURpCoa5dO', 5, 'Here With Me'),
            ('https://docs.google.com/uc?export=download&id=1sypV05APfMqo37kplVFZlJ-A96rIeqcl', 5, 'A Matter of Time'),
            ('https://docs.google.com/uc?export=download&id=1NcoTTSY-0gSbXpR1kZ1EIgFF-DQu2Sfw', 5, 'Deadlines and Commitments'),
            ('https://docs.google.com/uc?export=download&id=1FImis20IDfWZFKE8xlalUmcmgPcNfWQQ', 5, 'Miss Atomic Bomb'),
            ('https://docs.google.com/uc?export=download&id=1KDIPMy2-Ba6FVhPb0yRrq3g6_k-qwzH0', 5, 'The Rising Tide'),
            ('https://docs.google.com/uc?export=download&id=1MFYKTb2eTraq0Hk6mefa3oIbL3cfGpuP', 5, 'Heart of a Girl'),
            ('https://docs.google.com/uc?export=download&id=1a4STQR1YEccG-qPE1IGXeYXNmVhUgDyU', 5, 'From Here On Out'),
            ('https://docs.google.com/uc?export=download&id=1RkYONfkhgPjoU32c3XUeBD7V9eIEotTF', 5, 'Be Still'),
            ('https://docs.google.com/uc?export=download&id=1JPHf5tCKpRNNlJhfAr9wydnnsBx24N0x', 5, 'Battle Born'),
            ('https://docs.google.com/uc?export=download&id=1VPRfQRauNyiRAyhXUAzmMwfGLAAoCGvn', 5, 'Carry Me Home'),
            ('https://docs.google.com/uc?export=download&id=13BI5voBK82FSJDltdDFeofAJQmJdTh33', 5, 'Flesh And Bone (Jaques Lu Cont Remix)'),
            ('https://docs.google.com/uc?export=download&id=1-U2x7XIm46rsCN9JZ7okLkSTZZ3AWSrd', 5, 'Prize Fighter'),
            ('https://docs.google.com/uc?export=download&id=1-Yu3JTuBJwCTcJARP5iotf-gSsUR68HR', 5, 'Be Still (Alternate Version)'),


            ('https://docs.google.com/uc?export=download&id=1US9TbVyRxcJItArNyOM0Hk7z6TB-6Rz0', 6, 'Wonderful Wonderful'),
            ('https://docs.google.com/uc?export=download&id=1C-KkqjLG2ktMPZ2iVXvg6zfhe8TXv5nE', 6, 'The Man'),
            ('https://docs.google.com/uc?export=download&id=1KxV-06dJPK4xc6aBpgGh-ws8D0P4RW1r', 6, 'Rut'),
            ('https://docs.google.com/uc?export=download&id=1L0CvNfF3WemOcrSI9QrGC8NlmbU3bpTS', 6, 'Life To Come'),
            ('https://docs.google.com/uc?export=download&id=1fPSQLsygdRJlj3MsusbT19Kqw4vaMj0D', 6, 'Run For Cover'),
            ('https://docs.google.com/uc?export=download&id=1V0s9ubVBgwpCUW2suqiNWxKJ3UEA5x31', 6, 'Tyson vs. Douglas'),
            ('https://docs.google.com/uc?export=download&id=1aGjRe86Akggon2TT9Z77Ww01-c0IOI9q', 6, 'Some Kind of Love'),
            ('https://docs.google.com/uc?export=download&id=1fwi-UDJtTKPv6Tf2gs5NjlAaJGnnCBk9', 6, 'Out of My Mind'),
            ('https://docs.google.com/uc?export=download&id=1RiiKt7SmINRxnQvbW80W3fMNJcpSmxYo', 6, 'The Calling'),
            ('https://docs.google.com/uc?export=download&id=1cy9tfpIlhe74Fvpjg6UbF5APSAuV1YQq', 6, 'Have All the Songs Been Written'),


            ('https://docs.google.com/uc?export=download&id=10QWh7m9kRxIlvUozP6Zdl6MCTiPc-3_1', 7, 'My Own Souls Warning'),
            ('https://docs.google.com/uc?export=download&id=1llI-za5gz1DlEcYDloytxLAskV_-coR_', 7, 'Blowback'),
            ('https://docs.google.com/uc?export=download&id=1bCdKtGBkgyplJDORaiRXEeehLH84PFyu', 7, 'Dying Breed'),
            ('https://docs.google.com/uc?export=download&id=1GuO4-MZnZc3WxYrvDFNW0MRYZLhVXeEw', 7, 'Caution'),
            ('https://docs.google.com/uc?export=download&id=1xidy1Kwi4Hq0uwP86DY7yiTKopphCu-e', 7, 'Lightning Fields'),
            ('https://docs.google.com/uc?export=download&id=1CepJ8PkMIRVGDMkn_FoQCBWJJdSZa8Av', 7, 'Fire in Bone'),
            ('https://docs.google.com/uc?export=download&id=1h5anSa-7bmtVJOFrfLautH7CQ8zMHrIa', 7, 'Running Towards a Place'),
            ('https://docs.google.com/uc?export=download&id=1OY4_pHQ__FazAEbaSlbY-AbjStZdbAP0', 7, 'My God (feat. Weyes Blood)'),
            ('https://docs.google.com/uc?export=download&id=1U-iSUrQm6mozYu80kKf0uAyecy0FXcuB', 7, 'When The Dreams Run Dry'),
            ('https://docs.google.com/uc?export=download&id=1lZDKUsEhdMA9zzrvyEWDGI3YW_jUce78', 7, 'Imploding The Mirage'),
            ('https://docs.google.com/uc?export=download&id=104bt3vElOnFrcWDZjFoU6jfyD4uvz2zd', 7, 'Cest La Vie'),
            ('https://docs.google.com/uc?export=download&id=1fWJNMWD5cHDrRcD3hnY-lqLUe9IxqFe6', 7, 'Caution (Wasatch Style)'),
            ('https://docs.google.com/uc?export=download&id=1tK50TLCAKu1YVJqHHh6zk6A-kcyCpMhP', 7, 'Blowback (Acoustic)'),


            ('https://docs.google.com/uc?export=download&id=1AHPbE3mNpwFXc9nxUoBAni2QES7Fl4xu', 8, 'West Hills'),
            ('https://docs.google.com/uc?export=download&id=16ZBFNPlbX3wvgRzDBELQf5ticPrQGBb_', 8, 'Quiet Town'),
            ('https://docs.google.com/uc?export=download&id=1PjllSZ0JMBCXMZYxj25IJMhBxua-hWSQ', 8, 'Terrible Thing'),
            ('https://docs.google.com/uc?export=download&id=1j6P1V_ya5TZoLTG5mgtIVQ6IsxkaVYHc', 8, 'Cody (The Miracle)'),
            ('https://docs.google.com/uc?export=download&id=1p07EU0G-G6a3Y9RG0dKTQJznuPmiIvNt', 8, 'Sleepwalker'),
            ('https://docs.google.com/uc?export=download&id=16NADHs_zEyD8bzRpaWBgmSF5IUpz0eim', 8, 'Runaway Horses'),
            ('https://docs.google.com/uc?export=download&id=1oQC5XzS4HbavHu6g90k8xfjea2T6rSsN', 8, 'In The Car Outside'),
            ('https://docs.google.com/uc?export=download&id=1_iYWN4Ozb60WXuE3Ncb8F5g5mNnsPoZ6', 8, 'In Another Life'),
            ('https://docs.google.com/uc?export=download&id=1F6c-AddZTUvYat6D4ORHjBRk6uAooh7m', 8, 'Desperate Things'),
            ('https://docs.google.com/uc?export=download&id=192s_xF1Kh1R9aze8MAhwBu6nrbBBA1Og', 8, 'Pressure Machine'),
            ('https://docs.google.com/uc?export=download&id=1-QEO2SB6-fSB-r198ZP-cFhswFhoqbLM', 8, 'The Getting By'),
            ('https://docs.google.com/uc?export=download&id=1d-l6eVAqhAhbuMh47jt2lB6wJDwD62ig', 8, 'The Getting By II'),
            ('https://docs.google.com/uc?export=download&id=1OFwCWI0i7fX95N1Cikc48ptws0ZXHaRP', 8, 'The Getting By III'),
            ('https://docs.google.com/uc?export=download&id=132CmAtplBgU_clKg2zc5t2W3eD39I7S1', 8, 'The Getting By IV'),
            ('https://docs.google.com/uc?export=download&id=17R3AAudhHieBAKGhQFw_A7nOjZ6s1D7K', 8, 'The Getting By V'),
            ('https://docs.google.com/uc?export=download&id=1kajhnExcNAmG6g7moTRbrmLEyJR6v4nL', 8, 'Runaway Horses II'),
            ('https://docs.google.com/uc?export=download&id=12Q3xWTU-AlPwaaT4MvWG-WWFj43F66vd', 8, 'West Hills II'),
            ('https://docs.google.com/uc?export=download&id=1DB4hJgyBtoG742nLPAMqlaWtSx9BLkns', 8, 'West Hills III');
            `).then(() => {
                console.log('DB seeded!');
                res.sendStatus(200);
            }).catch(err => console.log('Error seeding database.', err));
    }
}