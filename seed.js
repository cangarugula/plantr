const db = require('./models')

return db.sync()
  .then(()=> {
    return db.seed()
  }).then(()=> {
    console.log('syncing the database')
  })
  .catch(error => {
    console.log(error)
  })
  .finally(()=> {
    db.close()
  })



