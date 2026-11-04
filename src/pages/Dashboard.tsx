import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Column } from "../components/DataTableNew";
import { fetchDashboard, type DashboardFilters } from "../api/client";
import { bookingRequestErrors, ERROR_CODES, quoteReqByPairChannel, revenueByChannel, TEAM_CODES, TEAM_PRESET_GROUPS, CHANNEL, CURRENCYPAIR } from "../mock/data";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useDashboardData } from "../hooks/useDashboardData";
import { quoteRequestErrors } from "../mock/data";
import { DivideSquare, MoveRight } from "lucide-react";
import Banner from "../components/Banner";
import { Box, Typography } from "@mui/material";
import { BorderLeft, Diversity1Outlined, Padding, PostAddOutlined } from "@mui/icons-material";
import Select from "react-select";
import MultiSelect from "../components/MultiSelect";
import TimeFramePicker from "../components/TimeframePicker";
import ExportMenu from "../components/ExportMenu";
import { downloadCsv, rowsToCsv } from "../utils/csvExport";
import { Download } from "lucide-react";
import responseData from "../../public/mock/filterResponse.json";
import { font } from "../styles/typography";

import {
    filterDashboardData,
    type DashboardRecord
} from "../utils/filterDashboardData";
import { items, value } from "happy-dom/lib/PropertySymbol";




const outerBoxStyle = {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    p1: 0,
    pr: 1,
    py: 0.5,

}

const exportCsvButtonStyle: CSSProperties = {
    display:"inline-flex",
    fontSize: font.size.xs,
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    cursor: "pointer",
    whiteSpace: "nowrap",
    justifyContent: "center",
    alignItems: "center",
};

const quoteReqbyErrCodeCol = [
                           { key: "errorCode", header: "Error Code" },
                          { key: "errorDescription", header: "Error description" },
                          { key: "sourceService", header: "Source Service" },
                          { key: "channel", header: "Channel Code" },
                          { key: "count", header: "Count" }]

const bookingReqbyErrCodeCol = [ { key: "errorCode", header: "Error Code" },
                                        { key: "errorDescription", header: "Error description" },
                                        { key: "sourceService", header: "Source Service" },
                                        { key: "channel", header: "Channel Code" },
                                        { key: "count", header: "Count" }]



const quoteReqTableCol =[{ key: "teamCode", header: "Team Code" },
                                { key: "salesPerson", header: "SalesPerson" },
                                { key: "client", header: "Client" },
                                { key: "user", header: "User" },
                                { key: "phone", header: "Phone" },
                                { key: "email", header: "Email" },
                                { key: "cif", header: "CIF" },
                                { key: "account", header: "Account" },
                                { key: "timestamp", header: "TimeStamp" },
                                { key: "channelCode", header: "Channel Code" },
                                { key: "indicative", header: "QuoteRequestInitiated" },
                                { key: "executable", header: "BookRequestInitiated" },
                                { key: "wssDealNumber", header: "WSS Deal Number" },
                                { key: "buyCcy", header: "Buy Currency" },
                                { key: "buyAmt", header: "Buy Amount", render: (row: any) => formatAmount(row.buyAmt) },
                                { key: "sellCcy", header: "Sell Currency" },
                                { key: "sellAmt", header: "Sell Amount",  render: (row: any) => formatAmount(row.sellAmt)},
                                { key: "revenueMargin", header: "Revenue/Margin" }]

const bookedTradeBlotterCol = [
                                { key: "teamCode", header: "Team Code" },
                                { key: "salesPerson", header: "SalesPerson" },
                                { key: "client", header: "Client" },
                                { key: "user", header: "User" },
                                { key: "phone", header: "Phone" },
                                { key: "email", header: "Email" },
                                { key: "cif", header: "CIF" },
                                { key: "account", header: "Account" },
                                { key: "timestamp", header: "TimeStamp" },
                                { key: "channelCode", header: "Channel Code" },
                                { key: "wssDealNumber", header: "WSS Deal Number" },
                                { key: "tradeDate", header: "Trade Date" },
                                { key: "buyCurrency", header: "Buy Currency" },
                                { key: "buyAmount", header: "Buy Amount", render: (row: any) => formatAmount(row.buyAmount) },
                                { key: "rate", header: "Rate" },
                                { key: "sellCurrency", header: "Sell Currency" },
                                { key: "sellAmount", header: "Sell Amount", render: (row: any) => formatAmount(row.sellAmount) },
                                { key: "valueDate", header: "Value Date" },
                                { key: "revenueMargin", header: "Revenue/Margin" } ]

const derivativesBlotterCol = [
                                { key: "teamCode", header: "Team Code" },
                                { key: "salesPerson", header: "SalesPerson" },
                                { key: "client", header: "Client" },
                                { key: "user", header: "User" },
                                { key: "phone", header: "Phone" },
                                { key: "email", header: "Email" },
                                { key: "cif", header: "CIF" },
                                { key: "account", header: "Account" },
                                { key: "timestamp", header: "TimeStamp" },
                                { key: "channelCode", header: "Channel Code" },
                                { key: "productType", header: "Product" },
                                { key: "wssDealNumber", header: "WSS Deal Number" },
                                { key: "tradeDate", header: "Trade Date" },
                                { key: "buyCurrency", header: "Buy Currency" },
                                { key: "buyAmount", header: "Buy Amount", render: (row: any) => formatAmount(row.buyAmount) },
                                { key: "rate", header: "Rate" },
                                { key: "sellCurrency", header: "Sell Currency" },
                                { key: "sellAmount", header: "Sell Amount", render: (row: any) => formatAmount(row.sellAmount) },
                                { key: "valueDate", header: "Value Date" },
                                { key: "ndfFixingDate", header: "NDF Fixing Date" },
                                { key: "optionDeliveryDate", header: "Option Delivery Date" },
                                
                                { key: "timeOptionRemainingCcy1Amount", header: "Time Option Remaining CCY 1 Amount",
                                    render: (row: any) =>
                                        formatAmount(row.timeOptionRemainingCcyAmount),
                                 },

                                 { key: "timeOptionRemainingCcy2Amount", header: "Time Option Remaining CCY 2 Amount",
                                    render: (row: any) =>
                                        formatAmount(row.timeOptionRemainingCcy2Amount),
                                 },


                                { key: "revenueMargin", header: "Revenue/Margin" }];

