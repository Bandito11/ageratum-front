
export interface IBlogPage {
    id: string;
    title: string;
    content: Partial<IBlogContent>[];
    author: string;
    email: string;
    date: string;
    headerAlt: string;
    headerSrc: string;
}

export interface IBlogContent {
    alt: string;
    img: string;
    text: string;
    type: string;
    link: string;
}

export interface IResponse<T> { 
    success: boolean;
    error: any;
    data: T;
    dateStamp: Date;
}

export interface ITableOfContents{
    id: string;
    title: string;
    content: Partial<IBlogContent>[];
    date: string;
    headerAlt: string;
    headerSrc: string;
}

    // enum DIAS {
    //   domingo,
    //   lunes,
    //   martes,
    //   miércoles,
    //   jueves,
    //   viernes,
    //   sábado
    // }
    // enum MESES {
    //   enero,
    //   febrero,
    //   marzo,
    //   abril,
    //   mayo,
    //   junio,
    //   julio,
    //   agosto,
    //   septiembre,
    //   octubre,
    //   noviembre,
    //   diciembre
    // }
    // enum WEEKDAYS {
    //   sunday,
    //   monday,
    //   tuesday,
    //   wednesday,
    //   thursday,
    //   friday,
    //   saturday
    // }