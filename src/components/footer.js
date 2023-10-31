export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 text-xs font-normal text-neutral-300 text-center mt-32">
      <p>
        © 2023 Instagram Framer. Made By{' '}
        <a
          className="text-neutral-500 dark:text-white"
          href="https://twitter.com/ShalvaGegia"
          target="_blank"
        >
          Gego
        </a>
      </p>
      <p>
        If you like this tool, please consider buying me a film. <br /> It will
        help me to keep this tool up and running.
      </p>
      <a
        href="https://ko-fi.com/V7V8DOK22"
        target="_blank"
        rel="noreferrer"
        className="mt-2"
      >
        <img
          height="36"
          style={{ border: '0px', height: '36px' }}
          src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </footer>
  )
}
