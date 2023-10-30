import Label from './label'

export default function Slider({ label, id, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-4 mt-1">
        <div className="w-full inline-block">
          <input id={id} type="range" className="slider" {...props} />
        </div>
        <span className="text-xs">{props.defaultValue}</span>
      </div>
    </div>
  )
}
