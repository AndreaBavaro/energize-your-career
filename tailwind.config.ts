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
          50:  "#F2F2F2",   // Light silver
          100: "#E0E0E0",   // Soft silver-gray
          200: "#C7C7C7",   // Brushed silver
          300: "#AFAFAF",   // Light metallic steel
          400: "#989898",   // Cool medium grey
          450: "#8E8E8E",   // Slightly darker brushed metal grey
          500: "#808080",   // Base color (Classic metallic grey)
          600: "#707070",   // Dark polished steel
          700: "#606060",   // Charcoal metal
          800: "#505050",   // Deep graphite grey
          900: "#404040",   // Gunmetal dark grey
          950: "#303030",   // Almost black metallic
        },
        alternative: {
          50: "#EFF6FF",    // Very light blue
  100: "#DBEAFE",   // Pale sky blue
  200: "#BFDBFE",   // Light sky blue
  300: "#93C5FD",   // Soft cornflower blue
  400: "#60A5FA",   // Bright light blue
  450: "#4C93F8",   // Midpoint tone between 400 & 500
  500: "#3B82F6",   // Base color (Medium blue)
  600: "#2563EB",   // Strong blue
  700: "#1D4ED8",   // Rich royal blue
  800: "#1E40AF",   // Deep royal blue
  900: "#1E3A8A",   // Dark navy blue
  950: "#172554",   // Very dark indigo 
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
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'transform': 'transform',
      },
      transform: {
        'perspective': 'perspective(var(--tw-perspective))',
      },
      transformOrigin: {
        'center': 'center',
      },
      perspective: {
        '800': '800px',
        '1000': '1000px',
        '1200': '1200px',
      },
      rotate: {
        'y-12': 'rotateY(12deg)',
        'y-180': 'rotateY(180deg)',
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
        },
        gradientX: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%' 
          }
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
        'scale-in': 'scaleIn 0.6s ease-out',
        'gradient-x': 'gradientX 8s ease infinite'
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
