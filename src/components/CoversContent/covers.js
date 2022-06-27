const generateCovers = () => {
    const coverColors = ['bg-vegas-yellow', 'bg-steel-blue', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];
    const covers = [
        {
            name: 'Mr. Brightside',
            image: 'bg-spiral-soundwave',
            playing: false
        },

        {
            name: `All These Things That I've Done`,
            image: 'bg-green-soundwave',
            playing: false
        },
    ];

    let id = 0;
    covers.forEach(cover => {
        cover.id = id;
        id++;
        switch (cover.id % 6) {
            case 0:
                cover.color = coverColors[0];
                break;
            case 1:
                cover.color = coverColors[1];
                break;
            case 2:
                cover.color = coverColors[2];
                break;
            case 3:
                cover.color = coverColors[3];
                break;
            case 4:
                cover.color = coverColors[4];
                break;
            case 5:
                cover.color = coverColors[5];
                break;
            
            // no default
        }
    });

    return covers;
}

const generatedCovers = generateCovers();

export default generatedCovers;