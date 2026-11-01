
export interface FilterRequest {
    teamcodes: string[];
    channel:string | null;
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

export interface DashboardRecord {
            source_system: string;
            source_service: string;
            team_code: string;
            sales_person: string;
            client_name: string;
            user_name: string;
            user_phone: string;
            user_email: string;
            customer_number: string;
            account: string;
            timestamp: string;
            trade_date: string;
            value_date: string;
            currency_pair: string;
            buy_currency: string;
            buy_amount: string;
            sell_currency: string;
            sell_amount: string;
            error_code: string;
            error_description: string;
            api_error_type: string;
            deal_number: string;
            quote_request_initiated: string;
            book_request_initiated: string;
            revenue: string;
    }

export function filterDashboardData(
    records: DashboardRecord[],
    request: FilterRequest
): DashboardRecord[] {
    return records.filter(row => {

        const matches =  (
            value: string | null | undefined,
            selected: string | null | undefined
        ) =>
            !selected ||
            selected === "ALL" ||
            value === selected;

        const teamMatch = 
        !request.teamcodes?.length ||
        request.teamcodes.includes(row.team_code);

        const channelMatch = 
        matches(row.source_system, request.channel);


        const currencyMatch = 
        matches(row.currency_pair, request.currencyPair);

        const salespersonMatch = 
        matches(row.currency_pair, request.currencyPair);

        const cifMatch = 
        matches(row.customer_number, request.cif);

         const accountMatch = 
        matches(row.account, request.account);

        const errorMatch = 
        !request.errorCodes?.length ||
        request.errorCodes.includes(row.error_code);

        const currencies = request.selectedCurrencies;

        

            return(
                teamMatch &&
                channelMatch &&
                currencyMatch &&
                salespersonMatch &&
                cifMatch &&
                accountMatch &&
                errorMatch
        );
    }); 
}
