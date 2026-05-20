import { useCounter } from '../../hooks/useCounter';

export default function AnimatedCounter({ value, suffix = '', label }) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-brand-200 font-medium">{label}</p>
    </div>
  );
}
