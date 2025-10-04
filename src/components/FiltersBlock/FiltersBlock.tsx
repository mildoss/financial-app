import type { Pagination as PaginationType, TransactionFilter } from "types.ts";
import styles from "./FiltersBlock.module.css";

interface Props {
  pagination?: PaginationType;
  filter: TransactionFilter;
  onFilterChange: (filter: Partial<TransactionFilter>) => void;
}

export const FiltersBlock = ({ pagination, filter, onFilterChange }: Props) => {
  const onResetFilters = () => {
    onFilterChange({
      type: "all",
      dateTo: "",
      dateFrom: "",
    });
  };
  return (
    <>
      {pagination ? (
        <div className={styles.filtersRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="dateFrom">From</label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              className="input"
              value={filter.dateFrom || ""}
              onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="dateTo">To</label>
            <input
              type="date"
              className="input"
              id="dateTo"
              name="dateTo"
              value={filter.dateTo || ""}
              onChange={(e) => onFilterChange({ dateTo: e.target.value })}
            />
          </div>
        </div>
      ) : null}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className={`${styles.filterBtn} ${filter.type === "all" ? styles.active : ""}`}
          onClick={() => onFilterChange({ type: "all" })}
        >
          All
        </button>
        <button
          className={`${styles.filterBtn} ${filter.type === "income" ? styles.active : ""}`}
          onClick={() => onFilterChange({ type: "income" })}
        >
          Income
        </button>
        <button
          className={`${styles.filterBtn} ${filter.type === "expense" ? styles.active : ""}`}
          onClick={() => onFilterChange({ type: "expense" })}
        >
          Expense
        </button>
        {(filter.dateFrom || filter.dateTo) && (
          <button className={styles.filterBtn} onClick={onResetFilters}>
            Reset
          </button>
        )}
      </div>
    </>
  );
};
