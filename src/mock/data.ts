export type QuoteReqByPairChannelRow = {
    currencyPair: string;
    channel: string;
    success: number;
    successPct: number;
    failure: number;
    failurePct: number,
    total: number;
}

export type ErrorByCodeChannelRow = {
    errorCode: string;
    errorDescription: string;
    sourceService: string;
    channel: string;
    count: number;
}

export type QuoteRequestRow = {
    teamCode: string;
    salesPerson: string;
    client: string;
    user: string;
    phone: string;
    email: string;
    cif: string;
    account: string;
    timestamp: string;
    channelCode: string;
    indicative: "Indicative" | "Executable",
    executable: "Yes" | "No",
    wssDealNumber: string, 
    buyCcy: string;
    buyAmt: number;
    sellCcy: string;
    sellAmt: number;
    revenueMargin: number;
};

export type BookedTradeRow = {
    teamCode: string;
    salesPerson: string;
    client: string;
    user: string;
    phone: string;
    email: string;
    cif: string;
    account: string;
    timestamp: string;
    channelCode: string;
    wssDealNumber: string;
    tradeDate: string;
    buyCurrency: string;
    buyAmount: number;
    rate: number;
    sellCurrency: string;
    sellAmount: number;
    valueDate: string;
    revenueMargin: number;
};

export type FileUploadRow = {
    teamCode: string;
    salesPerson: string;
    client: string;
    user: string;
    phone: string;
    email: string;
    cif: string;
    account: string;
    timestamp: string;
    sourceCode: string;
    wssDealNumber: string;
    tradeDate: string;
    buyCcy: string;
    buyAmt: number;
    rate: number;
    sellCcy: string;
    sellAmt: number;
    valueDate: string;
    revenueMargin: number;
    
};

export type ErrorCodeTradeDetailsRow = {
    errorCode: string;
    errorDescription: string;
    sourceService: string;
    channelCode: string;
    teamCode: string;
    salesPerson: string;
    client: string;
    user: string;
    phone: string;
    email: string;
    cif: string;
    account: string;
    timestamp: string;
    tradeDate: string;
    cutCurrency: string;
    buyCcy: string;
    buyAmt: number;
    sellCcy: string;
    sellAmt: number;
    valueDate: string;
};

export type RevenueByChannelRow = {
    channel: string;
    revenue: number;   
};

export const TEAM_CODES = [
    "FX Sales 1",
    "FX Sales 2",
    "FX Sales 3",
    "FX Sales 4",
    "FX Sales 5",
];

export const CHANNEL = [
    "GW",
    "GWT",
    "TAG",
];

export const CURRENCYPAIR = [
    "AUDUSD",
    "EURUSD",
    "GBPUSD",
];

export const TEAM_PRESET_GROUPS: Record<string, string[]> = {
    "Group FX Asia Desk": ["Asia Desk"],
    "Group FX Sales 1": ["FX Sales 1"],
    "Group FX Sales 2": ["FX Sales 2"],
    "Group FX Sales 3": ["FX Sales 3"]
};

export const CHANNEL_CODES = ["GW", "GWT", "TAG", "FXA", "SVBGO"];
export const CCY_PAIRS = ["EURUSD", "AUSUSD", "GBPUSD", "USDJPY", "USDCAD"];
export const ERROR_CODES = ["123", "456", "789", "3000", "3003"];

export const quoteReqByPairChannel: QuoteReqByPairChannelRow[] = [
    { currencyPair: "AUDUSD", channel: "GW", success:24, successPct: 100, failure: 0, failurePct: 0, total: 24},
    { currencyPair: "AUDUSD", channel: "GWT", success:20, successPct: 100, failure: 0, failurePct: 0, total: 20},
    { currencyPair: "EURUSD", channel: "TAG", success:5, successPct: 100, failure: 0, failurePct: 0, total: 5},
    { currencyPair: "GBPUSD", channel: "GW", success:44, successPct: 97.8, failure: 1, failurePct: 2.2, total: 45}
]

