# Logo Size Adjuster
param(
    [int]$Size = 100
)

Write-Host "Adjusting logo size to ${Size}px..." -ForegroundColor Cyan

if (Test-Path "src\App.jsx") {
    $content = Get-Content "src\App.jsx" -Raw
    
    # Update the height
    $updatedContent = $content -replace "height:\s*['\`"](\d+)px['\`"]", "height: '${Size}px'"
    
    # If no height found with px, try a more generic replacement
    if ($updatedContent -eq $content) {
        $updatedContent = $content -replace "(src.*logo.*style.*\{[^}]*?)height:\s*['\`"][^'\`"]+['\`"]", "`$1height: '${Size}px'"
    }
    
    $updatedContent | Out-File "src\App.jsx" -Encoding UTF8
    Write-Host "✓ Logo size set to ${Size}px" -ForegroundColor Green
} else {
    Write-Host "✗ App.jsx not found" -ForegroundColor Red
}
