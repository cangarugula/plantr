const db = require('./models')

db.sync({force:true})
  .then(()=> {
    console.log('syncing the database')
  })
  .catch(error => {
    console.log(error)
  })
  .finally(()=> {
    db.close()
  })



