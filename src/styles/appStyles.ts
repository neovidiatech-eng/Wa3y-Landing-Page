export const appStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');

  @theme {
    --color-primary: #0F766E;
    --color-secondary: #115E59;
    --color-accent: #D4AF37;
    --color-background: #F8FAFC;
    --color-dark: #0F172A;
    --color-muted: #64748B;
    --color-success: #22C55E;
  }

  :root {
    --primary: #0F766E;
    --secondary: #115E59;
    --accent: #D4AF37;
    --background: #F8FAFC;
    --dark: #0F172A;
    --muted: #64748B;
    --success: #22C55E;
  }

  html {
    scroll-behavior: smooth;
  }

  .mesh-gradient {
    background: radial-gradient(circle at 0% 0%, rgba(15, 118, 110, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
  }

  .pattern-bg {
    background-color: #f8fafc;
    background-image: radial-gradient(#0f766e 0.5px, transparent 0.5px), radial-gradient(#0f766e 0.5px, #f8fafc 0.5px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    opacity: 0.05;
  }

  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .drop-shadow-glow {
    filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
  }
`;

