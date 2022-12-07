'use strict';

const {
  db,
  models: { User, Prompt },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'aaron',
      password: '123',
      email: 'test@test.com',
      proficiency: 250,
    }),
    User.create({
      username: 'brad',
      password: '123',
      email: 'test@test.com',
      proficiency: 200,
    }),
    User.create({
      username: 'charlie',
      password: '123',
      email: 'test@test.com',
      proficiency: 150,
    }),
    User.create({
      username: 'dave',
      password: '123',
      email: 'test@test.com',
      proficiency: 300,
    }),
    User.create({
      username: 'elton',
      password: '123',
      email: 'test@test.com',
      proficiency: 50,
    }),
    User.create({
      username: 'frank',
      password: '123',
      email: 'test@test.com',
      proficiency: 10,
    }),
    User.create({
      username: 'grant',
      password: '123',
      email: 'test@test.com',
      proficiency: 30,
    }),
    User.create({
      username: 'hugh',
      password: '123',
      email: 'test@test.com',
      proficiency: 120,
    }),
    User.create({
      username: 'ivan',
      password: '123',
      email: 'test@test.com',
      proficiency: 270,
    }),
    User.create({
      username: 'john',
      password: '123',
      email: 'test@test.com',
      proficiency: 175,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  const musicVocab = JSON.stringify({
    Música: ['music', 'songs', 'sing'],
    Instrumento: ['instrument', 'instruments'],
    Tempo: ['tempo'],
    Acústico: ['acoustic'],
  });
  const sportsVocab = JSON.stringify({
    Deporte: ['sport', 'sports', 'kick'],
    Fútbol: ['soccer', 'football'],
    Jugador: ['player', 'players'],
    Pelota: ['ball'],
    Gol: ['goal'],
    Patada: ['kick'],
    Pesetado: ['score', 'points'],
  });
  const businessVocab1 = JSON.stringify({
    Negocio: ['business'],
    Empresa: ['company'],
    Ganancia: ['profit'],
    Ingreso: ['income'],
    Rédito: ['revenue'],
    Gasto: ['expenses', 'expense'],
    Dinero: ['cash'],
    Cliente: ['customer', 'client'],
    Inventario: ['inventory'],
    Invenrtir: ['invest'],
    Señal: ['sign'],
    Riesgo: ['risk'],
    Premio: ['reward'],
  });
  const politicsVocab1 = JSON.stringify({
    Política: ['politics'],
    Votar: ['vote'],
    Democrático: ['democratic'],
    Gobierno: ['government'],
    Ciudadanos: ['citizens'],
    Política: ['policy'],
    Nombrar: ['nominate'],
    Líder: ['leader'],
    Elección: ['election'],
  });

  const prompts = await Promise.all([
    Prompt.create({
      title: 'Music',
      key: [
        'Music is an important part of any festival. ',
        'I mean, who doesn’t want to hear a good tune? ',
        'But most importantly, music is an important part of any festival experience. ',
        'Music is the soundtrack to the festival. ',
        'If you get this part wrong, you will be missing out on a big part of the fun. ',
        'So, what are the things you need to consider when choosing a festival song? ',
        'Here are the some things to consider. ',
        'Find music with a tempo that you like, especially if it can make you move. ',
        'You will have many options like music with no singing, or music with acoustic and electronic instruments, so go explore and you will not regret it.',
      ],
      content: [
        'Música es un importante parte de alguna festival. ',
        'yo media, quien doesn’t querer a oír un bueno melodía? ',
        'pero más importantly, música es un importante parte de alguna festival experiencia. ',
        'música es el soundtrack a el festival. ',
        'Si tú obtener esta parte incorrecto, tú será ser desaparecido fuera en un grande parte de el divertido. ',
        'asi que, qué son el cosas tú necesitar a considerar cuando choosing un festival canción? ',
        'aquí hay algunas cosas a considerar. ',
        'Encuentra música con un tempo que te guste, especialmente si puede hacer que te muevas.',
        'Tendrás muchas opciones como música sin canto o música con instrumentos acústicos y electrónicos, así que explora y no te arrepentirás.',
      ],
      language: 'spanish',
      difficulty: 100,
      topic: 'Music',
      vocabulary: musicVocab,
    }),
    Prompt.create({
      title: 'Sports',
      key: [
        'Soccer is the most popular sport around the world. ',
        'In most countries, excluding the United States, people call this sport football. ',
        'Football in the United States refers to the sport where players can use their hands and attempt to bring the ball to the endzone. ',
        'While soccer uses a round ball, American football uses an elongated ball, which allows it to spiral. ',
        'The two sports do share one similarity and that is kicking a goal for points added to their score. ',
      ],
      content: [
        'El fútbol es el deporte más popular en todo el mundo. ',
        'En la mayoría de los países, excepto Estados Unidos, la gente llama a este deporte fútbol. ',
        'El fútbol en los Estados Unidos se refiere al deporte en el que los jugadores pueden usar sus manos e intentar llevar el balón a la zona de anotación. ',
        'Mientras que el fútbol usa una pelota redonda, el fútbol americano usa una pelota alargada, lo que le permite girar en espiral.',
      ],
      language: 'spanish',
      difficulty: 200,
      topic: 'Sports',
      vocabulary: sportsVocab,
    }),
    Prompt.create({
      title: 'Business I',
      key: [
        'This business report is a summary of income, revenue, expenses, profits, and cash flow for a small company. ',
        'The business is very profitable with high revenue, low expenses, and very loyal customers who help clear their inventory quickly. ',
        'If you were considering investing in this company, you would be making a great decision. ',
        'Before signing anything however, it is always a good idea to carefully examine the risks and rewards.',
      ],
      content: [
        'Este informe comercial es un resumen de los ingresos, los ingresos, los gastos, las ganancias y el flujo de efectivo de una pequeña empresa. ',
        'El negocio es muy rentable con altos ingresos, bajos gastos y clientes muy leales que ayudan a liquidar su inventario rápidamente. ',
        'Si estuviera considerando invertir en esta empresa, estaría tomando una gran decisión. ',
        'Sin embargo, antes de firmar nada, siempre es una buena idea examinar cuidadosamente los riesgos y las recompensas.',
      ],
      language: 'spanish',
      difficulty: 110,
      topic: 'Business',
      vocabulary: businessVocab1,
    }),
//     Prompt.create({
//       title: 'Business II',
//       key: [
//         'The unemployment rate has risen steadily over the past year, and it poses a problem for the economy. ',
//         'The Federal Reserve Bank continues to increase interest rates on bank lending. ',
//         "This ultimately affects companies' profits",
//       ],
//       content: [
//         'Traiga a la mesa estrategias de supervivencia de ganar-ganar para asegurar una dominación proactiva. Al final del día, en el futuro, una nueva normalidad que ha evolucionado desde la generación X está en camino hacia una solución de nube optimizada. El contenido generado por el usuario en tiempo real tendrá múltiples puntos de contacto para la deslocalización.',
//       ],
//       language: 'spanish',
//       difficulty: 150,
//       topic: 'Business',
//     }),
//     Prompt.create({
//       title: 'Business III',
//       key: [
//         'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
//       ],
//       content: [
//         'Aproveche la fruta al alcance de la mano para identificar una actividad de valor agregado de estadio para la prueba beta. Supere la brecha digital con clics adicionales de DevOps. La inmersión en nanotecnología a lo largo de la autopista de la información cerrará el círculo al centrarse únicamente en el resultado final.',
//       ],
//       language: 'spanish',
//       difficulty: 200,
//       topic: 'Business',
//     }),
//     Prompt.create({
//       title: 'Back to the Future',
//       key: [
//         "Good evening, I'm Doctor Emmet Brown, I'm standing here on the parking lot of- Jennifer, oh are you a sight for sore eyes. Let me look at you. Now, of course not, Biff, now, I wouldn't want that to happen. Right. Doc? Am I to understand you're still hanging around with Doctor Emmett Brown, McFly? Tardy slip for you, Miss Parker. And one for you McFly I believe that makes four in a row. Now let me give you a nickle's worth of advice, young man. This so called Doctor Brown is dangerous, he's a real nutcase. You hang around with him you're gonna end up in big trouble.",
//       ],
//       content: [
//         'Buenas noches, soy el doctor Emmet Brown, estoy parado aquí en el estacionamiento de... Jennifer, oh, eres un espectáculo para los ojos doloridos. Déjame mirarte. Ahora, por supuesto que no, Biff, ahora, no me gustaría que eso sucediera. Derecha. ¿Doc? ¿Debo entender que sigues con el doctor Emmett Brown, McFly? Nota de tardanza para usted, señorita Parker. Y uno para ti McFly creo que hace cuatro seguidos. Ahora déjame darte un pequeño consejo, jovencito. Este llamado Doctor Brown es peligroso, es un verdadero chiflado. Si andas con él, vas a terminar en un gran problema.',
//       ],
//       language: 'spanish',
//       difficulty: 270,
//       topic: 'Movies',
//     }),
//     Prompt.create({
//       title: 'Pulp Fiction',
//       key: [
//         "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.",
//       ],
//       content: [
//         'Bueno, la forma en que hacen programas es que hacen un programa. Ese programa se llama piloto. Luego muestran ese programa a las personas que hacen programas, y sobre la base de ese programa deciden si van a hacer más programas. Algunos pilotos son elegidos y se convierten en programas de televisión. Algunos no, se convierten en nada. Protagonizó una de esas que se convirtieron en nada.',
//       ],
//       language: 'spanish',
//       difficulty: 80,
//       topic: 'Movies',
//     }),
    Prompt.create({
      title: 'Politics I',
      key: [
        'Voting is very important in a democratic government. ',
        'Citizens with the ability to vote will determine the policies of the government. ',
        'Nominated leaders will be voted for during elections.',
      ],
      content: [
        'Votar es muy importante en un gobierno democrático. ',
        'Los ciudadanos con capacidad de voto determinarán las políticas del gobierno. ',
        'Los líderes nominados serán votados durante las elecciones.',
      ],
      language: 'spanish',
      difficulty: 300,
      topic: 'Politics',
      vocabulary: politicsVocab1,
    }),
//     Prompt.create({
//       title: 'Politics II',
//       key: [
//         'If one examines material precultural theory, one is faced with a choice: either accept textual narrative or conclude that art serves to reinforce capitalism. In a sense, the subject is contextualised into a Baudrillardist simulation that includes truth as a whole. The characteristic theme of the works of Pynchon is not narrative as such, but subnarrative.',
//       ],
//       content: [
//         'Si uno examina la teoría material precultural, uno se enfrenta a una elección: aceptar la narración textual o concluir que el arte sirve para reforzar capitalismo. En cierto sentido, el sujeto se contextualiza en un Baudrillardist simulación que incluye la verdad como un todo. El tema característico de la Las obras de Pynchon no son narrativas como tales, sino subnarrativas.',
//       ],
//       language: 'spanish',
//       difficulty: 290,
//       topic: 'Politics',
//     }),
//     Prompt.create({
//       title: 'Politics III',
//       key: [
//         'In a sense, if textual narrative holds, we have to choose between conceptualist neocapitalist theory and capitalist subpatriarchialist theory. The subject is interpolated into a capitalist theory that includes consciousness as a reality.',
//       ],
//       content: [
//         'En cierto sentido, si la narrativa textual se mantiene, tenemos que elegir entre teoría conceptualista neocapitalista y teoría capitalista subpatriarquialista. El tema se interpola en una teoría capitalista que incluye la conciencia como una realidad.',
//       ],
//       language: 'spanish',
//       difficulty: 290,
//       topic: 'Politics',
//     }),
  ]);

  console.log(`seeded ${prompts.length} prompts`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
