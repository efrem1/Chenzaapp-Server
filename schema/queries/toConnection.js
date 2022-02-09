module.exports = (edges, totalCount, hasNextpage, hasPreviousPage) => {
  return {
    edges,
    pageInfo: {
      endCursor: edges.length === 0 ? null : edges[edges.length - 1].cursor,
      hasNextPage: hasNextpage,
      hasPreviousPage,
      startCursor: edges.length === 0 ? null : edges[0].cursor,
    },
    totalCount,
  };
};
