import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { Column } from "../components/DataTableNew";
import { fetchDashboard, type DashboardFilters } from "../api/client";
import { bookingRequestErrors, ERROR_CODES, quoteReqByPairChannel, revenueByChannel, TEAM_CODES, TEAM_PRESET_GROUPS, CHANNEL, CURRENCYPAIR } from "../mock/data";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
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




const outerBoxStyle = {
  display: "block",
  width: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  px: 1,
  py: 0.5,
  
}

const exportCsvButtonStyle: CSSProperties = {
  display:"inline-flex",
  fontSize: "0.85rem",
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
                                { key: "revenueMargin", header: "Revenue/Margin" }

                ]

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


export default function Dashboard({ selectedView }: {selectedView: string}) {
    const [filters, setFilters] = useState<DashboardFilters>({
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
        
    });    
const [openDropdown, setOpenDropdown] = useState(false);
const [openDateRange, setOpenDateRange] = useState(false);
const [selectedRow, setSelectedRow] =useState<any>(null);
const [popoupOpen, setPopupOpen] = useState(false);
const [requestDetails, setRequestDetails] =useState<any[]>([]);

const [blotterFilters, setBlotterFilters] = useState({
    channel: "",
    currencyPair: "",
    selectedCurrencies: [] as string[],
})

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
            row.sellCurrency === base &&
            row.buyCurrency === quote
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
        console.log("Filters Changed: ", filters);
        fetchDashboard(filters).then((res) => {
            setData(res);
        });
    }, [filters]);

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
        gap: "1rem",
        padding:"0 8px",
        fontSize:"1.05rem",
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
                    <div style={{ margin: 10, color: "black", fontSize: 12, textAlign: "left"}} >
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
                           <div style={{ color: "#ffffff", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            {k.label}
                            </div>
                           <div style={{ color: "#ffffff", fontSize: 22, fontWeight: 700, marginTop: 4 }}>
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
            fontSize: "0.85rem",
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
            flexWrap: "wrap",
            gap: "16px",
            background: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb"
           
             
          }}
        >
            <Typography variant="h6" component="div" sx={{ variant: "h1", flexGrow: 1, paddingLeft: 1, fontWeight: 'bold', color: 'gray' }}>

          Filters
        </Typography>
         <div
         style={{
            display: "flex",
           
         }}   
         >
         <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex",
              gap: "4px",
              fontSize: "0.875rem",
              color: "#374151",
              minWidth: "200px",
              flex: 1
              
              
              
            }}
          >
            <span>Team Code</span>
       
                <Select
                    isMulti
                        options={TEAM_CODES.map(code => ({
                            value: code,
                            label: code
                        }))}

                        value={filters.teamcodes.map(code => ({
                            value: code,
                            label: code
                        }))}

                        onChange={(selected) =>
                            setFilters({
                                ...filters,
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
              alignItems: "flex",
              gap: "4px",
              fontSize: "0.875rem",
              paddingLeft: "10px",
              color: "#374151",
              minWidth: "180px",
              height: "52px"
              
              
            }}
          >
            <span>Channel</span>
       
                <Select
                    options={CHANNEL.map(channel => ({
                            value: channel,
                            label: channel
                        }))}

                        value={blotterFilters.channel
                            ? {value: blotterFilters.channel, label: blotterFilters.channel }
                            : null
                        }

                        onChange={(selected) => {
                           
                            const value = selected?.value || "";
                            setFilters( prev => ({
                                ...prev,
                                channel: value,
                            }));
                            setBlotterFilters( prev => ({
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
              alignItems: "flex",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#374151",
              paddingLeft: "8px",
              paddingRight: "5px",
              height: "72px"
            }}
          >
            <span>Timeframe</span>
              <div style={{ position: "relative", width: "260px" }}>

                <div
                onClick={() => setOpenDropdown( !openDropdown)}
                style={{
                    border: "1px solid #ccc",
                    padding: "8px 32px 8px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    background: "white",
                    height: "32px",
                    position: "relative"
                }}
                >
                    {filters.timeframe === "custom" ? "Date Range" : filters.timeframe?.replaceAll("_"," ") || "Select"}
                </div>

                <span style={{ position: "absolute", right: "10px", top: "20%", transform: "translate(-50%)", pointerEvents: "none", fontSize: "12px"}}>▼</span>
                {openDropdown && (
                    <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        width: "500px",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        zIndex: 9999,
                        padding: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        pointerEvents: "auto"
                        
                    }}
                    >
                        <div style={{padding: "8px", fontWeight: "bold", background: "#f3f4f6" }}>Relative</div>
                        {[
                            { value: "today", label: "Today"},
                            { value: "week_to_date", label: "Week To Date" },
                            { value: "business_week_to_date", label: "Business Week To Date" },
                            { value: "Previous_Year", label: "Previous Year" }
                        ].map((item) => (
                            <div
                            key={item.value}
                            onClick={() => {
                                setFilters({ ...filters, timeframe: item.value });
                                setOpenDropdown(false);
                            }}
                            style={itemStyle}
                            >
                                {item.label}
                                </div>
                        ))}

                        <div style={{padding: "8px", fontWeight: "bold", background: "#f3f4f6" }}>Last X</div>
                        {[
                            { value: "last_15_mins", label: "Last 15 mins"},
                            { value: "last_60_mins", label: "Last 60 mins" },
                            { value: "last_4_hours", label: "Last 4 hours" },
                            { value: "last_24_hours", label: "Last 24 hours" }
                        ].map((item) => (
                            <div
                            key={item.value}
                            onClick={() => {
                                setFilters({ ...filters, timeframe: item.value });
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
                            fontWeight: "bold",
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
                        value={filters.startDate || ""}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                startDate: e.target.value,
                                timeframe: "custom"
                            })
                        }
                        style={{ flex:1 }}
                        />

                        <span>to</span>
                        
                 <input
                        type="datetime-local"
                        value={filters.endDate || ""}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
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
                            setFilters({
                                ...filters,
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
              alignItems: "flex",
              gap: "4px",
              fontSize: "0.875rem",
              paddingLeft: "10px",
              color: "#374151",
              minWidth: "180px",
              height: "52px"
              
              
            }}
          >
            <span>Currency Pair</span>
       
                <Select
                    options={CURRENCYPAIR.map(currencyPair => ({
                            value: currencyPair,
                            label: currencyPair
                        }))}

                        value={blotterFilters.currencyPair
                            ? {value: blotterFilters.currencyPair, label: blotterFilters.currencyPair }
                            : null
                        }

                        onChange={(selected) => {
                            if (!selected) {
                            setBlotterFilters({
                                channel: "",
                                currencyPair: "",
                                selectedCurrencies: [] as string[],
                            });
                            return;
                        }
                            const value = selected?.value || "";
                            setFilters( prev => ({
                                ...prev,
                                currencyPair: value,
                            }));
                            setBlotterFilters( prev => ({
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
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#374151",
               minWidth: "160px",
            paddingLeft: "10px"
            }}
          >
            <span>SalesPerson</span>
       
                  <input className="filter-input"
                    value={filters.salesPerson}
                    onChange={(e) => 
                        setFilters({ ...filters, salesPerson: e.target.value })
                }
                    placeholder="Enter SalesPerson..."  
                    style={{
                        height: "50px",
                        padding: "0 14px",
                        fontSize: "14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        minWidth: "180px",
                        cursor: "pointer",
                        gap: "12px"
            
                        }}                 
                    />
             
          </label>

         <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#374151",
               minWidth: "160px",
               paddingLeft: "10px"
            }}
          >
            <span>CIF</span>

                    <input className="filter-input"
                    value={filters.cif}
                    onChange={(e) => 
                        setFilters({ ...filters, cif: e.target.value })
                }
                    placeholder="Enter CIF..."  
                    style={{
                        height: "52px",
                        padding: "0 14px",
                        fontSize: "14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        minWidth: "180px",
                        cursor: "pointer",
                        gap: "12px"
            
                        }}                 
                    />
        </label>

                 <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#374151",
               minWidth: "160px",
               paddingLeft: "10px"
            }}
          >
            <span>Account</span>

                     <input className="filter-input"
                    value={filters.account}
                    onChange={(e) => setFilters({ ...filters, account: e.target.value })}
                    placeholder="Enter Account"     
                     style={{
                        height: "52px",
                        padding: "0 14px",
                        fontSize: "14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        minWidth: "180px",
                        cursor: "pointer"
            
        }}                
                    />
          </label>
        
          <div style={{
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#374151",
              paddingLeft: "10px"
              
              
            }}>
           <div style={{ width: "180px" }}>
            <MultiSelect
                    label="Error Code"
                    options={ERROR_CODES}
                    value={filters.errorCodes}
                    onChange={(v) => setFilters({ ...filters, errorCodes: v})}
                    placeholder="ALL"   
                    />
                    </div>
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
            <Box sx={outerBoxStyle}>
                    <Banner title="Quote Request Errors By Error Code and Channel"  
                    information= "Displays all quote requests that resulted in an error, broken down by error code and channel."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "quoteRequestErrors.csv",
                rowsToCsv(
                  csvColumnDefs(quoteReqbyErrCodeCol),
                  applyFilters(data?.quoteRequestErrors ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        />
                        
                       <DataTable
                                    dense
                                    columns={quoteReqbyErrCodeCol}
                                    rows={applyFilters(data?.quoteRequestErrors ?? [])}
                                    pageSize={10}
                                    />
                </Box>
  
            <Box sx={outerBoxStyle}>
                    <Banner title="Booking Request Errors By Error Code and Channel"  
                    information= "Displays trades that received a quote but failed to book into WallStreet Systems (WSS), categorized by error code and channel."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "bookingRequestErrors.csv",
                rowsToCsv(
                  csvColumnDefs(bookingReqbyErrCodeCol),
                  applyFilters(data?.bookingRequestErrors ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        />
                       <DataTable
                                    dense
                                    columns={bookingReqbyErrCodeCol}
                                    rows={applyFilters(data?.bookingRequestErrors ?? [])}
                                    pageSize={10}
                                    />
                </Box>
                </div>

                                )}
        
          
  
   
{selectedView === "currencyPair" && (
                   <Box sx={outerBoxStyle}>
                    <Banner title="Quote Request By Currency Pair and Channel"  
                    information= "Displays quote request details and volume by currency pair and channel across all digital platforms."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "quoteReqByPairChannel.csv",
                rowsToCsv(
                  csvColumnDefs(quoteReqbyCurrncyPairCol),
                  applyFilters(data?.quoteReqByPairChannel ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        
                        />
                       <DataTable
                                    dense
                                    columns={quoteReqbyCurrncyPairCol}
                                    rows={data?.quoteReqByPairChannel ?? []}
                                    pageSize={10}
                                    onRowClick={handleRowClick}
                                    />
                </Box>
)}
  <div
          style={{
            display: "grid",
            gap: "2px"
            
            
          }}>
         
            {selectedView === "quotetable" && (
                <Box sx={outerBoxStyle}>
                    <Banner title="Quote Request"  
                    information= "Displays all indicative and executable quote requests, including whether each resulted in a successfully booked trade."
                        action={
           <div
            // type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "quoteRequests.csv",
                rowsToCsv(
                  csvColumnDefs(quoteReqTableCol),
                  applyFilters(data?.quoteRequests ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </div>
                        }
                        />
                        <div
                        style={{
                            width: "100%"

                        }}
                        >
                            <div style={{ minWidth: "1200px" }}>
                       <DataTable
                                    dense
                                    columns={quoteReqTableCol}
                                    rows={applyFilters(data?.quoteRequests ?? [])}
                                    pageSize={10}
                                    getRowStyle={(row: any) =>
                                        row.indicative === "Executable" &&
                                        row.executable === "Yes" &&
                                        (!row.wssDealNumber ||
                                        row.wssDealNumber.toString().trim() === "")
                                        ? {
                                            backgroundColor: "#ffe5e5",
                                            BorderLeft: "4px solid red",
                                        }
                                        :{}
                                    }
                                    />
                                    </div>
                                    </div>
                </Box>
                )}
                </div>
 <div
          style={{
            display: "grid",
            gap: "2px"
            
          }}>
                 
      {selectedView === "tradeBlotter" && (
                <Box sx={outerBoxStyle}>
                    <Banner title="Booked Trade Blotter"  
                    information= "Displays all successfully booked trades across all digital channels."
                       action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "bookTrades.csv",
                rowsToCsv(
                  csvColumnDefs(bookedTradeBlotterCol),
                  applyFilters(data?.bookTrades ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                       />
                        <div
                        style={{
                            width: "100%"

                        }}>
                       <DataTable
                                    dense
                                    columns={bookedTradeBlotterCol}
                rows={applyBlottersFilters(data?.bookTrades ?? [])}
                                    pageSize={10}
                                    />
                                    </div>
                </Box>
                )}
                </div>

        <div
          style={{
            display: "grid",
            gap: "2px"
            
          }}>

                {selectedView === "svbUpload" && (
                 <Box sx={outerBoxStyle}>
                    <Banner title="SVB Go File Upload"  
                    information= "Displays all trades successfully booked through the SVB Go file upload feature."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "fileUploads.csv",
                rowsToCsv(
                  csvColumnDefs(svbGoFileUploadCol),
                  applyFilters(data?.fileUploads ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        />   
                        <div
                        style={{
                            width: "100%"

                        }}>     
                    <DataTable                
                                    dense
                                    columns={svbGoFileUploadCol}
                                    rows={applyBlottersFilters(data?.fileUploads ?? [])}
                                    pageSize={10}
                                    />
                                    </div>
                </Box>
                )}
               </div>
<div
          style={{
            display: "grid",
            gap: "2px"
            
          }}>

{selectedView === "errordetails" && (
                    <Box sx={outerBoxStyle}>
                    <Banner title="Error Code Trade Details"  
                    information= "Displays detailed records of all quote and booking errors across channels, including associated error codes."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "errorCodeTradeDetails.csv",
                rowsToCsv(
                  csvColumnDefs(errorCodeTradeDetailsCol),
                  applyFilters(data?.errorCodeTradeDetails ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        />
                        <div
                        style={{
                            width: "100%"

                        }}>  
                       <DataTable
                                    dense
                                    columns={errorCodeTradeDetailsCol}
                                    rows={applyFilters(data?.errorCodeTradeDetails ?? [])}
                                    pageSize={10}
                                    />
                                    </div>
                </Box>
                
)}
</div>
                {selectedView === "revenue" && (
                    <Box sx={outerBoxStyle}>
                    <Banner title="Revenue By Channel"  
                    information= "Displays total revenue generated across each digital channel."
                        action={
           <button
            type="button"
            className="export-btn"
            style={exportCsvButtonStyle}
            title="Export CSV"
            aria-label="Export users to CSV"
            onClick={() =>
              downloadCsv(
                "revenueByChannel.csv",
                rowsToCsv(
                  csvColumnDefs(revbyChannelCol),
                  applyFilters(data?.revenueByChannel ?? []) as unknown as Record<string, unknown>[]
                )
              )
            }
          >
            <Download size={18} strokeWidth={2} aria-hidden />
          </button>
                        }
                        />
                       <DataTable
                                    dense
                                    columns={revbyChannelCol}
                                    rows={applyFilters(data?.revenueByChannel ?? [])}
                                    pageSize={10}
                                    />
                                    
                </Box>
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
        
