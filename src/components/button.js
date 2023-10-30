import classnames from 'classnames'

export default function Button({
  onClick,
  isActive,
  className,
  children,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'inline-flex items-center px-4 py-1 text-sm rounded-md transition-all hover:bg-neutral-200 dark:hover:text-black',
        isActive && 'bg-neutral-100 dark:text-black',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
