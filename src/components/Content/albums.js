const albumColors = ['bg-steel-blue', 'bg-vegas-yellow', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];

let albums = [
    {
        name: 'Hot Fuss',
        image: 'bg-hf'
    },

    {
        name: "Sam's Town",
        image: 'bg-st'
    },

    {
        name: 'Sawdust',
        image: 'bg-sd'
    },

    {
        name: 'Day & Age',
        image: 'bg-da'
    },

    {
        name: 'Battle Born',
        image: 'bg-bb'
    },

    {
        name: 'Wonderful Wonderful',
        image: 'bg-ww'
    },

    {
        name: 'Imploding The Mirage',
        image: 'bg-itm'
    },

    {
        name: 'Pressure Machine',
        image: 'bg-pm'
    }
];

let id = 0;
albums.forEach(album => {
    album.id = id;
    id++;
    switch (album.id % 6) {
        case 0:
            album.color = albumColors[0];
            break;
        case 1:
            album.color = albumColors[1];
            break;
        case 2:
            album.color = albumColors[2];
            break;
        case 3:
            album.color = albumColors[3];
            break;
        case 4:
            album.color = albumColors[4];
            break;
        case 5:
            album.color = albumColors[5];
            break;
    }
})

export default albums;