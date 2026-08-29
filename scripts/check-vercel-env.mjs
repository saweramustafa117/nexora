/**
 * Runs before `vite build`. On Vercel, fails loudly if the API key
 * wasn't injected into the build environment.
 */
const key = process.env.VITE_OPENROUTER_API_KEY?.trim();

if (process.env.VERCEL === '1') {
  if (!key) {
    console.error('\n❌ VITE_OPENROUTER_API_KEY is missing during Vercel build.\n');
    console.error('Fix in Vercel Dashboard → Project → Settings → Environment Variables:');
    console.error('  • Name:  VITE_OPENROUTER_API_KEY');
    console.error('  • Value: your sk-or-v1-... key');
    console.error('  • Type:  Config  (NOT Secret — VITE_ vars are client-side)');
    console.error('  • Environments: ✅ Production  ✅ Preview\n');
    console.error('Then: Deployments → Redeploy → disable "Use existing Build Cache"\n');
    process.exit(1);
  }
  console.log(`✓ VITE_OPENROUTER_API_KEY present at build time (${key.length} chars)\n`);
}
