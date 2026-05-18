export function sortDesserts(desserts, sortBy) {
  return [...desserts].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'new': return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
      default: // 'popular'
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
  });
}
