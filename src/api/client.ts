import FiltersBar from "../components/FiltersBar";
import {
    quoteReqByPairChannel,
    quoteRequestErrors,
    bookingRequestErrors,
    quoteRequests,
    bookTrades,
    fileUploads,
    errorCodeTradeDetails,
    revenueByChannel
} from "../mock/data";

export type DashboardFilters = {
    teamcodes: string[];
    channel: string | null;
    timeframe: string;
    cif: string;
    salesPerson: string;
    account: string;
    currencyPair: string | null;
    errorCodes: string[];
    startDate: string;
    endDate: string;
    selectedCurrencies: string[];
}
function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function fetchDashboard(filters: DashboardFilters) {
    await wait(220);   

const matchesChannel = (rowChannel?: string) => {
    if(!filters.channel || filters.channel === "ALL") return true;
    console.log("Selected Channel: ", filters.channel);
    return (
        rowChannel && 
        rowChannel.toLowerCase() === filters.channel.toLowerCase()
    );
};

const matchesCurrencyPair = (rowCurrency?: string) => {
    if(!filters.currencyPair || filters.currencyPair === "ALL") return true;
    console.log("Selected Channel: ", filters.currencyPair);
    return (
        rowCurrency && 
        rowCurrency.toLowerCase() === filters.currencyPair.toLowerCase()
    );
};

const matchCurrency = (rowCurrency: string) => {
    if (!filters.selectedCurrencies.length) return true;

    return filters.selectedCurrencies.includes(rowCurrency);
}
const matchesText = (v: string, q: string) =>
    !q || v.toLowerCase().includes(q.toLocaleLowerCase());

return {
//     quoteReqByPairChannel: quoteReqByPairChannel.filter((r) =>
//         filters.currenctPairs.length ? filters.currenctPairs.includes(r.currencyPair) : true
// ),
//     quoteRequestErrors: quoteRequestErrors.filter((r) =>
//         filters.errorCodes.length ? filters.errorCodes.includes(r.errorCode) : true
// ),
//     bookingRequestErrors: bookingRequestErrors.filter((r) =>
//         filters.errorCodes.length ? filters.errorCodes.includes(r.errorCode) : true
// ),
quoteRequestErrors: quoteRequestErrors
.filter((r) =>(filters.errorCodes.length ? filters.errorCodes.includes(r.errorCode) : true))
.filter((r) =>matchesChannel(r.channel)),
bookingRequestErrors: bookingRequestErrors
.filter((r) =>(filters.errorCodes.length ? filters.errorCodes.includes(r.errorCode) : true))
.filter((r) =>matchesChannel(r.channel)),
quoteReqByPairChannel: quoteReqByPairChannel
.filter((r) =>matchesChannel(r.channel))
.filter((r) =>matchesCurrencyPair(r.currencyPair)),
quoteRequests: quoteRequests
.filter((r) =>(filters.teamcodes.length ? filters.teamcodes.includes(r.teamCode) : true))
.filter((r) =>matchesChannel(r.channelCode))
.filter((r) => matchesText(r.cif,filters.cif))
.filter((r) => matchesText(r.salesPerson,filters.salesPerson))  
.filter((r) => matchesText(r.account, filters.account)),
bookTrades: bookTrades
.filter((r) =>(filters.teamcodes.length ? filters.teamcodes.includes(r.teamCode) : true))
.filter((r) =>matchesChannel(r.channelCode))
.filter((r) =>matchCurrency(r.buyCurrency))
.filter((r) =>matchCurrency(r.sellCurrency))
.filter((r) => matchesText(r.cif,filters.cif))
.filter((r) => matchesText(r.salesPerson,filters.salesPerson)) 
.filter((r) => matchesText(r.account, filters.account)),
fileUploads: fileUploads
.filter((r) =>(filters.teamcodes.length ? filters.teamcodes.includes(r.teamCode) : true))
.filter((r) => matchesText(r.cif,filters.cif))
.filter((r) => matchesText(r.salesPerson,filters.salesPerson)) 
.filter((r) => matchesText(r.account, filters.account)),
errorCodeTradeDetails: errorCodeTradeDetails
.filter((r) =>(filters.errorCodes.length ? filters.errorCodes.includes(r.teamCode) : true))
.filter((r) =>(filters.teamcodes.length ? filters.teamcodes.includes(r.teamCode) : true))
.filter((r) =>matchesChannel(r.channelCode))
.filter((r) => matchesText(r.cif,filters.cif))
.filter((r) => matchesText(r.salesPerson,filters.salesPerson)) 
.filter((r) => matchesText(r.account, filters.account)),
revenueByChannel: revenueByChannel
.filter((r) =>matchesChannel(r.channel)),
applied: filters
};
}
