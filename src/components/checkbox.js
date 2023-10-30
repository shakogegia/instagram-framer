import Label from './label'

export default function Checkbox({ label, id, ...props }) {
  return (
    <div className="relative flex items-center gap-2">
      <Label htmlFor={`checkbox-${id}`}>{label}</Label>
      <input
        id={`checkbox-${id}`}
        name={`checkbox-${id}`}
        type="checkbox"
        className="h-4 w-4 rounded"
        {...props}
      />
    </div>
  )
}
