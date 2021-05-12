  const obj =  [
        {
            "_id": {
                "year": 2021,
                "month": 4,
                "day": 15,
                "hour": 11
            },
            "avgAtemp": 58.75,
            "avgWtemp": 30,
            "avgWaterLevel": 27.5,
            "avgRhumidity": 100
        },
        {
            "_id": {
                "year": 2021,
                "month": 4,
                "day": 15,
                "hour": 12
            },
            "avgAtemp": 30,
            "avgWtemp": 30,
            "avgWaterLevel": 30,
            "avgRhumidity": 100
        },
        {
            "_id": {
                "year": 2021,
                "month": 4,
                "day": 15,
                "hour": 7
            },
            "avgAtemp": 50,
            "avgWtemp": 30,
            "avgWaterLevel": 30,
            "avgRhumidity": 25.75
    },
    {
        "_id": {
            "year": 2021,
            "month": 4,
            "day": 11,
            "hour": 7
        },
        "avgAtemp": 35,
        "avgWtemp": 30,
        "avgWaterLevel": 30,
        "avgRhumidity": 100
    }
    ]

//     var myArray = [
//         [1, 2, 3],
//         [4, 5, 6],    
//         [7, 8, 9],
//        ];



// const length = obj.length;
// for (i = 0; i < obj.length; i++) {
// var check = obj[i]; 
//  for (j =0; j < obj.length; j++)
// myArray[i][0] = check._id.year;
// myArray[i][1] = check._id.month;
// myArray[i][2] = check._id.day;
// myArray[i][3] = check._id.hour;
// myArray[i][4] = check.avgAtemp;
// myArray[i][5] = check.avgWtemp;
// myArray[i][6] = check.avgWaterLevel;
// myArray[i][7] = check.avgRhumidity;

// }

// const check = obj[0]; 

// myArray[0] = check._id.year;
// myArray[1] = check._id.month;
// myArray[2] = check._id.day;
// myArray[3] = check._id.hour;
// myArray[4] = check.avgAtemp;
// myArray[5] = check.avgWtemp;
// myArray[6] = check.avgWaterLevel;
// myArray[7] = check.avgRhumidity;

var json = [{"fields": {"diameter": 23.0, "neighbourhood": "WEST END"}, "model": "hug.tree", "pk": 345}, {"fields": {"diameter": 14.0, "neighbourhood": "MOUNT PLEASANT"}, "model": "hug.tree", "pk": 484}];
var done = [];
obj.forEach(function(object){
    done.push([object._id.year, object._id.month, object._id.day,object._id.hour,object.avgAtemp,object.avgWtemp, object.avgWaterLevel, object.avgRhumidity]);
});

console.log(done);