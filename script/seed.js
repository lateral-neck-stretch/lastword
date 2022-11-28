'use strict'

const {db, models: {User, Prompt} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "aaron", password: "123", email: "test@test.com", proficiency: 250}),
    User.create({ username: "brad", password: "123", email: "test@test.com", proficiency: 200}),
    User.create({ username: "charlie", password: "123", email: "test@test.com", proficiency: 150}),
    User.create({ username: "dave", password: "123", email: "test@test.com", proficiency: 300}),
    User.create({ username: "elton", password: "123", email: "test@test.com", proficiency: 50}),
    User.create({ username: "frank", password: "123", email: "test@test.com", proficiency: 10}),
    User.create({ username: "grant", password: "123", email: "test@test.com", proficiency: 30}),
    User.create({ username: "hugh", password: "123", email: "test@test.com", proficiency: 120}),
    User.create({ username: "ivan", password: "123", email: "test@test.com", proficiency: 270}),
    User.create({ username: "john", password: "123", email: "test@test.com", proficiency: 175}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const prompts = await Promise.all([
    Prompt.create({ title: "Music", key: "Music is an important part of any festival. I mean, who doesn’t want to hear a good tune? But most importantly, music is an important part of any festival experience. Music is the soundtrack to the festival. If you get this part wrong, you will be missing out on a big part of the fun. So, what are the things you need to consider when choosing a festival song? Here are the three things to consider.", content: "Música es un importante parte de alguna festival. yo media, quien doesn’t querer a oír un bueno melodía? pero más importantly, música es un importante parte de alguna festival experiencia. música es el soundtrack a el festival. Si tú obtener esta parte incorrecto, tú será ser desaparecido fuera en un grande parte de el divertido. asi que, qué son el cosas tú necesitar a considerar cuando choosing un festival canción? aquí son el Tres cosas a considerar", language: "spanish", difficulty: 100, topic: "music"}),
    Prompt.create({ title: "Sports", key: "Loose ball nothing but net nothing but net beep test school semester ball four take a walk header alleyoop, nothing but net nothing but net bowledem awww ref. Loose ball tryouts loose ball goal trust our processes, line break clutch play field hockey awww ref theyre going upstairs what a hit win lose or draw. Corner what a hit game of two halves loose ball clutch play what a hit, red card back line beep test rolling maul semester.", content: "Suelto pelota nada pero net nada pero net beep prueba colegio semester pelota las cuatro tomar un caminar header alleyoop, nada pero net nada pero net bowledem awww ref.  Suelto pelota tryouts suelto pelota goal confianza nuestra processes, línea descanso embrague jugar campo hockey awww ref theyre yendo piso de arriba qué un golpear ganar perder o dibujar.  Esquina qué un golpear juego de dos halves suelto pelota embrague jugar qué un golpear, rojo tarjeta espalda línea beep prueba rolling maul semester", language: "spanish", difficulty: 200, topic: "music"})
  ])

  console.log(`seeded ${prompts.length} prompts`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
