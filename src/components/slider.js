import { useState } from 'react'
import Label from './label'

export default function Slider({ label, id, onReset, ...props }) {
  const [defaultValue] = useState(props.value)

  return (
    <div className="group">
      <div className="flex justify-between">
        <Label>{label}</Label>

        {defaultValue !== props.value && (
          <Label
            onClick={() => onReset?.()}
            className="text-right text-blue-500 transition-opacity opacity-0 group-hover:opacity-100"
          >
            Reset
          </Label>
        )}
      </div>
      <div className="flex items-center gap-4 mt-1">
        <div className="w-full inline-block">
          <input id={id} type="range" className="slider" {...props} />
        </div>
        <span className="text-xs w-6 text-right">{props.value}</span>
      </div>
    </div>
  )
}
