export const LogoSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#D8EEFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 12V27.9231H18.9087C18.9296 27.9231 18.9504 27.923 18.9712 27.9229V24.1015H17.6443V27.9231H14.5924H13V23.4271L18.3077 18.3692L23.6154 23.4271V26.6778C24.5562 26.0641 25.2977 25.2482 25.8399 24.23C26.48 23.0378 26.8 21.6124 26.8 19.9538C26.8 18.3003 26.48 16.8801 25.8399 15.6931C25.1999 14.5009 24.2893 13.5887 23.108 12.9563C21.932 12.3188 20.5296 12 18.9009 12H13Z"
        fill="#0C5AE9"
      />
    </svg>
  )
}
