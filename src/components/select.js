import classnames from 'classnames'
import Label from './label'

export default function Select({ id, label, defaultValue, options, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className={classnames(
          'block text-sm dark:bg-transparent dark:text-white',
          'appearance-none',
        )}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option>-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}
