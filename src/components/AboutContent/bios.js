const moment = require('moment');

const daveAge = moment(new Date('1976/03/28')).fromNow().slice(0,2);
const brandonAge = moment(new Date('1981/06/21')).fromNow().slice(0,2);
const markAge = moment(new Date('1977/06/28')).fromNow().slice(0,2);
const ronnieAge = moment(new Date('1976/02/15')).fromNow().slice(0,2);

console.log(markAge);

module.exports = {
    bandDescription: 'The Killers are an American rock band comprised of Dave Keuning, Brandon Flowers, Mark Stoermer, and Ronnie Vannucci Jr. They were formed in Las Vegas in 2001 by Dave and Brandon, with Mark and Ronnie both joining a year later. Over the course of their career they have released seven studio albums and a rarities compilation, in addition to various other special projects and solo material. Their music is internationally acclaimed and they are considered one of the biggest rock bands of the 21st century. Their musical influences include Bruce Springsteen, U2, The Cure, The Cars, Oasis, and others, and they are widely known for their ever-changing musical style; each studio album they produce has marked differences in its overall soundscape. They are one of the most successful touring bands of all time, having performed live shows on six continents and in fifty countries. Click on a band member above to learn more about them, or click the band name on the nav bar to navigate through the page.',
    daveDescription: `Dave Keuning is the lead guitarist for The Killers. He is best known for writing the riff to Mr. Brightside, which has gone on to become one of the most popular songs of all time. Keuning is originally from Iowa, but moved to Las Vegas in 2000 and formed The Killers in 2001 with Brandon Flowers after placing an ad in a newspaper looking for like minded musicians. From the band's inception through August 2017, he played in every show. Since that time, he has appeared off and on at live shows, while releasing two solo albums entitled "Prismism" (2019) and "A Mild Case of Everything" (2021). Keuning is known for anthemic and soaring solos, and difficult string-skipping fingerwork. He currently resides in San Diego, California with his wife Emilie and his son. He is ${daveAge} years old.`,
    brandonDescription: `Brandon Flowers is the lead singer and keyboardist for The Killers. He is also the main songwriter on almost all of their songs. He is the youngest of six children, and was raised in both Henderson, Nevada and Nephi, Utah. Flowers is a member of The Church of Jesus Christ of Latter-day Saints, and many of his songs contain references to his faith, his family, and the places he was raised. He has two solo albums: "Flamingo" (2010), and "The Desired Effect" (2015). He is held in high esteem by other famous musicians such as Elton John, Bono, Ric Ocasek (of The Cars), and Bruce Springsteen. He is married to Tana Mundkowsky, and they have three boys together. He currently resides in Park City, Utah and is ${brandonAge} years old.`,
    markDescription: `Mark Stoermer is the bassist for The Killers. He grew up in Las Vegas, Nevada and played for a number of local bands there before joining The Killers. He has been dubbed "The Gentle Giant" by bandmates and fans due to his quiet but kind nature and because he is 6'5". In 2013, his hearing was permanently damaged by a pyrotechnic accident during a set at Wembley Stadium. Although he still contributes to most studio albums and plays occassional shows, he no longer regularly tours with the band. Stoermer, like his bandmates, has released several studio albums: "Another Life" (2011), "Dark Arts" (2016), and "Filthy Apes and Lions" (2017). His solo work is noticeably different from that of his bandmates. He is ${markAge} years old.`,
    ronnieDescription: `Ronnie Vannucci Jr. is the drummer for The Killers. He was born and raised in Las Vegas, Nevada although he currently resides near Brandon Flowers in Park City, Utah. An accomplished musician, Ronnie has been key to much of The Killers collaborative work and success. He studied classical perccussion at UNLV, and several of The Killers early songs were recorded during late night sessions in the campus band room there. Vannucci has a side project, "Big Talk" which has released two albums: "Big Talk" (2011) and "Straight In No Kissin'" (2015). He has been drumming since he was six years old, and played for local bands in Vegas from the time he was 12 until he joined The Killers. Vannucci is married and has one child. He is ${ronnieAge} years old.`
}