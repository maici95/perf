


const fs = require('fs');


const geojson = {
    type: 'FeatureCollection',
    features: Array(50000).fill(0).map(() => 
        ({
            "type": "Feature",
            "properties": {
                fill_level: Math.random() * 120
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    Math.random() * 1 + 27,
                    Math.random() * 0.5 + 62
                ]
            }
        })
    )
}

fs.writeFile('./test.json', JSON.stringify(geojson, null, '\t'), (err, res) => {});