const svbGoFileUploadCol = [
                     { key: "teamCode", header: "Team Code" },
                     { key: "salesPerson", header: "SalesPerson" },
                    { key: "client", header: "Client" },
                    { key: "user", header: "User" },
                    { key: "phone", header: "Phone" },
                    { key: "email", header: "Email" },
                    { key: "cif", header: "CIF" },
                    { key: "account", header: "Account" },
                    { key: "timestamp", header: "TimeStamp" },
                    { key: "sourceCode", header: "Source Code" },
                    { key: "wssDealNumber", header: "WSS Deal Number" },
                    { key: "tradeDate", header: "Trade Date" },
                    { key: "buyCcy", header: "Buy Currency" },
                    { key: "buyAmt", header: "Buy Amount", render: (row: any) => formatAmount(row.buyAmt)},
                    { key: "rate", header: "Rate" },
                    { key: "sellCcy", header: "Sell Currency" },
                    { key: "sellAmt", header: "Sell Amount" , render: (row: any) => formatAmount(row.sellAmt)},
                    { key: "valueDate", header: "Value Date" },
                    { key: "revenueMargin", header: "Revenue/Margin" }
                    
                                    ]

const errorCodeTradeDetailsCol = [{ key: "errorCode", header: "Error Code" },
                    { key: "errorDescription", header: "Error Description" },
                    { key: "sourceService", header: "Source Service" },
                    { key: "channelCode", header: "Channel Code" },
                    { key: "teamCode", header: "Team Code" },
                    { key: "salesPerson", header: "SalesPerson" },
                    { key: "client", header: "Client" },
                    { key: "user", header: "User" },
                    { key: "phone", header: "Phone" },
                    { key: "email", header: "Email" },
                    { key: "cif", header: "CIF" },
                    { key: "account", header: "Account" },
                    { key: "timestamp", header: "TimeStamp" },
                    { key: "tradeDate", header: "Trade Date" },
                    { key: "cutCurrency", header: "Cut Currency" },
                    { key: "buyAmt", header: "Buy Amount", render: (row: any) => formatAmount(row.buyAmt) },
                    { key: "sellCcy", header: "Sell Currency" },
                    { key: "sellAmt", header: "Sell Amount", render: (row: any) => formatAmount(row.sellAmt) },
                    { key: "valueDate", header: "Value Date" }]

const revbyChannelCol = [{ key: "channel", header: "Channel" },
                    { 
                        key: "revenue", 
                        header: "Revenue",
                        render: (row: any) => formatCurrency(row.revenue)
                    }]


function csvColumnDefs<T>(cols: Column<T>[]) {
  return cols.map((c) => ({ key: c.key, header: c.header }));
}



function formatAmount(buyAmt: any) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(buyAmt || 0));
}

function formatCurrency(revenue: any) {
   return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(revenue);
}

// --- Stubs for not-yet-implemented views (kept so the view registry compiles) ---
const derivativeBlotter: any[] = [];
function DerivativesCalendar() {
    return null;
}

// --- Reusable table section: Banner + CSV export button + DataTable ---
type TableSectionProps = {
    title: string;
    information: string;
    csvFilename: string;
    columns: any[];
    rows: any[];
    csvRows: any[];
    pageSize?: number;
    dense?: boolean;
    onRowClick?: (row: any) => void;
    getRowStyle?: (row: any) => CSSProperties;
    wrapStyle?: CSSProperties;
    actionAsDiv?: boolean;
};

function TableSection({
    title,
    information,
    csvFilename,
    columns,
    rows,
    csvRows,
    pageSize = 10,
    dense = true,
    onRowClick,
    getRowStyle,
    wrapStyle,
    actionAsDiv = false,
}: TableSectionProps) {
    const exportProps = {
        className: "export-btn",
        style: exportCsvButtonStyle,
        title: "Export CSV",
        "aria-label": "Export users to CSV",
        onClick: () =>
            downloadCsv(
                csvFilename,
                rowsToCsv(
                    csvColumnDefs(columns),
                    csvRows as unknown as Record<string, unknown>[]
                )
            ),
    };

    const action = actionAsDiv ? (
        <div {...exportProps}>
            <Download size={18} strokeWidth={2} aria-hidden />
        </div>
    ) : (
        <button type="button" {...exportProps}>
            <Download size={18} strokeWidth={2} aria-hidden />
        </button>
    );

    const table = (
        <DataTable
            dense={dense}
            columns={columns}
            rows={rows}
            pageSize={pageSize}
            onRowClick={onRowClick}
            getRowStyle={getRowStyle}
        />
    );

    return (
        <Box sx={outerBoxStyle}>
            <Banner title={title} information={information} action={action} />
            {wrapStyle ? <div style={wrapStyle}>{table}</div> : table}
        </Box>
    );
}

