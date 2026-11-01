import { useEffect, useState } from "react";
import { fetchTradeRecords } from "../api/client";
import type { DashboardRecord } from "../utils/filterDashboardData";

/**
 * Manages the React state (data, loading, error) for the dashboard trade
 * records. The actual data access lives in `fetchTradeRecords` (src/api),
 * so switching from the mock JSON to a real backend only touches that
 * function — this hook and its consumers stay the same.
 */
export function useDashboardData() {
  const [allRecord, setAllRecord] = useState<DashboardRecord[]>([]);
  const [dataloading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const trades = await fetchTradeRecords();

        if (active) {
          setAllRecord(trades);
          setDataError(null);
        }
      } catch (error) {
        console.error("Trade records loading error:", error);

        if (active) {
          setDataError("Unable to load Dashboard Json");
        }
      } finally {
        if (active) {
          setDataLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { allRecord, dataloading, dataError };
}
