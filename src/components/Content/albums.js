//this file renders an array of album objects, each with a valid name, image, color, and id property. Append an album object with the desired name and image properties and 
//generateAlbums() will automatically add the color and serial id number to the object, before returning it with the other objects in the array.

//This is used to generate the albumLinks in the Content.js file, and lift state for audio playback.

const generateAlbums = () => {
    const albumColors = ['bg-steel-blue', 'bg-vegas-yellow', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];

    let albums = [
        {
            name: 'Hot Fuss',
            image: 'bg-hf',
            playing: false
        },
    
        {
            name: "Sam's Town",
            image: 'bg-st',
            playing: false
        },
    
        {
            name: 'Sawdust',
            image: 'bg-sd',
            playing: false
        },
    
        {
            name: 'Day & Age',
            image: 'bg-da',
            playing: false
        },
    
        {
            name: 'Battle Born',
            image: 'bg-bb',
            playing: false
        },
    
        {
            name: 'Wonderful Wonderful',
            image: 'bg-ww',
            playing: false
        },
    
        {
            name: 'Imploding The Mirage',
            image: 'bg-itm',
            playing: false
        },
    
        {
            name: 'Pressure Machine',
            image: 'bg-pm',
            playing: false
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
            
            // no default
        }
    });

    return albums;
}

let generatedAlbums = generateAlbums();

export default generatedAlbums;