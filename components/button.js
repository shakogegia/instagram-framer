import classNames from "../utils/class-names";

export default function Button({ onClick, isActive, className, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-100', isActive && "bg-gray-100", className)}
      {...props}
    >
      {children}
    </button>
  )
}
