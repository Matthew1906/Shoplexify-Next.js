
export const trimString = (s:string, length:number):string =>{
    return s.length>length? s.substring(0, length) + '...':s ;
}

const currencyFormat = Intl.NumberFormat('id-ID', {
    style:"currency",
    currency:'IDR'
})

export const currencyString = (num:number): string =>{
    return currencyFormat.format(num);
}

export const popularityString = (num:number): string =>{
    const popularity = num.toString().length
    if (popularity<4) { // < 1000/1k
        return num < 10  || num % 10 == 0 ? num.toString() : (num - num % 10).toString() + "+";
    } else if (popularity<7) { // < 1000000/1M
        return num % 1000 == 0 ? (num/1000).toString() + "K" : Math.floor(num/1000).toString() + "K+";
    } else if (popularity<10) { // < 1000000000/1B
        return num % 1000000 == 0 ? (num/1000000).toString() + "M" : Math.floor(num/1000000).toString() + "M+"
    } else {
        return "1B+"
    }
}

const dateFormat = Intl.DateTimeFormat( 'id-ID', {
    dateStyle:'full'
})

export const dateString = (date:Date): string =>{
    return dateFormat.format(date);
}