export const quoteRequestErrors: ErrorByCodeChannelRow[] = [
    { errorCode: "123", errorDescription: "Greater than Limit Thresold", sourceService: "Quote Route Service", channel: "GW", count: 7 },
    { errorCode: "456", errorDescription: "3003 - Quote expired", sourceService: "TTS Service", channel: "GWT", count: 5 },
    { errorCode: "789", errorDescription: "3000 - ABC does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "111", errorDescription: "3000 - vdc does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "222", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "333", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "444", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "555", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "666", errorDescription: "3000 - cdd does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "777", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "888", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "999", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "100", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "200", errorDescription: "3000 - fgt does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "745", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "954", errorDescription: "3000 - cgk does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
    { errorCode: "700", errorDescription: "3000 - Customer does not exist", sourceService: "TTS Service", channel: "GW", count: 10 },
]

export const bookingRequestErrors: ErrorByCodeChannelRow[] = [
    { errorCode: "3000", errorDescription: "Customer does not exist", sourceService: "Booking Service", channel: "GW", count: 3 },
    { errorCode: "3003", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 6 },
    { errorCode: "3001", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 2 },
    { errorCode: "3002", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 3 },
    { errorCode: "3004", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 1 },
    { errorCode: "3005", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 6 },
    { errorCode: "3006", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 5 },
    { errorCode: "3007", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 9 },
    { errorCode: "3000", errorDescription: "Customer does not exist", sourceService: "Booking Service", channel: "GW", count: 3 },
    { errorCode: "3003", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 6 },
    { errorCode: "3001", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 2 },
    { errorCode: "3002", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 3 },
    { errorCode: "3004", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 1 },
    { errorCode: "3005", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 6 },
    { errorCode: "3006", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 5 },
    { errorCode: "3007", errorDescription: "Quote expired", sourceService: "Booking Service", channel: "TAG", count: 9 }
]

export const quoteRequests: QuoteRequestRow[] = [
    {
        teamCode: "FX Sales 1",
        salesPerson: "John",
        client: "Acme Capital",
        user: "John D",
        phone: "+1 567-555-0123",
        email: "abc@gmail.com",
        cif: "CIF001",
        account: "ACCT-1001",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        indicative: "Indicative",
        wssDealNumber: "2026040600074",
        executable: "No",
        buyCcy: "GW",
        buyAmt: 1000000,
        sellCcy: "USD",
        sellAmt: 10850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "Mike",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Indicative",
        wssDealNumber: "2026040600071",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "2026040600073",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Indicative",
        wssDealNumber: "2026040600077",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "2026050600074",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "5026040600074",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Indicative",
        wssDealNumber: "2026500600074",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Indicative",
        wssDealNumber: "2026330600074",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "2026040600087",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    },
    {
        teamCode: "Asia Desk",
        salesPerson: "John",
        client: "Zenith Bank",
        user: "Mina K",
        phone: "+1 567-555-0199",
        email: "xyz@gmail.com",
        cif: "CIF009",
        account: "ACCT-2026",
        timestamp: new Date().toISOString(),
        channelCode: "TAG",
        indicative: "Executable",
        wssDealNumber: "3026040600073",
        executable: "Yes",
        buyCcy: "USD",
        buyAmt: 5000000,
        sellCcy: "JPY",
        sellAmt: 1760850000,
        revenueMargin: 14555
    }
];


export const bookTrades: BookedTradeRow[] = [
    {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026560600073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 9.3637957,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    }, 
    {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026560600073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 9.3637957,
        sellCurrency: "GBP",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Nile",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040670073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.1706076,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "John",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026046540073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.3420428	,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040600546",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.5661965,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "John",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040600765",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.1661965,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "20260406000543",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.1662571,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040600083",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.1704352,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "6026043600073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.5761965,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Mike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "6260543200073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.1602625,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Nike",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040600073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 1.38523,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    },
       {
        teamCode: "FX Sales 2",
        salesPerson: "Meela",
        client: "Orbit Investments",
        user: "Sarah P",
        phone: "+1 567-666-0199",
        email: "test@gmail.com",
        cif: "CIF2022",
        account: "ACCT-1999",
        timestamp: new Date().toISOString(),
        channelCode: "GW",
        wssDealNumber: "2026040600073",
        tradeDate: new Date().toISOString(),
        buyCurrency: "USD",
        buyAmount: 5000000,
        rate: 3.5883713,
        sellCurrency: "USD",
        sellAmount: 40000,
        valueDate: new Date().toISOString(),
        revenueMargin: 14555
    }

];

export const fileUploads: FileUploadRow[] = [
    {
        teamCode: "GFB FX East", salesPerson: "John",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600082", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 17.6591455, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
     {
        teamCode: "GFB FX East", salesPerson: "John",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600081", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.1560449, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
     {
        teamCode: "GFB FX East", salesPerson: "John", client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600083", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.3262350, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
     {
        teamCode: "GFB FX East", salesPerson: "Nisha",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600084", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 3.1329339, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
     {
        teamCode: "GFB FX East", salesPerson: "Mike",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600087", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.1701007, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
     {
        teamCode: "GFB FX East", salesPerson: "Moo",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600086", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.1546323, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
    {
        teamCode: "GFB FX East", salesPerson: "Mila", client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600882", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.2701607, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
    {
        teamCode: "GFB FX East", salesPerson: "John", client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040650082", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.3701607, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
    {
        teamCode: "GFB FX East", salesPerson: "John",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2016040600082", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.2751607, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
    {
        teamCode: "GFB FX East", salesPerson: "Mike", client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600080", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.7701607, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
    {
        teamCode: "GFB FX East", salesPerson: "John",client: "NorthWind", user: "Alex R",phone: "+1 781-666-8765", email: "alex@gmail.com",cif: "CIF098", account: "ACCt-4080",timestamp: new Date().toISOString(),
        sourceCode: "SVBGO", wssDealNumber: "2026040600089", tradeDate: "2026-02-12",buyCcy: "GBP", buyAmt: 250000, rate: 1.9701607, sellCcy: "USD",sellAmt: 317800,valueDate: "2026-02-15",revenueMargin: 14555

    },
];

export const errorCodeTradeDetails: ErrorCodeTradeDetailsRow[] = [
    {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "Mike",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "John", client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "John",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "John",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1",salesPerson: "John", client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1",salesPerson: "John", client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "John",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1",salesPerson: "John", client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "John",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "Charles",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1",salesPerson: "Marnei", client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    },
     {
    errorCode: "3003", errorDescription: "Quote expired", sourceService: "TTS Servise", channelCode: "GWT", teamCode: "FX Sales 1", salesPerson: "Nina",client: "ACme Capital", user: "John D",  phone: "768-7654-9876", email: "test@gmail.com",
    cif: "CIF001", account: "ACCT-001", timestamp: new Date().toISOString(), tradeDate: "2026-09-14", cutCurrency: "EURUSD", buyCcy: "EUR",  buyAmt: 1000000,  sellCcy: "USD",  sellAmt: 1234577,  valueDate: "2026-09-23"
    }
];

export const revenueByChannel: RevenueByChannelRow[] = [
    {channel: "GW", revenue: 1234500 },
    {channel: "GWT", revenue: 85000 },
    {channel: "TAG", revenue: 5600 },
    {channel: "FXA", revenue: 19000 },
    {channel: "GW", revenue: 1234500 },
    {channel: "GWT", revenue: 85000 },
    {channel: "TAG", revenue: 5600 },
    {channel: "FXA", revenue: 19000 },
    {channel: "GW", revenue: 1234500 },
    {channel: "GWT", revenue: 85000 },
    {channel: "TAG", revenue: 5600 },
    {channel: "FXA", revenue: 19000 },
    {channel: "GW", revenue: 1234500 },
    {channel: "GWT", revenue: 85000 },
    {channel: "TAG", revenue: 5600 },
    {channel: "FXA", revenue: 19000 }
]
