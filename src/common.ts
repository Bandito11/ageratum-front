
export interface IBlog {
  id: string;
  title: string;
  date: string;
  headerAlt: string;
  headerSrc: string;
  contents: string;
}

export interface IResponse<T> { 
    success: boolean;
    error: any;
    data: T;
    dateStamp: Date;
}

    // enum WEEKDAYS {
    //   domingo,
    //   lunes,
    //   martes,
    //   miércoles,
    //   jueves,
    //   viernes,
    //   sábado
    // }
    // enum MONTHS {
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
    // enum MONTHS {
    //     january,
    //     february,
    //     march,
    //     april,
    //     may,
    //     june,
    //     july,
    //     august,
    //     september,
    //     october,
    //     november,
    //     december
    //   }
    
