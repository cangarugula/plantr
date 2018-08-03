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


let vegetables = [
  Vegetable.create({
    name: 'carrots',
    color: 'orange',
    plantedOn: new Date()
  }),
  Vegetable.create({
    name: 'beets',
    color: 'red',
    plantedOn: new Date()
  })
]

let gardeners = [
  Gardener.create({
    name: 'moe',
    age: 60
  }),
  Gardener.create({
    name: 'larry',
    age: 70
  }),
  Gardener.create({
    name: 'curly',
    age: 88
  })
]

let plots = [
  Plot.create({
    size: 30,
    shaded: true
  }),
  Plot.create({
    size: 40,
    shaded: false
  })
]

console.log(gardeners)


return Promise.all(vegetables)
  .then(()=> {
    return Promise.all(gardeners)
      .then(()=> {
        return Promise.all(plots)
      })
  })
  .catch( error => {
    console.log(error)
  })


module.exports = db

