import classnames from 'classnames'
import Label from './label'

export default function Select({ label, defaultValue, options, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <select
        className={classnames('block text-sm')}
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
