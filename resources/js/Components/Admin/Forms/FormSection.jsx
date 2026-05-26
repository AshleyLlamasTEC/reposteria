export default function FormSection({ title, description, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b last:border-0">
      <div>
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}