export default function Toast({ message, type = 'success' }) {
  const bgColors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  return (
    <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-lg ${bgColors[type]}`}>
      {message}
    </div>
  );
}