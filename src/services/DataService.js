const getTestData = () => {

    return new Promise((resolve, reject) => {

        const testData = [];

        for(let i = 1; i <= 50; i++){
            testData.push({
                id: i,
                name: "Track " + i,
                artist: "Artist " + i,
                album: "Album " + i
            });
        };

        resolve (testData);
    });
};

export { getTestData };