window.onload = () => {
  window.tailwind.config = {
    theme: {
      extend: {
        animation: {
          fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [
      function ({ addBase, theme }) {
        const screens = theme('screens');
        const baseFontSizes = {
          sm: '14px',
          md: '16px',
          lg: '18px',
          xl: '20px',
          '2xl': '22px',
        };
        const mediaQueries = {};
        for (const [screen, size] of Object.entries(screens)) {
          if (baseFontSizes[screen]) {
            mediaQueries[`@media (min-width: ${size})`] = {
              html: {
                fontSize: baseFontSizes[screen],
              },
            };
          }
        }
        addBase({
          html: {
            fontSize: '12px', // 默认字体大小
          },
          ...mediaQueries,
        });
      },
    ],
  };
};
