
export const usePagination = ({ total, page, setPage, itemsPerPage }) => {

  const totalPages = Math.ceil(total / itemsPerPage);

  const startCount = (page - 1) * itemsPerPage + 1;
  const baseEndCount = startCount + itemsPerPage - 1;
  const endCount = baseEndCount > total ? total : baseEndCount;
 
  const nextPage = () => setPage(prevPage => {
    return prevPage === totalPages ? prevPage : prevPage + 1;
  });
  const prevPage = () => setPage(prevPage => {
    return prevPage === 1 ? prevPage : prevPage - 1;
  });

  return {
    page,
    setPage,
    totalPages,
    nextPage,
    prevPage,
    startCount,
    endCount,
// Temp comment
  };
