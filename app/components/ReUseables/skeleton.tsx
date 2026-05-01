const Skeleton = ({ w = "100%", h = 20, r = 8 }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#1e293b 25%,#243044 50%,#1e293b 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
);
export default Skeleton