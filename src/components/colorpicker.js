import Label from './label'

export default function ColorPicker({ id, label, ...props }) {
  return (
    <div className="w-full flex items-center gap-4">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="color"
        className="flex-shrink-0 p-0 m-0 shadow-none rounded-color-picker w-4 h-4 border-[1px]"
        {...props}
        style={{ background: 'none' }}
      />
    </div>
  )
}
