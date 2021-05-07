export const COLORS = {
    text: {
        light: '#000', // black
        dark: '#fff', // white
    },
    background: {
        light: '#ffffff', // white
        dark: '#121212', // very dark gray
    },
    background_alternating: {
        light: '#e6e6e6', // very light gray
        dark: '#2c2c2c', // very dark gray
    },
    primary: {
        light: '#bcaaa4', // grayish red
        dark: '#8c7b75', // dark grayish orange
    },
    primary_variant: {
        light: '#5d4037', // very dark desaturated red
        dark: '#321911', // very dark (mostly black) red
    },
    secondary: {
        light: '#a5d6a7', // grayish lime green
        dark: '#75a478', // mostly desaturated dark lime green
    },
    secondary_variant: {
        light: '#388e3c', // dark moderate lime green
        dark: '#00600f', // very dark lime green
    },
    text_menu_landing: {
        light: '#fff', // white
        dark: '#fff', // white
    },
    attention: {
        light: '#ffa500', // orange
        dark: '#ffa500', // orange
    }
  };
  
  export const COLOR_MODE_KEY = 'color-mode';
  export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';

/**
   * DARK COLOR PRIMARY VARIANTS
    v900: '#1b0000'
    v800: '#260e04'
    v700: &color-primary-variant '#321911'
    v600: '#40241a'
    v500: '#4b2c20'
    v400: '#5f4339'
    v300: '#725b53' # white text
    v200: &color-primary '#8c7b75' # black text
    v100: '#a69b97'
    v50: '#bdb9b7'
*/

/**
 * DARK COLOR SECONDARY VARIANTS
    v900: '#003300'
    v800: '#005005'
    v700: &color-secondary-variant '#00600f'
    v600: '#00701a'
    v500: '#087f23' # white text
    v400: '#338a3e' # black text
    v300: '#519657'
    v200: &color-secondary '#75a478'
    v100: '#97b498'
    v50: '#b6c2b7'
*/

/**
   * LIGHT COLOR PRIMARY VARIANTS
    v900: '#3e2723'
    v800: '#4e342e'
    v700: &color-primary-variant '#5d4037'
    v600: '#6d4c41'
    v500: '#795548'
    v400: '#8d6e63' # white text
    v300: '#a1887f' # black text
    v200: &color-primary '#bcaaa4'
    v100: '#d7ccc8'
    v50: '#efebe9'
*/

/**
 * LIGHT COLOR SECONDARY VARIANTS
    v900: '#1b5e20'
    v800: '#2e7d32' # white text
    v700: &color-secondary-variant '#388e3c' # black text
    v600: '#43a047'
    v500: '#4caf50'
    v400: '#66bb6a'
    v300: '#81c784'
    v200: &color-secondary '#a5d6a7'
    v100: '#c8e6c9'
    v50: '#e8f5e9'
*/

export const DIMENS = {
    font: {
        weight: {
            standard: 400,
            bold: 600
        },
        size: {
            xxs: '.8em',
            s: '1.1em',
            m: '1.35em',
            l: '1.7em',
            xl: '2em',
            xxl: '2.2em',
            xxxl: '2.8em'
        },
        lineHeight: {
            xs: 1.1,
            s: 1.2,
            m: 1.3,
            l: 1.4,
            xxl: 1.6,
        },
    },
    height: {
        header: {
            fixed: '50px',
            default: '80px',
        },
    },
    tablet: {
        maxWidth: '650px',
    },
    desktop: {
        maxWidth: '700px',
    },
    space: {
        xxs: '2px',
        xs: '5px',
        s: '10px',
        m: '20px',
        l: '40px',
    },
    time: {
        s: '0.5s',
        m: '1s'
    },
}