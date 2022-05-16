import { IPaginationFilters } from "./ipagination-filters";

export interface IPagedData<T> extends IPaginationFilters {
    items: T[];
}
