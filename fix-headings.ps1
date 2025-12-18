# Quick Fix for Heading Colors
$file = "src\App.jsx"
$content = [System.IO.File]::ReadAllText($file)

Write-Host "Updating heading colors..." -ForegroundColor Yellow

# Replace h1 style
$originalH1 = 'style={{ fontSize: ''2.2rem'' }}'
$newH1 = 'style={{ color: "#003366", fontSize: "2.2rem", fontWeight: "bold" }}'

if ($content.Contains($originalH1)) {
    $content = $content.Replace($originalH1, $newH1)
    Write-Host "✓ Updated main heading (Apollo Todo App) to dark blue" -ForegroundColor Green
} else {
    Write-Host "✗ Could not find h1 style pattern" -ForegroundColor Red
}

# Replace p style  
$originalP = "style={{ fontSize: '1rem', opacity: 0.9 }}"
$newP = 'style={{ color: "#0066cc", fontSize: "1rem", opacity: 1, fontWeight: "600" }}'

if ($content.Contains($originalP)) {
    $content = $content.Replace($originalP, $newP)
    Write-Host "✓ Updated subtitle to medium blue" -ForegroundColor Green
} else {
    Write-Host "✗ Could not find p style pattern" -ForegroundColor Red
}

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "`n✓ File updated successfully!" -ForegroundColor Green
