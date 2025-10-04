import styles from "./Pagination.module.css";
import { getPages } from "@utils/getPagesUtils.ts";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn-primary btn-visible"
      >
        Prev
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            style={{ color: "var(--primary-600)" }}
            key={`${page}-${index}`}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={
              currentPage === page ? "btn-primary active" : "btn-primary"
            }
          >
            {page}
          </button>
        ),
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn-primary btn-visible"
      >
        Next
      </button>
    </div>
  );
};
