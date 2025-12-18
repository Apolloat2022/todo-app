# Verify Logo and Footer Updates
Write-Host "=== Verification: Logo & Footer Updates ===" -ForegroundColor Cyan

if (Test-Path "src\App.jsx") {
    $content = Get-Content "src\App.jsx" -Raw
    
    # Check logo size
    Write-Host "`n1. LOGO SIZE CHECK:" -ForegroundColor Yellow
    if ($content -match "height:\s*['\`"](\d+)px['\`"]") {
        $height = $matches[1]
        Write-Host "   ✓ Logo height: ${height}px" -ForegroundColor Green
        
        if ([int]$height -eq 200) {
            Write-Host "   ✓ Logo successfully doubled to 200px!" -ForegroundColor Green
        } elseif ([int]$height -ge 150) {
            Write-Host "   ✓ Logo is large (${height}px)" -ForegroundColor Green
        } else {
            Write-Host "   ⚠ Logo might need to be larger" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ✗ Could not find logo height" -ForegroundColor Red
    }
    
    # Check for Apollo Technologies US in footer
    Write-Host "`n2. FOOTER CHECK:" -ForegroundColor Yellow
    if ($content -match "Built by Apollo Technologies US") {
        Write-Host "   ✓ 'Built by Apollo Technologies US' found in footer" -ForegroundColor Green
        
        # Show context
        Write-Host "   Context:" -ForegroundColor White
        Get-Content "src\App.jsx" | Select-String -Pattern "Built by Apollo Technologies US" -Context 1,1 | ForEach-Object {
            Write-Host "   " $_.Line -ForegroundColor Gray
        }
    } else {
        Write-Host "   ✗ 'Built by Apollo Technologies US' not found" -ForegroundColor Red
    }
    
    # Check logo file reference
    Write-Host "`n3. LOGO FILE CHECK:" -ForegroundColor Yellow
    if ($content -match "logo\.png") {
        Write-Host "   ✓ Logo file reference found" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Logo file reference not found" -ForegroundColor Red
    }
    
} else {
    Write-Host "✗ App.jsx not found" -ForegroundColor Red
}

Write-Host "`n=== Manual Verification Steps ===" -ForegroundColor Cyan
Write-Host "1. Start/Restart your dev server: npm run dev" -ForegroundColor White
Write-Host "2. Open browser to: http://localhost:5173" -ForegroundColor White
Write-Host "3. Check for:" -ForegroundColor White
Write-Host "   - Larger logo (should be 200px tall)" -ForegroundColor White
Write-Host "   - 'Built by Apollo Technologies US' in footer" -ForegroundColor White
Write-Host "`n=== Quick Adjustments ===" -ForegroundColor Cyan
Write-Host "To adjust logo size: Edit 'height' value in src/App.jsx" -ForegroundColor White
Write-Host "To adjust footer text: Look for 'Built by Apollo Technologies US'" -ForegroundColor White
