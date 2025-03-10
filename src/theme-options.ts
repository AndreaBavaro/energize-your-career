// Theme color options for Voltify

type ThemeOption = {
  name: string;
  description: string;
  colors: {
    [key: string]: string;
  };
};

// Generate a full color palette from a base color
const generatePalette = (baseColor: string, name: string, description: string): ThemeOption => {
  // This is a simplified palette generation
  // In a real scenario, you might want to use a color manipulation library
  return {
    name,
    description,
    colors: {
      '50': adjustColor(baseColor, 0.9),  // Lightest
      '100': adjustColor(baseColor, 0.8),
      '200': adjustColor(baseColor, 0.6),
      '300': adjustColor(baseColor, 0.4),
      '400': adjustColor(baseColor, 0.2),
      '500': baseColor,                    // Base color
      '600': adjustColor(baseColor, -0.15),
      '700': adjustColor(baseColor, -0.3),
      '800': adjustColor(baseColor, -0.45),
      '900': adjustColor(baseColor, -0.6),
      '950': adjustColor(baseColor, -0.75), // Darkest
    }
  };
};

// Simple function to lighten or darken a hex color
function adjustColor(hex: string, amount: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Adjust colors
  if (amount > 0) {
    // Lighten
    r = Math.min(255, r + Math.round((255 - r) * amount));
    g = Math.min(255, g + Math.round((255 - g) * amount));
    b = Math.min(255, b + Math.round((255 - b) * amount));
  } else {
    // Darken
    r = Math.max(0, r + Math.round(r * amount));
    g = Math.max(0, g + Math.round(g * amount));
    b = Math.max(0, b + Math.round(b * amount));
  }

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Theme options
export const themeOptions: ThemeOption[] = [
  generatePalette('#a1abc4', 'Periwinkle Blue', 'Soft periwinkle blue, calming and professional'),
  generatePalette('#b996b0', 'Mauve', 'Soft mauve with pink undertones'),
  generatePalette('#8988a0', 'Slate Blue', 'Muted slate blue, professional and calm'),
  generatePalette('#a5707e', 'Dusty Rose', 'Elegant dusty rose with depth'),
  generatePalette('#b7403c', 'Terracotta', 'Bold terracotta red, energetic'),
  generatePalette('#8f94a0', 'Cool Gray', 'Modern cool gray with blue undertones'),
];

// Current selected theme (change the index to select a different theme)
export const currentTheme = themeOptions[0]; // Default to the first option (Periwinkle Blue)
