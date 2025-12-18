# Logo Size Verification Script
Write-Host "=== Logo Size Verification ===" -ForegroundColor Cyan

# Check if App.jsx exists
if (Test-Path "src\App.jsx") {
    $content = Get-Content "src\App.jsx" -Raw
    
    # Check for logo height
    if ($content -match "height:\s*['\`"](\d+)px['\`"]") {
        $height = $matches[1]
        Write-Host "✓ Logo height found: ${height}px" -ForegroundColor Green
        
        if ([int]$height -ge 90) {
            Write-Host "✓ Logo is sufficiently large (${height}px)" -ForegroundColor Green
        } else {
            Write-Host "⚠ Logo might still be small (${height}px)" -ForegroundColor Yellow
            Write-Host "  You can increase it further by editing the 'height' value in App.jsx" -ForegroundColor White
        }
    } else {
        Write-Host "✗ Could not find logo height in App.jsx" -ForegroundColor Red
    }
    
    # Check for logo reference
    if ($content -match "logo\.png") {
        Write-Host "✓ Logo file reference found" -ForegroundColor Green
    } else {
        Write-Host "✗ Logo file reference not found" -ForegroundColor Red
    }
} else {
    Write-Host "✗ App.jsx not found" -ForegroundColor Red
}

Write-Host "`n=== Quick Fixes ===" -ForegroundColor Cyan
Write-Host "If the logo isn't showing or is still too small:" -ForegroundColor White
Write-Host "1. Make sure logo.png exists in src/assets/" -ForegroundColor White
Write-Host "2. Check the console for any 404 errors" -ForegroundColor White
Write-Host "3. Adjust the height value in App.jsx manually:" -ForegroundColor White
Write-Host "   - Open src/App.jsx" -ForegroundColor White
Write-Host "   - Find the 'height' property for the logo" -ForegroundColor White
Write-Host "   - Change it to '120px', '150px', or your preferred size" -ForegroundColor White
