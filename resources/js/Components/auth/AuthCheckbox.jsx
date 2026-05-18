/**
 * Checkbox personalizado para "Recordarme".
 */
export default function AuthCheckbox({ checked, onChange, label = 'Recordarme' }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
            checked
              ? 'bg-pink-500 border-pink-500'
              : 'border-gray-300 group-hover:border-pink-400'
          }`}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
        {label}
      </span>
    </label>
  );
}
