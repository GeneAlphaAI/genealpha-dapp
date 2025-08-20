export default function CloseButton({ onClick, size = "sm" }) {
  const sizeClasses = {
    sm: "w-6 h-6 p-1",
    md: "w-8 h-8 p-2",
    lg: "w-10 h-10 p-2.5",
  };

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        flex items-center justify-center 
        bg-white/4 hover:bg-white/10
        rounded-[5px]

        ${sizeClasses[size]}
      `}
      aria-label="Close"
    >
      <img src="/assets/dashboard/Close.svg" alt="back" className="w-[10px]" />
    </button>
  );
}
