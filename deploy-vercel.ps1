# Apollo Todo App - Vercel Deployment Script
Write-Host "=== Apollo Todo App Vercel Deployment ===" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Install Vercel CLI if needed
Write-Host "`n1. Checking Vercel CLI..." -ForegroundColor Yellow
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelCheck) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✓ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "✓ Vercel CLI already installed" -ForegroundColor Green
}

# Step 2: Ensure dependencies are installed
Write-Host "`n2. Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Step 3: Build locally to test
Write-Host "`n3. Building locally..." -ForegroundColor Yellow
npm run build

if (Test-Path "dist") {
    Write-Host "✓ Build successful - dist folder created" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed - check errors above" -ForegroundColor Red
    exit 1
}

# Step 4: Deploy to Vercel
Write-Host "`n4. Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "   This will open your browser for authentication" -ForegroundColor White
Write-Host "   Follow the prompts to deploy" -ForegroundColor White

vercel --prod

Write-Host "`n✓ Deployment process started!" -ForegroundColor Green
Write-Host "   Your app will be deployed to: *.vercel.app" -ForegroundColor Cyan
