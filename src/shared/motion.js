export const ease = [0.22, 1, 0.36, 1];

export const viewport = {
  once: true,
  amount: 0.22,
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease,
    },
  },
};

export const softFade = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease,
    },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const slowStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

export const cardHover = {
  y: -3,
  transition: {
    duration: 0.32,
    ease,
  },
};

export const buttonHover = {
  y: -1,
  transition: {
    duration: 0.2,
    ease,
  },
};

export const buttonTap = {
  y: 1,
  transition: {
    duration: 0.1,
    ease,
  },
};
