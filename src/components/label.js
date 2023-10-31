import classnames from 'classnames'

export default function Label({ children, className, ...props }) {
  return (
    <label
      className={classnames(
        'w-full whitespace-nowrap font-semibold text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