type StaticFilterData = {
    static_data: {
        sales_team: {
            team_name: string;
            team_codes: string[];
        }[];
        channel: string[];
        currency_pair: string[];
        error_code: string[];
    };
};


export default function Dashboard({ selectedView }: {selectedView: string}) {

    const EMPTY_FILTERS: DashboardFilters = {
        teamcodes: [],
        channel: "",
        timeframe: "",
        cif: "",
        salesPerson: "",
        account: "",
        currencyPair: "",
        errorCodes: [],
        startDate: "",
        endDate: "",
        selectedCurrencies: [],
    };

    const EMPTY_BLOTTER_FILTERS = {
        channel: "",
        currencyPair: "",
        selectedCurrencies: [] as string[],
    };

    // Committed filters — drive actual data queries. Only updated on Apply.
    const [filters, setFilters] = useState<DashboardFilters>(EMPTY_FILTERS);
    const [blotterFilters, setBlotterFilters] = useState(EMPTY_BLOTTER_FILTERS);

    // Draft filters — bound to the filter panel controls. Written on every
    // control change; committed to filters/blotterFilters only on Apply.
    const [draftFilters, setDraftFilters] = useState<DashboardFilters>(EMPTY_FILTERS);
    const [draftBlotterFilters, setDraftBlotterFilters] = useState(EMPTY_BLOTTER_FILTERS);
const [staticFilterData, setStaticFilterData] = 
    useState<StaticFilterData["static_data"] | null>(null);    
const [openDropdown, setOpenDropdown] = useState(false);
const [openDateRange, setOpenDateRange] = useState(false);
const [selectedRow, setSelectedRow] =useState<any>(null);
const [popoupOpen, setPopupOpen] = useState(false);
const [requestDetails, setRequestDetails] =useState<any[]>([]);

const handleRowClick = (row: any) => {
    console.log("Clicked row:", row);

    const pair =  row.currencyPair;
    const channel = row.channel;

    const base = pair.substring(0,3);
    const quote = pair.substring(3,6);

    // setFilters(prev => ({
    //     ...prev,
    //     channel,
    //     currencyPair: pair,
    //     selectedCurrencies: [base,quote],
    // }));

    setBlotterFilters({
        channel: channel,
        currencyPair: pair,
        selectedCurrencies: [base,quote],
    });
    
};

    // Apply: commit draft state → live filters, then re-fetch
    const handleApplyFilters = () => {
        setFilters(draftFilters);
        setBlotterFilters(draftBlotterFilters);
    };

    // Reset: clear both draft and committed state
    const handleResetFilters = () => {
        setDraftFilters(EMPTY_FILTERS);
        setDraftBlotterFilters(EMPTY_BLOTTER_FILTERS);
        setFilters(EMPTY_FILTERS);
        setBlotterFilters(EMPTY_BLOTTER_FILTERS);
    };

const { allRecord, dataloading, dataError } = useDashboardData();


const filteredRecords = filterDashboardData(
    allRecord,
    filters
);

const quoteTableRecords = filteredRecords;

const quoteRecords = filteredRecords.filter(
    record => record.api_error_type === "quote"
);

const bookingRecords = filteredRecords.filter(
    record => record.api_error_type === "book"
);

const buildQuoteTableRows = (records: DashboardRecord[]) => {
    const grouped = new Map<string, {
        teamCode: string;
        salesPerson: string;
        client: string;
        user: string;
        phone: string;
        email: string;
        cif: number;
        account: string;
        timestamp: string;
        channelCode: string;
        indicative: string;
        executable: string;
        wssDealNumber: number;
        buyCcy: string;
        buyAmt: number;
        sellCcy: string;
        sellAmt:number;
        revenueMargin:number;
    }>();

    records.forEach(record => {
        const key = [
            record.team_code,
            record.sales_person,
            record.client_name,
            record.user_name,
            record.user_phone,
            record.user_email,
            record.customer_number,
            record.account,
            record.timestamp,
            record.source_system,
            record.quote_request_initiated,
            record.book_request_initiated,
            record.deal_number,
            record.buy_currency,
            record.buy_amount,
            record.sell_currency,
            record.sell_amount,
            record.revenue
        ].join("|");

        grouped.set(key, {
            teamCode: record.team_code ?? "",
            salesPerson: record.sales_person ?? "",
            client: record.client_name ?? "",
            user: record.user_name ?? "",
            phone: record.user_phone ?? "",
            email: record.user_email ?? "",
            cif: record.customer_number ? Number(record.customer_number): 0,
            account: record.account ?? "",
            timestamp: record.timestamp ?? "",
            channelCode: record.source_system ?? "",
            indicative: record.quote_request_initiated ?? "",
            executable: record.book_request_initiated ?? "",
            wssDealNumber: record.deal_number ? Number(record.deal_number): 0,
            buyCcy: record.buy_currency ?? "",
            buyAmt: record.buy_amount ? Number(record.buy_amount): 0,
            sellCcy: record.sell_currency ?? "",
            sellAmt: record.sell_amount ? Number(record.sell_amount): 0,
            revenueMargin: record.revenue ? Number(record.revenue): 0,
        });

    });
    return Array.from(grouped.values());
};



const buildErrorRows = (records: DashboardRecord[]) => {
    const grouped = new Map<string, {
        errorCode: string;
        errorDescription: string;
        sourceService: string;
        channel: string;
        count: number;
    }>();

    records.forEach(record => {
        const key = [
            record.error_code,
            record.error_description,
            record.source_system,
            record.source_service
        ].join("|");

        const existing = grouped.get(key);

        if(existing) {
            existing.count +=1;
        } else {
            grouped.set(key, {
                errorCode: record.error_code ?? "",
                errorDescription: record.error_description ?? "",
                sourceService: record.source_service ?? "",
                channel: record.source_system ?? "",
                count: 1
            });
        }
    });
    return Array.from(grouped.values());
};


const filteredQuoteRows = buildErrorRows(quoteRecords);
const filteredBookRows = buildErrorRows(bookingRecords);
const filteredQuoteTableRows = buildQuoteTableRows(quoteTableRecords);


const mockRequestData = [
    { requestId: "REQ001", status: "SUCCESS", timestamp: "2026-04-01 10:00" },
    { requestId: "REQ002", status: "SUCCESS", timestamp: "2026-04-01 10:05" },
    { requestId: "REQ003", status: "FAILURE", timestamp: "2026-04-01 10:10" },
    { requestId: "REQ004", status: "SUCCESS", timestamp: "2026-04-01 10:15" },
    { requestId: "REQ005", status: "FAILURE", timestamp: "2026-04-01 10:20" },

]

const quoteReqbyCurrncyPairCol = [
                                    { key: "currencyPair", header: "Currency Pair",
                                        render: (row: any) => (
                                            <span
                                            style={{
                                                color: "#01060c"}}>
                                                {row.currencyPair}
                                            </span>
                                        ),
                                     },
                                    { key: "channel", header: "Channel Code" },
                                    { key: "success", header: "Success" },
                                    { key: "successPct", header: "Success %",
                                        render: (row: any) => `${row.successPct}%`
                                     },
                                    { key: "failure", header: "Failure" },
                                    { key: "failurePct", header: "Failure %",
                                        render: (row: any) => `${row.failurePct}%` },
                                    { key: "total", header: "Total" }
                    
                                    ]

const itemStyle = {
    padding: "8px 10px",
    cursor: "pointer"
};

    const [showFilters, setShowFilters] = useState<boolean>(true);
    const applyFilters = (rows: any[]) => {
        return rows.filter((row) => {

            if(!filters.startDate && !filters.endDate && !filters.timeframe) {
                return true;
            }

            const matchesCif =
            !filters.cif ||
            row.cif?.toString().toLowerCase().includes(
                filters.cif.toLowerCase()
            ); 

            const salesPerson =
            !filters.salesPerson ||
            row.salesPerson?.toString().toLowerCase().includes(
                filters.salesPerson.toLowerCase()
            );
            const now = new Date();
            const matchesTeam =
            filters.teamcodes.length === 0 ||
            filters.teamcodes.includes(row.teamCode);

            let matchesDate = true;
            
            if(row.timestamp) {
                const rowTime = new Date(row.timestamp).getTime();

                if(filters.startDate && filters.endDate) {
                    const start = Date.parse(filters.startDate);
                    const end = Date.parse(filters.endDate);

                    matchesDate = rowTime >= start && rowTime <= end;
                }

                else if (filters.timeframe === "last_15_min") {
                    matchesDate =  rowTime >= Date.now() -15 * 60 * 1000;
                }
                else if (filters.timeframe === "last_60_min") {
                    matchesDate =  rowTime >= Date.now() -15 * 60 * 1000;
                }
                else if (filters.timeframe === "last_4_hours") {
                    matchesDate =  rowTime >= Date.now() -15 * 60 * 1000;
                }
                else if (filters.timeframe === "last_24_hours") {
                    matchesDate =  rowTime >= Date.now() -15 * 60 * 1000;
                }
                else if (filters.timeframe === "today") {
                    const today = new Date();
                   
                    today.setHours(0, 0, 0 , 0);
                    matchesDate =  rowTime >= today.getTime();
                }
            }

            return matchesCif && salesPerson && matchesTeam && matchesDate;
        })
    }

    const applyBlottersFilters = (rows: any[]) => {
        return rows.filter((row) => {

            const [base, quote] = blotterFilters.selectedCurrencies;
            const matchCurrency = 
            blotterFilters.selectedCurrencies.length === 0 ||
            (
            row.buyCurrency === base &&
            row.sellCurrency === quote
            ) ;

            const matchChannel = 
            !blotterFilters.channel ||
            row.channelCode === blotterFilters.channel;

            return matchCurrency && matchChannel;
        })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

        const formatAmount = (value: number) => {
        return new Intl.NumberFormat("en-US").format(value);
    };
   
    


    const [loading, setLoading] = useState(false);
    const [asOf, setAsOf] = useState<string>("");
    const [data, setData] = useState<any>(null);
    const [filterdData, setFilterdData] = useState<any[]>([]);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchDashboard(filters);
            setData(res);
            setAsOf(res.asOf);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const { enabled, setEnabled, nextInSec } = useAutoRefresh(load, 30 * 60 * 10000);

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        setFilterdData(data);
    }, [data]);

    useEffect(() => {
        let active = true;

        const loadSaticFilters = async () => {
            try {
                const response = await fetch("/mock/filterOptions.json");

                if(!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const json: StaticFilterData = await response.json();

                if(active) {
                    setStaticFilterData(json.static_data);
                    console.log("Static Filter Data:", json.static_data);
                }
            } catch (error) {
                console.error("Error loading static filter:", error);
            }
        };

        loadSaticFilters();

        return () => {
            active = false;
        };
    }, []);

    const applyPresetGroup = (groupName: string) => {
        const codes = TEAM_PRESET_GROUPS[groupName] ?? [];
        setFilters({...filters,teamcodes:codes});
    };

    const isHighRiskRow = (row: any) => {
        return (
            row.indicative === "Executable" &&
            row.executable === "Yes" &&
            row.wssDealNumber && row.wssDealNumber.trim() !== ""
        );
    };

    const asOfLabel = useMemo(() => {
        if (!asOf) return "-";
        try {
            return new Date(asOf).toLocaleString();
        } catch {
            return asOf;
        }
    }, [asOf]);

    const kpis = useMemo(() => {
        const booked = (data?.bookedTrades ?? []).length ?? 0;
        const revenue = (data?.revenueByChannel ?? []).reduce((a: number, r: any) => a + (r.count ?? 0), 0);
        const quoteErr = (data?.quoteRequestErrors ?? []).reduce((a: number, r: any) => a + (r.count ?? 0), 0);
        const bookErr = (data?.bookingRequestErrors ?? []).reduce((a: number, r: any) => a + (r.count ?? 0), 0);
        console.log("Computed KPIS: ", {
            booked,
            revenue,
            quoteErr,
            bookErr
        });
        return [
              { label: "Quote Errors", value: quoteErr.toLocaleString() },
            { label: "Trade Booked Success", value: bookErr.toLocaleString() }           

        ];
    }, [data]);

    // --- Config-driven view registry ---
    // Each entry describes a single-table view. The "quoteErrors" view renders
    // two tables and "derivativesCalendar" renders a custom component, so both
    // are handled as special cases in the render switch below.
    const singleTableConfigs: Record<string, TableSectionProps> = {
        currencyPair: {
            title: "Quote Request By Currency Pair and Channel",
            information: "Displays quote request details and volume by currency pair and channel across all digital platforms.",
            csvFilename: "quoteReqByPairChannel.csv",
            columns: quoteReqbyCurrncyPairCol,
            rows: data?.quoteReqByPairChannel ?? [],
            csvRows: applyFilters(data?.quoteReqByPairChannel ?? []),
            onRowClick: handleRowClick,
        },
        quotetable: {
            title: "Quote Request",
            information: "Displays all indicative and executable quote requests, including whether each resulted in a successfully booked trade.",
            csvFilename: "quoteRequests.csv",
            columns: quoteReqTableCol,
            rows: filteredQuoteTableRows,
            csvRows: applyFilters(data?.quoteRequests ?? []),
            actionAsDiv: true,
            wrapStyle: { width: "100%" },
            getRowStyle: (row: any) =>
                row.indicative === "Executable" &&
                row.executable === "Yes" &&
                (!row.wssDealNumber || row.wssDealNumber.toString().trim() === "")
                    ? { backgroundColor: "#ffe5e5", BorderLeft: "4px solid red" }
                    : {},
        },
        tradeBlotter: {
            title: "Booked Trade Blotter",
            information: "Displays all successfully booked trades across all digital channels.",
            csvFilename: "bookTrades.csv",
            columns: bookedTradeBlotterCol,
            rows: applyBlottersFilters(data?.bookTrades ?? []),
            csvRows: applyFilters(data?.bookTrades ?? []),
            wrapStyle: { width: "100%" },
        },
        derivativesBlotter: {
            title: "Derivative Blotter",
            information: "Displays full trade detials for all FX derivatives products.",
            csvFilename: "derivatives.csv",
            columns: derivativesBlotterCol,
            rows: applyBlottersFilters(derivativeBlotter),
            csvRows: applyBlottersFilters(derivativeBlotter),
            wrapStyle: { width: "100%", overflow: "auto" },
        },
        svbUpload: {
            title: "SVB Go File Upload",
            information: "Displays all trades successfully booked through the SVB Go file upload feature.",
            csvFilename: "fileUploads.csv",
            columns: svbGoFileUploadCol,
            rows: applyBlottersFilters(data?.fileUploads ?? []),
            csvRows: applyFilters(data?.fileUploads ?? []),
            wrapStyle: { width: "100%" },
        },
        errordetails: {
            title: "Error Code Trade Details",
            information: "Displays detailed records of all quote and booking errors across channels, including associated error codes.",
            csvFilename: "errorCodeTradeDetails.csv",
            columns: errorCodeTradeDetailsCol,
            rows: applyFilters(data?.errorCodeTradeDetails ?? []),
            csvRows: applyFilters(data?.errorCodeTradeDetails ?? []),
            wrapStyle: { width: "100%" },
        },
        revenue: {
            title: "Revenue By Channel",
            information: "Displays total revenue generated across each digital channel.",
            csvFilename: "revenueByChannel.csv",
            columns: revbyChannelCol,
            rows: applyFilters(data?.revenueByChannel ?? []),
            csvRows: applyFilters(data?.revenueByChannel ?? []),
        },
    };

    const quoteErrorsConfigs: TableSectionProps[] = [
        {
            title: "Quote Request Errors By Error Code and Channel",
            information: "Displays all quote requests that resulted in an error, broken down by error code and channel.",
            csvFilename: "quoteRequestErrors.csv",
            columns: quoteReqbyErrCodeCol,
            rows: filteredQuoteRows,
            csvRows: applyFilters(data?.quoteRequestErrors ?? []),
        },
        {
            title: "Booking Request Errors By Error Code and Channel",
            information: "Displays trades that received a quote but failed to book into WallStreet Systems (WSS), categorized by error code and channel.",
            csvFilename: "bookingRequestErrors.csv",
            columns: bookingReqbyErrCodeCol,
            rows: filteredBookRows,
            csvRows: applyFilters(data?.bookingRequestErrors ?? []),
        },
    ];

 return (
            <>
            <div id="dashboard-content">
                <div style={{ width: "100%", overflow: "visible"}}>
                    <div className="topbar">
                        <div
                            style={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between",
                                flexWrap:"wrap",
                                gap: "1rem",
                                padding:"8px 16px",
                                fontSize: font.size.lg,
                            }}>
                            <div className="brand">
                                <Typography variant="h6" component="div" sx={{ variant: "h1", flexGrow: 1, paddingLeft: 1, fontWeight: 'bold', color: 'gray', paddingTop: 2 }}>
                                    FX Channel Monitoring dashboard
                                </Typography>
                                <div className="actions">
                                    <span className="pill">{loading ? "Refreshing.." : `As of: ${asOfLabel}`} </span>
                                    <button className="preset-button" onClick={() => setEnabled(!enabled)} type="button">
                                        Auto Refresh: {enabled ? "ON" : "OFF"} {enabled ? `(${nextInSec}s)` : ""}
                                    </button>
                                    <button className="btn" onClick={load} type="button">
                                        Manual Refresh
                                    </button>
                                    <div style={{ margin: 10, color: "black", fontSize: font.size.xs, textAlign: "left"}} >
                                        Manual refresh +auto refresh every 30 minutes (toggle above).
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
                                    gap: "1rem",
                                    marginLeft: "auto",

                                }}>

                                {kpis.map((k) => (
                                    <div
                                        style={{
                                            background: "#8d9ec7",
                                            border: "1px solid #8d9ec7",
                                            borderRadius: 10,
                                            padding: "10px 14px",
                                            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                                            minWidth: "130px"
                                        }}
                                        key={k.label}
                                    >
                                        <div style={{ color: "#ffffff", fontSize: font.size.xs, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                            {k.label}
                                        </div>
                                        <div style={{ color: "#ffffff", fontSize: font.size["2xl"], fontWeight: font.weight.bold, marginTop: 4 }}>
                                            {k.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFilters((v) => !v)}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    border: "1px solid #d1d5db",
                                    background: "#f3f4f6",
                                    color: "#111827",
                                    fontSize: font.size.sm,
                                    cursor: "pointer",
                                }}
                            >
                                {showFilters ? "Hide filters" : "Show filters"}
                            </button>

                            <ExportMenu />

                        </div>
                    </div>
                    <Box sx={{ width: "100%", px: 2}}>
                        <div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
                            {showFilters && (
                                <div
                                    style={{
                                        marginBottom: "1rem",
                                        position: "static",
                                        marginTop: "0.1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px",
                                        padding: "12px 16px",
                                        background: "#ffffff",
                                        borderRadius: "10px",
                                        border: "1px solid #e5e7eb",
                                        boxSizing: "border-box",
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="h6" component="div" sx={{ variant: "h1", paddingLeft: 0, fontWeight: 'bold', color: 'gray' }}>

                                        Filters
                                    </Typography>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                            gap: "16px",
                                            width: "100%",
                                        }}
                                    >
                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>Team Code</span>

                                            <Select
                                                isMulti
                                                options={(staticFilterData?.sales_team ?? []).map(team => ({
                                                    value: team.team_name,
                                                    label: team.team_name
                                                    
                                                }))}

                                                value={draftFilters.teamcodes.map(code => ({
                                                    value: code,
                                                    label: code
                                                }))}

                                                onChange={(selected) =>
                                                    setDraftFilters({
                                                        ...draftFilters,
                                                        teamcodes: selected.map(s => s.value)
                                                    })
                                                }
                                                styles={{
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        display: "block",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        flexWrap: "wrap"


                                                    }),
                                                    multiValue: (base) => ({
                                                        ...base,
                                                        display: "block",
                                                        width: "100%",
                                                        margin: "2px 0"
                                                    }),
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: "20px",
                                                        height: "auto",
                                                        alignItems: "flex-start"
                                                    })

                                                }}
                                                placeholder="ALL"
                                            />

                                        </label>
                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>Channel</span>

                                            <Select
                                                options={(staticFilterData?.channel ?? []).map(channel => ({
                                                    value: channel,
                                                    label: channel
                                                }))}

                                                value={draftBlotterFilters.channel
                                                    ? {value: draftBlotterFilters.channel, label: draftBlotterFilters.channel }
                                                    : null
                                                }

                                                onChange={(selected) => {
                                                    const value = selected?.value || "";
                                                    setDraftFilters( prev => ({
                                                        ...prev,
                                                        channel: value,
                                                    }));
                                                    setDraftBlotterFilters( prev => ({
                                                        ...prev,
                                                        channel: value,
                                                    }));
                                                }}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: "50px"
                                                    })
                                                }}

                                                isClearable
                                                placeholder="ALL"

                                            />

                                        </label>
                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>Timeframe</span>
                                            <div style={{ position: "relative", width: "100%" }}>

                                                <div
                                                    onClick={() => setOpenDropdown( !openDropdown)}
                                                    style={{
                                                        border: "1px solid #ccc",
                                                        padding: "0 32px 0 10px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        cursor: "pointer",
                                                        borderRadius: "4px",
                                                        background: "white",
                                                        height: "50px",
                                                        boxSizing: "border-box",
                                                        position: "relative"
                                                    }}
                                                >
                                                    {draftFilters.timeframe === "custom" ? "Date Range" : draftFilters.timeframe?.replaceAll("_"," ") || "Select"}
                                                </div>

                                                <span style={{ position: "absolute", right: "10px", top: "20%", transform: "translate(-50%)", pointerEvents: "none", fontSize: font.size.xs}}>▼</span>
                                                {openDropdown && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "40px",
                                                            width: "min(500px, 90vw)",
                                                            maxWidth: "90vw",
                                                            boxSizing: "border-box",
                                                            backgroundColor: "#fff",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            zIndex: 9999,
                                                            padding: "10px",
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                            pointerEvents: "auto"

                                                        }}
                                                    >
                                                        <div style={{padding: "8px", fontWeight: font.weight.semibold, background: "#f3f4f6" }}>Relative</div>
                                                        {[
                                                            { value: "today", label: "Today"},
                                                            { value: "week_to_date", label: "Week To Date" },
                                                            { value: "business_week_to_date", label: "Business Week To Date" },
                                                            { value: "Previous_Year", label: "Previous Year" }
                                                        ].map((item) => (
                                                            <div
                                                                key={item.value}
                                                                onClick={() => {
                                                                    setDraftFilters({ ...draftFilters, timeframe: item.value });
                                                                    setOpenDropdown(false);
                                                                }}
                                                                style={itemStyle}
                                                            >
                                                                {item.label}
                                                            </div>
                                                        ))}

                                                        <div style={{padding: "8px", fontWeight: font.weight.semibold, background: "#f3f4f6" }}>Last X</div>
                                                        {[
                                                            { value: "last_15_mins", label: "Last 15 mins"},
                                                            { value: "last_60_mins", label: "Last 60 mins" },
                                                            { value: "last_4_hours", label: "Last 4 hours" },
                                                            { value: "last_24_hours", label: "Last 24 hours" }
                                                        ].map((item) => (
                                                            <div
                                                                key={item.value}
                                                                onClick={() => {
                                                                    setDraftFilters({ ...draftFilters, timeframe: item.value });
                                                                    setOpenDropdown(false);
                                                                }}
                                                                style={itemStyle}
                                                            >
                                                                {item.label}
                                                            </div>
                                                        ))}
                                                        <div
                                                            onClick={() => setOpenDateRange(!openDateRange)}
                                                            style={{
                                                                ...itemStyle,
                                                                fontWeight: font.weight.semibold,
                                                                background: "#f3f4f6"
                                                            }}
                                                        >
                                                            Date Range
                                                        </div>

                                                        {openDateRange && (
                                                            <div style={{ padding: "10px", borderTop: "1px solid #eee" }}>
                                                                <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>

                                                                    <input
                                                                        type="datetime-local"
                                                                        value={draftFilters.startDate || ""}
                                                                        onChange={(e) =>
                                                                            setDraftFilters({
                                                                                ...draftFilters,
                                                                                startDate: e.target.value,
                                                                                timeframe: "custom"
                                                                            })
                                                                        }
                                                                        style={{ flex:1 }}
                                                                    />

                                                                    <span>to</span>

                                                                    <input
                                                                        type="datetime-local"
                                                                        value={draftFilters.endDate || ""}
                                                                        onChange={(e) =>
                                                                            setDraftFilters({
                                                                                ...draftFilters,
                                                                                endDate: e.target.value,
                                                                                timeframe: "custom"
                                                                            })
                                                                        }
                                                                        style={{ flex: 1 }}
                                                                    />
                                                                </div>



                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        gap: "10px",
                                                                        marginTop: "10px",
                                                                    }}
                                                                >
                                                                    <button
                                                                        onClick={() => {
                                                                            setDraftFilters({
                                                                                ...draftFilters,
                                                                                timeframe: "",
                                                                                startDate: "",
                                                                                endDate: "",
                                                                            });
                                                                        }}
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: "8px",
                                                                            background: "#e0e0e0",
                                                                            color: "#333",
                                                                            borderRadius: "4px",
                                                                            border: "none",
                                                                            cursor: "pointer"
                                                                        }}
                                                                    >
                                                                        Clear
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            console.log("Apply Date Range:", filters);
                                                                            setOpenDropdown(false);
                                                                            setOpenDateRange(false);
                                                                            // load();
                                                                        }}
                                                                        style={{
                                                                            flex: 1,
                                                                            padding: "8px",
                                                                            background: "#111827",
                                                                            color: "white",
                                                                            borderRadius: "4px",
                                                                            border: "none",
                                                                            cursor: "pointer"
                                                                        }}
                                                                    >
                                                                        Apply
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </label>

                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>Currency Pair</span>

                                            <Select
                                                options={(staticFilterData?.currency_pair ?? []).map(pair => ({
                                                    value: pair,
                                                    label: pair
                                                }))}

                                                value={draftBlotterFilters.currencyPair
                                                    ? {value: draftBlotterFilters.currencyPair, label: draftBlotterFilters.currencyPair }
                                                    : null
                                                }

                                                onChange={(selected) => {
                                                    if (!selected) {
                                                        setDraftBlotterFilters({
                                                            channel: "",
                                                            currencyPair: "",
                                                            selectedCurrencies: [] as string[],
                                                        });
                                                        return;
                                                    }
                                                    const value = selected?.value || "";
                                                    setDraftFilters( prev => ({
                                                        ...prev,
                                                        currencyPair: value,
                                                    }));
                                                    setDraftBlotterFilters( prev => ({
                                                        ...prev,
                                                        currencyPair: value,
                                                    }));
                                                }}

                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        minHeight: "50px"
                                                    })
                                                }}

                                                isClearable
                                                placeholder="ALL"

                                            />

                                        </label>

                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>SalesPerson</span>

                                            <input className="filter-input"
                                                   value={draftFilters.salesPerson}
                                                   onChange={(e) =>
                                                       setDraftFilters({ ...draftFilters, salesPerson: e.target.value })
                                                   }
                                                   placeholder="Enter SalesPerson..."
                                                   style={{
                                                       height: "50px",
                                                       padding: "0 14px",
                                                       fontSize: font.size.sm,
                                                       borderRadius: "8px",
                                                       border: "1px solid #ccc",
                                                       width: "100%",
                                                       boxSizing: "border-box",
                                                   }}
                                            />

                                        </label>

                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>CIF</span>

                                            <input className="filter-input"
                                                   value={draftFilters.cif}
                                                   onChange={(e) =>
                                                       setDraftFilters({ ...draftFilters, cif: e.target.value })
                                                   }
                                                   placeholder="Enter CIF..."
                                                   style={{
                                                       height: "50px",
                                                       padding: "0 14px",
                                                       fontSize: font.size.sm,
                                                       borderRadius: "8px",
                                                       border: "1px solid #ccc",
                                                       width: "100%",
                                                       boxSizing: "border-box",
                                                   }}
                                            />
                                        </label>

                                        <label
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                gap: "4px",
                                                fontSize: font.size.sm,
                                                color: "#374151",
                                                minWidth: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span>Account</span>

                                            <input className="filter-input"
                                                   value={draftFilters.account}
                                                   onChange={(e) => setDraftFilters({ ...draftFilters, account: e.target.value })}
                                                   placeholder="Enter Account"
                                                   style={{
                                                       height: "50px",
                                                       padding: "0 14px",
                                                       fontSize: font.size.sm,
                                                       borderRadius: "8px",
                                                       border: "1px solid #ccc",
                                                       width: "100%",
                                                       boxSizing: "border-box",
                                                   }}
                                            />
                                        </label>

                                        <div style={{
                                            minWidth: 0,
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "stretch",
                                            gap: "4px",
                                            fontSize: "0.875rem",
                                            color: "#374151",
                                        }}>
                                            <div style={{ width: "100%" }}>
                                                <MultiSelect
                                                    label="Error Code"
                                                    options={(staticFilterData?.error_code ?? []).map(
                                                        item => item.split(" - ")[0].trim()
                                                    )}
                                                    value={draftFilters.errorCodes}
                                                    onChange={(v) => setDraftFilters({ ...draftFilters, errorCodes: v})}
                                                    placeholder="ALL"
                                                />
                                            </div>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "flex-end",
                                            paddingTop: "8px",
                                            borderTop: "1px solid #e5e7eb",
                                        }}>
                                            <button
                                                type="button"
                                                onClick={handleResetFilters}
                                                style={{
                                                    padding: "8px 20px",
                                                    borderRadius: "6px",
                                                    border: "1px solid #d1d5db",
                                                    background: "#f3f4f6",
                                                    color: "#374151",
                                                    fontSize: font.size.sm,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Reset
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleApplyFilters}
                                                style={{
                                                    padding: "8px 20px",
                                                    borderRadius: "6px",
                                                    border: "none",
                                                    background: "#1d4ed8",
                                                    color: "#ffffff",
                                                    fontSize: font.size.sm,
                                                    cursor: "pointer",
                                                    fontWeight: font.weight.semibold,
                                                }}
                                            >
                                                Apply Filters
                                            </button>
                                        </div>

                                    </div>
                                </div>


                            )}


                            {selectedView === "quoteErrors" && (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: "2px",
                                        padding: "10px"
                                    }}
                                >
                                    {quoteErrorsConfigs.map((cfg) => (
                                        <TableSection key={cfg.csvFilename} {...cfg} />
                                    ))}
                                </div>
                            )}

                            {selectedView === "derivativesCalendar" && (
                                <DerivativesCalendar />
                            )}

                            {singleTableConfigs[selectedView] && (
                                <div style={{ display: "grid", gap: "2px" }}>
                                    <TableSection {...singleTableConfigs[selectedView]} />
                                </div>
                            )}

                {popoupOpen && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h3 className="popup-title">
                                {selectedRow?.currencyPair} - {selectedRow?.channel}
                            </h3>

                            <div className="popup-summary">
                                <span><b>Total:</b> {selectedRow?.total}</span>
                                 <span className="success"><b>Success:</b> {selectedRow?.success}</span>
                                  <span className="success"><b>Failure:</b> {selectedRow?.failure}</span>
                            </div>

                        <div className="table-wrapper">                        
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Status</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestDetails.map((req, i) =>(
                                        <tr key={i}>
                                            <td>{req.requestId}</td>
                                            <td>
                                                <span
                                                className={
                                                    req.status === "SUCCESS"
                                                    ? "status-success"
                                                    : "status-failure"
                                                }>
                                                    {req.status}
                                                </span>
                                                </td>
                                            <td>{req.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <button
                            className="close-btn"
                             onClick={() => setPopupOpen(false)}
                             >
                                Close
                                </button>
                        </div>
                        </div>
                )}
                </div> 
               
                </Box>             
            </div> 
            </div>
            
            </>
        )}
        