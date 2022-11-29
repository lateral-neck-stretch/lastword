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
    User.create({ username: "aaron", password: "123", email: "test@test.com", scoreHistory: {$now: 250}, proficiency: 250}),
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
    Prompt.create({ title: "Music", key: "Music is an important part of any festival. I mean, who doesn’t want to hear a good tune? But most importantly, music is an important part of any festival experience. Music is the soundtrack to the festival. If you get this part wrong, you will be missing out on a big part of the fun. So, what are the things you need to consider when choosing a festival song? Here are the three things to consider.", content: "Música es un importante parte de alguna festival. yo media, quien doesn’t querer a oír un bueno melodía? pero más importantly, música es un importante parte de alguna festival experiencia. música es el soundtrack a el festival. Si tú obtener esta parte incorrecto, tú será ser desaparecido fuera en un grande parte de el divertido. asi que, qué son el cosas tú necesitar a considerar cuando choosing un festival canción? aquí son el Tres cosas a considerar", language: "spanish", difficulty: 100, topic: "Music"}),
    Prompt.create({ title: "Sports", key: "Loose ball nothing but net nothing but net beep test school semester ball four take a walk header alleyoop, nothing but net nothing but net bowledem awww ref. Loose ball tryouts loose ball goal trust our processes, line break clutch play field hockey awww ref theyre going upstairs what a hit win lose or draw. Corner what a hit game of two halves loose ball clutch play what a hit, red card back line beep test rolling maul semester.", content: "Suelto pelota nada pero net nada pero net beep prueba colegio semester pelota las cuatro tomar un caminar header alleyoop, nada pero net nada pero net bowledem awww ref.  Suelto pelota tryouts suelto pelota goal confianza nuestra processes, línea descanso embrague jugar campo hockey awww ref theyre yendo piso de arriba qué un golpear ganar perder o dibujar.  Esquina qué un golpear juego de dos halves suelto pelota embrague jugar qué un golpear, rojo tarjeta espalda línea beep prueba rolling maul semester", language: "spanish", difficulty: 200, topic: "Sports"}),
    Prompt.create({ title: "Business I", key: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.", content: "Aproveche los marcos ágiles para proporcionar una sinopsis sólida para descripciones generales de alto nivel. Los enfoques iterativos de la estrategia corporativa fomentan el pensamiento colaborativo para promover la propuesta de valor general. Hacer crecer orgánicamente la visión holística del mundo de la innovación disruptiva a través de la diversidad y el empoderamiento en el lugar de trabajo.", language: "spanish", difficulty: 110, topic: "Business"}),
    Prompt.create({ title: "Business II", key: "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.", content: "Traiga a la mesa estrategias de supervivencia de ganar-ganar para asegurar una dominación proactiva. Al final del día, en el futuro, una nueva normalidad que ha evolucionado desde la generación X está en camino hacia una solución de nube optimizada. El contenido generado por el usuario en tiempo real tendrá múltiples puntos de contacto para la deslocalización.", language: "spanish", difficulty: 150, topic: "Business"}),
    Prompt.create({ title: "Business III", key: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.", content: "Aproveche la fruta al alcance de la mano para identificar una actividad de valor agregado de estadio para la prueba beta. Supere la brecha digital con clics adicionales de DevOps. La inmersión en nanotecnología a lo largo de la autopista de la información cerrará el círculo al centrarse únicamente en el resultado final.", language: "spanish", difficulty: 200, topic: "Business"}),
    Prompt.create({ title: "Back to the Future", key: "Good evening, I'm Doctor Emmet Brown, I'm standing here on the parking lot of- Jennifer, oh are you a sight for sore eyes. Let me look at you. Now, of course not, Biff, now, I wouldn't want that to happen. Right. Doc? Am I to understand you're still hanging around with Doctor Emmett Brown, McFly? Tardy slip for you, Miss Parker. And one for you McFly I believe that makes four in a row. Now let me give you a nickle's worth of advice, young man. This so called Doctor Brown is dangerous, he's a real nutcase. You hang around with him you're gonna end up in big trouble.", content: "Buenas noches, soy el doctor Emmet Brown, estoy parado aquí en el estacionamiento de... Jennifer, oh, eres un espectáculo para los ojos doloridos. Déjame mirarte. Ahora, por supuesto que no, Biff, ahora, no me gustaría que eso sucediera. Derecha. ¿Doc? ¿Debo entender que sigues con el doctor Emmett Brown, McFly? Nota de tardanza para usted, señorita Parker. Y uno para ti McFly creo que hace cuatro seguidos. Ahora déjame darte un pequeño consejo, jovencito. Este llamado Doctor Brown es peligroso, es un verdadero chiflado. Si andas con él, vas a terminar en un gran problema.", language: "spanish", difficulty: 270, topic: "Movies"}),
    Prompt.create({ title: "Pulp Fiction", key: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.", content: "Bueno, la forma en que hacen programas es que hacen un programa. Ese programa se llama piloto. Luego muestran ese programa a las personas que hacen programas, y sobre la base de ese programa deciden si van a hacer más programas. Algunos pilotos son elegidos y se convierten en programas de televisión. Algunos no, se convierten en nada. Protagonizó una de esas que se convirtieron en nada.", language: "spanish", difficulty: 80, topic: "Movies"}),
    Prompt.create({ title: "Politics I", key: "In the works of Pynchon, a predominant concept is the distinction between creation and destruction. But an abundance of situationisms concerning structural theory exist. Sartre uses the term ‘objectivism’ to denote a postcultural paradox.", content: "En la obra de Pynchon, un concepto predominante es la distinción entre creación y destrucción. Pero abundan los situacionismos sobre existe teoría estructural. Sartre usa el término “objetivismo” para denotar una paradoja poscultural.", language: "spanish", difficulty: 300, topic: "Politics"}),
    Prompt.create({ title: "Politics II", key: "If one examines material precultural theory, one is faced with a choice: either accept textual narrative or conclude that art serves to reinforce capitalism. In a sense, the subject is contextualised into a Baudrillardist simulation that includes truth as a whole. The characteristic theme of the works of Pynchon is not narrative as such, but subnarrative.", content: "Si uno examina la teoría material precultural, uno se enfrenta a una elección: aceptar la narración textual o concluir que el arte sirve para reforzar capitalismo. En cierto sentido, el sujeto se contextualiza en un Baudrillardist simulación que incluye la verdad como un todo. El tema característico de la Las obras de Pynchon no son narrativas como tales, sino subnarrativas.", language: "spanish", difficulty: 290, topic: "Politics"}),
    Prompt.create({ title: "Politics III", key: "In a sense, if textual narrative holds, we have to choose between conceptualist neocapitalist theory and capitalist subpatriarchialist theory. The subject is interpolated into a capitalist theory that includes consciousness as a reality.", content: "En cierto sentido, si la narrativa textual se mantiene, tenemos que elegir entre teoría conceptualista neocapitalista y teoría capitalista subpatriarquialista. El tema se interpola en una teoría capitalista que incluye la conciencia como una realidad.", language: "spanish", difficulty: 290, topic: "Politics"}),
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
