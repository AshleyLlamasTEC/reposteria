export function filterDesserts(desserts, { searchQuery, category, priceRange }) {
  return desserts.filter(dessert => {
    const matchesSearch = searchQuery === '' ||
      dessert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dessert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dessert.tags && dessert.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = category === 'all' || dessert.category === category;

    const matchesPrice = dessert.price >= priceRange[0] && dessert.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });
}
