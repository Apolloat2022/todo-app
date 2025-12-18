# Build Test Script
Write-Host "=== Testing Build Process ===" -ForegroundColor Cyan

# Clean previous build
if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
    Write-Host "Cleaned previous build" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install

# Build
Write-Host "`nBuilding..." -ForegroundColor Yellow
npm run build

# Check result
if (Test-Path "dist") {
    $files = Get-ChildItem "dist" -Recurse | Measure-Object
    Write-Host "✓ Build successful!" -ForegroundColor Green
    Write-Host "  Created $($files.Count) files in dist folder" -ForegroundColor White
    
    # Show main files
    Write-Host "`nMain build files:" -ForegroundColor Yellow
    Get-ChildItem "dist" -File | Select-Object Name, @{N='SizeKB';E={[math]::Round($_.Length/1KB,2)}} | Format-Table
    
} else {
    Write-Host "✗ Build failed - no dist folder created" -ForegroundColor Red
}
