const Sequelize  = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/plantr')


const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER
  }
})

const Plot = db.define('plot',{
  size: {
    type: Sequelize.INTEGER,
  },
  shaded: {
    type: Sequelize.BOOLEAN
  }
})

const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  plantedOn: {
    type: Sequelize.DATE
  }
})

Plot.belongsTo(Gardener);
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})

const sync = ()=> {
  return db.sync({force:true})
}

const seed =  ()=> {

return Promise.all([
    Vegetable.create({
      name: 'carrots',
      color: 'orange',
      plantedOn: new Date()
    }),
    Vegetable.create({
      name: 'beets',
      color: 'red',
      plantedOn: new Date()
    }),
    Vegetable.create({
      name: 'potatoes',
      color: 'brown',
      plantedOn: new Date()
    })
])
  .then(([carrots,beets])=> {
    return Promise.all([
      Gardener.create({
        name: 'moe',
        age: 60,
        favoriteVegetableId: carrots.id
      }),
      Gardener.create({
        name: 'larry',
        age: 70,
        favoriteVegetableId: beets.id
      }),
      Gardener.create({
        name: 'curly',
        age: 88,
        favoriteVegetableId: beets.id
      })
    ])
      .then(([moe,larry,curly])=> {
        return Promise.all([
          Plot.create({
            size: 30,
            shaded: true,
            gardenerId: moe.id
          }),
          Plot.create({
            size: 40,
            shaded: false,
            gardenerId: larry.id
          }),
          Plot.create({
            size: 10,
            shaded: true,
            gardenerId: curly.id
          })
        ])
      })
  })
  .catch( error => {
    console.log(error)
  })
}

const close = ()=> {
  return db.close()
}

module.exports = {
  sync,
  seed,
  close
}

