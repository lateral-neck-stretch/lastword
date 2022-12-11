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
      proficiency: 50,
    }),
    User.create({
      username: 'brad',
      password: '123',
      email: 'test@test.com',
      proficiency: 20,
    }),
    User.create({
      username: 'charlie',
      password: '123',
      email: 'test@test.com',
      proficiency: 15,
    }),
    User.create({
      username: 'dave',
      password: '123',
      email: 'test@test.com',
      proficiency: 30,
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
      proficiency: 12,
    }),
    User.create({
      username: 'ivan',
      password: '123',
      email: 'test@test.com',
      proficiency: 27,
    }),
    User.create({
      username: 'john',
      password: '123',
      email: 'test@test.com',
      proficiency: 17,
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
    Deporte: ['sport', 'sports'],
    Fútbol: ['soccer', 'football'],
    Jugador: ['player', 'players'],
    Pelota: ['ball', 'balls'],
    Gol: ['goal'],
    Patada: ['kick'],
    Pesetado: ['score', 'points'],
  });
  const businessVocab1 = JSON.stringify({
    Negocio: ['business'],
    Empresa: ['company', 'companies'],
    Ganancia: ['profit', 'profits'],
    Ingreso: ['income'],
    Rédito: ['revenue'],
    Gasto: ['expenses', 'expense'],
    Dinero: ['cash'],
    Cliente: ['customer', 'client'],
    Inventario: ['inventory', 'inventories'],
    Invenrtir: ['invest'],
    Señal: ['sign', 'signing'],
    Riesgo: ['risk', 'risks'],
    Premio: ['reward', 'rewards'],
  });
  const businessVocab2 = JSON.stringify({
    Desempleo: ['unemployment'],
    Economía: ['economy'],
    Banco: ['bank', 'banks'],
    Ganancia: ['profit', 'profits'],
    Inflación: ['inflation'],
    Prestar: ['lend', 'loan'],
    Presio: ['rate', 'price', 'fee'],
  });
  const businessVocab3 = JSON.stringify({
    Mercado: ['market'],
    Descentralizado: ['decentralized'],
    Comercio: ['trade', 'trading'],
    Divisa: ['currency', 'currencies'],
    Oferta: ['supply'],
    Demanda: ['demand'],
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
  const politicsVocab2 = JSON.stringify({
    Administración: ['administration'],
    Ejercicio: ['incumbent', 'holder'],
    Diplomática: ['diplomatic'],
    Negociar: ['negotiate'],
    Estatal: ['state', 'states'],
    Consejo: ['council'],
    Security: ['seguridad'],
    Acuerdos: ['deals'],
  });
  const politicsVocab3 = JSON.stringify({
    Sanciones: ['sanction', 'sanctions'],
    Obligar: ['coerce', 'obligate'],
    Embargos: ['embargo', 'embargoes'],
    Exportación: ['export'],
    Imponer: ['impose', 'set', 'assert'],
  });
  const moviesVocab1 = JSON.stringify({
    Estacionamiento: ['parking lot'],
    Doloridos: ['sore', 'aching'],
    Espectáculo: ['sight', 'spectacle'],
    Déjame: ['let me', 'let'],
    Entender: ['understand'],
    Consejo: ['tip', 'advice'],
    Peligroso: ['dangerous'],
    Chiflado: ['mad', 'crazy', 'nutcase'],
  });
  const moviesVocab2 = JSON.stringify({
    Pues: ['well', 'so'],
    Programa: ['show', 'program'],
    Llamar: ['call', 'name'],
    Piloto: ['pilot'],
    Sobre: ['on', 'upon'],
    Elegidos: ['chosen', 'picked'],
    Protagonizó: ['starred'],
  });

  const prompts = await Promise.all([
    Prompt.create({
      title: 'Music',
      key: [
        'Music is an important part of any festival. ',
        'Who doesn’t want to hear a good tune? ',
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
        'Quien no querer a oír un bueno melodía? ',
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
    Prompt.create({
      title: 'Business II',
      key: [
        'The unemployment rate has risen steadily over the past year, and it poses a problem for the economy. ',
        'The Federal Reserve Bank continues to increase interest rates on bank lending in an effort to control inflation. ',
        "This ultimately affects companies' profits and their ability to keep employees on their payroll.",
      ],
      content: [
        'La tasa de desempleo ha aumentado constantemente durante el último año y plantea un problema para la economía. ',
        'El Banco de la Reserva Federal continúa aumentando las tasas de interés de los préstamos bancarios en un esfuerzo por controlar la inflación. ',
        'Esto, en última instancia, afecta las ganancias de las empresas y su capacidad para mantener a los empleados en su nómina',
      ],
      language: 'spanish',
      difficulty: 150,
      topic: 'Business',
      vocabulary: businessVocab2,
    }),
    Prompt.create({
      title: 'Business III',
      key: [
        'The foreign exchange market is a global decentralized or over-the-counter market for the trading of currencies. ',
        'This market determines foreign exchange rates for every currency. ',
        'It includes all aspects of buying, selling and exchanging currencies at current or determined prices. ',
        'Los precios fluctúan dependiendo de la oferta y la demanda de estas monedas.',
      ],
      content: [
        'El mercado de divisas es un mercado global descentralizado o extrabursátil para el comercio de divisas. ',
        'Este mercado determina los tipos de cambio de cada divisa. ',
        'Incluye todos los aspectos de compra, venta e intercambio de divisas a precios actuales o determinados.',
      ],
      language: 'spanish',
      difficulty: 200,
      topic: 'Business',
      vocabulary: businessVocab3,
    }),
    Prompt.create({
      title: 'Back to the Future',
      key: [
        "Good evening, I'm Doctor Emmet Brown, I'm standing here on the parking lot of- Jennifer, oh are you a sight for sore eyes. Let me look at you. Now, of course not, Biff, now, I wouldn't want that to happen. Right. Doc? Am I to understand you're still hanging around with Doctor Emmett Brown, McFly? Tardy slip for you, Miss Parker. And one for you McFly I believe that makes four in a row. Now let me give you a nickle's worth of advice, young man. This so called Doctor Brown is dangerous, he's a real nutcase. You hang around with him you're gonna end up in big trouble.",
      ],
      content: [
        'Buenas noches, soy el doctor Emmet Brown, estoy parado aquí en el estacionamiento de... Jennifer, oh, eres un espectáculo para los ojos doloridos. Déjame mirarte. Ahora, por supuesto que no, Biff, ahora, no me gustaría que eso sucediera. Derecha. ¿Doc? ¿Debo entender que sigues con el doctor Emmett Brown, McFly? Nota de tardanza para usted, señorita Parker. Y uno para ti McFly creo que hace cuatro seguidos. Ahora déjame darte un pequeño consejo, jovencito. Este llamado Doctor Brown es peligroso, es un verdadero chiflado. Si andas con él, vas a terminar en un gran problema.',
      ],
      language: 'spanish',
      difficulty: 270,
      topic: 'Movies',
      vocabulary: moviesVocab1,
    }),
    Prompt.create({
      title: 'Pulp Fiction',
      key: [
        "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.",
      ],
      content: [
        'Pues, la forma en que hacen programas es que hacen un programa. Ese programa se llama piloto. Luego muestran ese programa a las personas que hacen programas, y sobre la base de ese programa deciden si van a hacer más programas. Algunos pilotos son elegidos y se convierten en programas de televisión. Algunos no, se convierten en nada. Protagonizó una de esas que se convirtieron en nada.',
      ],
      language: 'spanish',
      difficulty: 80,
      topic: 'Movies',
      vocabulary: moviesVocab2,
    }),
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
    Prompt.create({
      title: 'Politics II',
      key: [
        'The administration under the incumbent president has maneuvered through this global crisis very well. ',
        'By overhauling their diplomatic policies, they were able to negotiate with enemy states. ',
        'The United Nations Security Council played a major part in brokering the deals necessary for handling this crisis.',
      ],
      content: [
        'La administración del presidente en ejercicio ha maniobrado muy bien a través de esta crisis global.',
        'Al revisar sus políticas diplomáticas, pudieron negociar con estados enemigos. ',
        'El Consejo de Seguridad de las Naciones Unidas desempeñó un papel importante en la negociación de los acuerdos necesarios para manejar esta crisis.',
      ],
      language: 'spanish',
      difficulty: 290,
      topic: 'Politics',
      vocabulary: politicsVocab2,
    }),
    Prompt.create({
      title: 'Politics III',
      key: [
        'Sanctions were placed in an effort to coerce the other nation to change their social policies emplaced on their citizens. ',
        'By imposing significant costs on the other nation, the government may be forced to change their policies. ',
        'Many times this means placing embargoes and placing export controls.',
      ],
      content: [
        'Las sanciones se impusieron en un esfuerzo por obligar a la otra nación a cambiar sus políticas sociales impuestas a sus ciudadanos. ',
        'Al imponer costos significativos a la otra nación, el gobierno puede verse obligado a cambiar sus políticas. ',
        'Muchas veces esto significa imponer embargos y controles de exportación.',
      ],
      language: 'spanish',
      difficulty: 290,
      topic: 'Politics',
      vocabulary: politicsVocab3,
    }),
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
