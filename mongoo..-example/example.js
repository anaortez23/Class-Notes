const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/exampleApp', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));


const Cat = mongoose.model('Cat', { name: String, color: String, age: Number});

// const kitten1 = new Cat({
//     name: 'Garfield', 
//     color: 'orange', 
//     age: 3
// });
// kitten1.save()
// .then(newCatFromDB =>{
//     console.log('New cat added to DB', newCatFromDB)
// }).catch(err => {console.log('Error while creating ne cat:', err);
// })

const createCat = (name, color, age) => {
    const catToAdd = new Cat({
        name, 
        color, 
        age
    });
    
    Cat.create(catToAdd)
    .then(newCatFromDB =>{
        console.log('New cat added to DB', newCatFromDB)
    }).catch(err => {console.log('Error while creating ne cat:', err);
    })
    //alternative way
    // catToAdd.save()
    // .then(newCatFromDB =>{
    //     console.log('New cat added to DB', newCatFromDB)
    // }).catch(err => {console.log('Error while creating ne cat:', err);
    // })
}


// Cat.find({}, (err, cats) => {
    //     if (err) {
        //     console.log(`Error occurred during getting cats from DB: ${err}`);
        //     return;
        //     }
        //     console.log('Got all the CATS!');
        //     // cats is an array of Cat instances
        //     cats.forEach(cat => console.log(` --> cat: ${cat.name}`));
        // });
const findAllCats = () => {
    Cat.find({}, (err, cats) => {
        if (err) {
            console.log(`Error occurred during getting cats from DB: ${err}`);
            return;
        }
        console.log('Got all the CATS!');
        // cats is an array of Cat instances
        cats.forEach(cat => console.log(` --> cat: ${cat.name}`));
    });
    
//how to add many after having the function to add one
// function addTenCats() {
    //     for (let i = 0; i < 10; i++) {
        //         createCat(`Ironhacker ${i}`);
        //     }
        //     }
            
}

createCat('Felix', 'Yellow', 5)

setTimeout(() => {
    findAllCats()
}, 2500)
setTimeout(mongoose.disconnect(), 3500);
