import { useStockSources } from "./stock-sources.resource";
import { useMemo, useState } from "react";
import { usePagination } from "@openmrs/esm-framework";
import { StockOperationFilter } from "../stock-operations/stock-operations.resource";

export default function useStockSourcesPage(filter: StockOperationFilter) {
  const { items, isLoading, isError } = useStockSources(filter);

  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const {
    goTo,
    results: paginatedItems,
    currentPage,
  } = usePagination(items.results, currentPageSize);

  const tableHeaders = useMemo(
    () => [
      {
        id: 1,
        header: "Name",
        key: "name",
      },
      {
        id: 2,
        header: "Acronym",
        key: "acronym",
      },
      {
        id: 3,
        header: "Source Type",
        key: "sourceType",
      },
      {
        id: 4,
        header: "actions",
      },
    ],
    []
  );

  const tableRows = useMemo(() => {
    return items.results?.map((entry) => {
      return {
        ...entry,
        id: entry?.uuid,
        key: `key-${entry?.uuid}`,
        uuid: entry?.uuid,
        name: entry?.name,
        acronym: entry?.acronym,
        sourceType: entry?.sourceType?.display,
      };
    });
  }, [items.results]);

  return {
    items: items.results,
    currentPage,
    currentPageSize,
    paginatedItems,
    goTo,
    pageSizes,
    isLoading,
    isError,
    setPageSize,
    tableHeaders,
    tableRows,
  };
}
