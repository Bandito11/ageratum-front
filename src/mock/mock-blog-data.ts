export interface IBlogContent {
  alt : string;
  img : string;
  text : string;
  type : string;
  link : string;
}

export interface IBlogData {
  id : string;
  title : string;
  content : Partial < IBlogContent > [];
  author : string;
  email : string;
  date : string;
  headerAlt : string;
  headerSrc : string;
}

const blogPageTest : IBlogData = {
  id: 'x1257',
  author: 'Esteban Morales',
  headerSrc: 'x1235',
  headerAlt: 'Una computadora de un diseñador de páginas de internet',
  email: 'esteban.a.morales.morales@gmail.com',
  date: '12 de Marzo de 2018',
  title: '¿Si soy un desarrollador para web, como puedo reutilizar mis talentos para el mu' +
      'ndo de iOS y Android?',
  content: [
    {
      text: `
        Yo no me considero un desarrollador web pero si me considero un desarrollador de apps en general. He desarrollado apps utilizando Objective-C, Java y he creado web apps (mi pasión) como un FreeLancer. Pero decidí ser un desarrollador independiente, o sea tener ingresos pasivos en donde pueda utilizar y vivir de ese dinero. Para esa idea necesitaría poder hacer productos que corran en todos los sistemas operativos posibles, que dependiendo del punto de vista de la persona sería imposible. O por lo menos eso siempre me dicen. Ahora mismo estás leyendo este artículo desde un navegador, ya sea en tu celular o tu computadora; o sea los lenguajes y sistemas universales es el de la web. Si la web, no importa que estés utilizando para crear tu app, pero si usas los lenguajes de JS, HTML y CSS siempre vas a tener un producto para ser encontrado utilizando tu buscador web favorito.  Aunque puedes utilizar  técnicas para poder hacer tu interface que se acople a pantallas pequeñas, pero al incorporar esa página en al App store o Play Store estás perdiendo un potencial mercado de nuevos usuarios que quieran utilizar tu producto.
        `,
      type: 'p'
    }, {
      text: `
        Nitobi para poder arreglar este asunto decide hacer un framework para tener librerías que se comuniquen con las librerías nativas de iOS y Android. A este lo llamaron PhoneGap. Cuando Adobe los compro decidió separar PhoneGap e lanzo ese producto como un código de fuente abierta llamado Cordova. Blah blah blah, un tiempo después, y muchas aplicaciones web fueron lanzadas a los stores móviles con una mezcla de críticas negativas  y positivas. Muchas de las críticas eran porque la interface no eran tan rápidas y fluidas como las aplicaciones nativas. Eso era porque las páginas de internet de ese momento llamaban a cada página desde el servidor, no utilizaban AJAX además que no estaban aptas para interfaces de toque. Por ejemplo existe un evento llamado “touch-start” que antes de HTML5 simplemente no existía. Con la llegada de HTML5 esto mejoro pero no evitaba que las animaciones e interacciones en el web app se vieran más lento que la aplicación nativa.  Ahí entra Ionic y Angular.
        `,
      type: 'p'
    }, {
      alt: 'Logo de Angular',
      link: 'https://angular.io',
      img: 'x1434',
      type: 'img',
      text: 'El framework base en donde Ionic fue diseñado.'
    }, {
      text: `
        Un grupo de desarrolladores web se tomaron a la labor de crear un framework que emulara las interfaces de iOS, y después Android, casi a su perfección (en muchas ocasiones funcionan mejor). Al lanzar este producto se ve la diferencia en apps hecho en Ionic y los que simplemente están hechos en Cordova.  Aunque no necesariamente su rendimiento era más alto pero desde la perspectiva del usuario no había diferencia. Estos estaban hechos utilizando los componentes Web en mente, ya que este framework utilizaba  Angular  para la lógica. O sea que puedes utilizar  cada  componente de Ionic como le plazca y utilizar  HTML cuando sea necesario. Como utiliza Angular se pueden utilizar  los componentes o directivas para reutilizar  en otros partes del app pero entrar ahí seria entrar a un tema más técnico. Ellos planearon utilizar Cordova para que su plataforma se pueda utilizar no solamente en la web pero en los SO de Apple y Google. De esa manera puedes crear un web app, iOS y Android con un código y tener un app con una interface con un rendimiento bueno.
        `,
      type: 'p'
    }, {
      alt: 'Logo de Ionic Framework',
      link: 'http://ionicframework.com/',
      img: 'x2234',
      type: 'img',
      text: 'El logo del framework de Ionic.'
    }, {
      text: `
        Ahora en el 2017, Ionic decidió apartarse de Angular e irse framework agnóstico, o sea que su plataforma no dependa de ninguna librería. Van a seguir dándole apoyo a Angular pero ahora puedes utilizar su plataforma en otro framework como React o Vue. Para poder lograr ello están utilizando los componentes Web, que no es más nada que Custom Elements de HTML5. Esto es como crear un HTML, CSS y JS que se pueda reutlizar en cualquier web app o página. Angular (para no ser confundido con Angular JS) inclusive le dio soporte a esta nueva paradigma. Si haz utilizado React, Vue o Angular ya has utilizado componentes cuando programas, la diferencia más grande es la sintaxis y que un componente web lo puedes utilizar en donde sea, pero un componente en React no lo puedes utilizar en Vue.
        `,
      type: 'p'
    }, {
      text: `
        La herramienta que ellos desarrollaron y después lanzaron para que la gente lo utilizara se llama Stencil. Esto es un conjunto de herramienta que utiliza, lo que para ellos, es lo mejor de las plataformas favoritas de ellos y los pusieron en una herramienta para crear  componentes Web; utiliza JSX y TypeScript que compila a HTML, CSS y JS. De esa manera puedes tener utilizar  lógica de JS en tu HTML además de Intellisense y Static typing si asi lo deseas. ¡Lo mejor es que si utilizas esta herramienta, tus componentes la puedes reutilizar en Vue, Angular y React sin tener que hacerles cambios! Aunque todavía está en desarrollo y ellos no lo recomiendan para utilizarse como herramienta para producción  yo voy a estar utilizando esta herramienta para crear web apps de ahora en adelante. La nueva versión de Ionic va a ser creada utilizando esas herramientas asi que pueden esperar que puedan utilizar Ionic cualquier framework, o sin ayuda de estos si asi lo requieren.
        `,
      type: 'p'
    }, {
      text: `
        ¿Pero y Cordova? Ionic explicaron que van a seguir dándole soporte técnico a este framework, pero han decidido crear su propio iOS/Android framework que utilice los API de web modernos para poder utilizarlos en conjunto con los de la Web para tener una mejor cohesión entre los API Nativo y la Web. Se va llamar Capacitor y no tengo muchos detalles acerca de ello además de lo mencionado.
        `,
      type: 'p'
    }, {
      text: `
        En fin esto es un resumen de la historia de las herramientas que he utilizado y pienso utilizar. Ya pienso escribir  tutoriales de cómo crear apps utilizando el ionic  framework y lanzarlo en el Play Store y App store.
        `,
      type: 'p'
    }
  ]
};

const blogPagePics = {
  x1235: {
    pic: '../assets/todelete/SoundStudio.jpg'
  },
  x2234: {
    pic: '../assets/todelete/ionic-logo-blog.png'
  },
  x1434: {
    pic: '../assets/todelete/angular2.png'
  }
}

const blogPages = [
  blogPageTest,
  blogPageTest,
  blogPageTest,
  blogPageTest,
  blogPageTest,
  blogPageTest
];

export function getBlogPageFromDB(id : string) : Promise < IBlogData > {
  return new Promise((resolve, reject) => {
    id;
    resolve(blogPageTest);
    reject();
  });
}

export function getImageSrcFromStorage(link : string) : string {
  try {
    return blogPagePics[link].pic
  } catch (error) {
    console.log('Couldnt find data on array db of sorts')
  }
}

export function getListOfArticles() : Promise < Partial < IBlogData > [] > {
  return new Promise((resolve, reject) => {
    resolve(blogPages);
    reject();
  })
}
