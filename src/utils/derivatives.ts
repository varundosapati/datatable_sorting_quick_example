
import type { DerivativeTrade, ProductType } from "../types/derivative";

export const MONTHS = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export const PRODUCT_TYPES: ProductType[] = [
    "FX_OPTION",
    "SWAP",
    "NDO",
    "FORWARD",
    "NDF",
    "TIME_OPTION"
];


export const getTradesForMonth = (
    trades: DerivativeTrade[],
    productType: ProductType,
    monthIndex: number
): DerivativeTrade[] => {

    const currentYear = new Date().getFullYear();

    return trades.filter((trade) => {
       if(trade.productType != productType || !trade.valueDate) {
        return false;
       }

        const date = new Date(trade.valueDate);
        return (
            date.getFullYear() === currentYear && 
            date.getMonth() === monthIndex
        );
    });
    
};

export const getFutureTrades = (
    trades: DerivativeTrade[]
): DerivativeTrade[] => {
    const currentYear = new Date().getFullYear();
    
   

    return trades.filter((trade) => {
        if(!trade.valueDate) {
            return false;
        }

        const date = new Date(trade.valueDate);
        return (
            !isNaN(date.getTime()) &&
            date.getFullYear() > currentYear
        );
    
    });
};
