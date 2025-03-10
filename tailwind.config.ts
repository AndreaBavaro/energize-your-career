import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        voltify: {
          50: "#fdf7f3",    // Very light soft nude
          100: "#f6eadd",   // Lighter warm beige
          200: "#ebd7c0",   // Balanced nude
          300: "#e1c5a6",   // Soft creamy beige
          400: "#daba93",   // Muted peachy beige
          500: "#D6B89A",   // Base color (Softer, less brown)
          600: "#c3a789",   // Softened tan
          700: "#af9579",   // Muted warm taupe
          800: "#9a8370",   // Neutral brown-tan
          850: "#8e7867",   // Softer deep taupe
          900: "#827060",   // Desaturated warm brown
          950: "#6a5d50",   // Deepest tone, but less brown
        }
        
        
               
        ,
        alternative: {
          50: "#f2f6fb",    // Very light version
          100: "#e0e8f3",
          200: "#c0cde3",
          300: "#a0b3d3",
          400: "#8098c3",
          500: "#7393B3",    // Base color
          600: "#6783a0",
          700: "#5b728d",
          800: "#4f627a",
          900: "#435167",
          950: "#374154",
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-up-fast': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '3em',
              marginBottom: '3em'
            },
            'h1, h2, h3': {
              letterSpacing: '-0.025em'
            },
            h2: {
              marginBottom: '1em'
            },
            h3: {
              marginTop: '1.5em',
              marginBottom: '0.5em'
            },
            h4: {
              marginTop: '1.5em',
              marginBottom: '0.5em'
            },
            'ul > li': {
              paddingLeft: '1.5em'
            },
            'ul > li::before': {
              width: '0.75em',
              height: '0.125em',
              top: '0.875em',
              left: 0,
              borderRadius: '999px',
              backgroundColor: 'hsl(var(--foreground))'
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
              fontWeight: '500'
            },
            'a:hover': {
              textDecoration: 'underline'
            },
            pre: {
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: 'none',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              marginLeft: '-1rem',
              marginRight: '-1rem'
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '1.5em',
              marginBottom: '1.5em'
            }
          }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
