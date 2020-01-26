type IterateCallback = (date: Date) => void;

const DATE_DELTA = 1;

export const iterateDateRange = (
  start: string, //YYYY-MM-DD
  end: string,
  cb: IterateCallback
): void => {
    const endDate = parseYMDDate(end);

    let currentDate = parseYMDDate(start);

     do {
         cb(new Date(currentDate));
         currentDate.setDate(currentDate.getDate() + DATE_DELTA);
     } while (currentDate < endDate);


};


export const parseYMDDate = (date: string): Date => {
    const [year, month, day] = date.split('-');

    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
    );
};

export const toYMDString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0')
    return `${year}-${month}-${day}`;
};