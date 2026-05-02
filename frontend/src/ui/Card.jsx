const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white/6 backdrop-blur-xl border border-white/10 z-50 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
