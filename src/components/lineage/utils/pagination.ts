export const paginateArray = <T>(
    array: T[],
    page: number,
    rowsPerPage: number,
): T[] => {
    return rowsPerPage > 0
        ? array.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        : array;
};
