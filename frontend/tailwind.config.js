module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
    extend: {
      spacing: {
        '400': '420px',
      }
     }
  },
  variants: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1C5CFF',
          'primary-content': '#F6F8FB',
          'primary-focus': '#1C5CFF',
          secondary: '#7B92B2',
          accent: '#67CBA0',
          neutral: '#181A2A',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
      'corporate',
      'emerald',
      'dark',
      'cupcake',
    ],
    darkTheme: 'dark',
  }
};
