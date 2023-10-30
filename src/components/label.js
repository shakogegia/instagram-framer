export default function Label({ children, ...props }) {
  return (
    <label
      className="w-full whitespace-nowrap font-semibold text-sm"
      {...props}
    >
      {children}
    </label>
  )
}
