import Label from './label'

export default function ColorPicker({ label, ...props }) {
  return (
    <div className="w-full flex items-center gap-4">
      <Label htmlFor="picker">{label}</Label>
      <input
        id="picker"
        type="color"
        className="flex-shrink-0 shadow-none border-none p-0 m-0 rounded-color-picker w-4 h-4 border-1"
        {...props}
        style={{ background: 'none' }}
      />
    </div>
  )
}
