import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/50',
  secondary:
    'bg-white text-brand-700 border-2 border-brand-600 hover:bg-brand-50 hover:shadow-lg',
  outline:
    'border-2 border-white/80 text-white hover:bg-white/15 backdrop-blur-sm hover:border-white',
  ghost: 'text-brand-600 hover:bg-brand-50',
  whatsapp: 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25 hover:shadow-green-500/40',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const motionProps = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} aria-label={ariaLabel} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
