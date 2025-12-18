# BOM Character Fixer for Windows
Write-Host "=== Fixing BOM Characters ===" -ForegroundColor Cyan
Write-Host "Removes hidden UTF-8 BOM characters that break JSON parsing" -ForegroundColor White

$filesFixed = 0

# Check common config files
$configFiles = @("package.json", "package-lock.json", "vite.config.js", "postcss.config.js", ".npmrc")

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
            Write-Host "Fixing: $file" -ForegroundColor Yellow
            $content = Get-Content $file -Raw
            [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
            $filesFixed++
        }
    }
}

if ($filesFixed -gt 0) {
    Write-Host "✓ Fixed $filesFixed files with BOM characters" -ForegroundColor Green
} else {
    Write-Host "✓ No files with BOM characters found" -ForegroundColor Green
}
