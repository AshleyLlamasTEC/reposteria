export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(date));
};