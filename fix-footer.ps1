# Direct Footer Edit Script
Write-Host "=== Direct Footer Edit ===" -ForegroundColor Cyan

$filePath = "src\App.jsx"
$content = Get-Content $filePath

# Flag to track if we made changes
$changesMade = $false

# Look for the specific footer line pattern
for ($i = 0; $i -lt $content.Count; $i++) {
    if ($content[$i] -match "text-center mt-4 text-muted") {
        Write-Host "Found footer at line $($i+1)" -ForegroundColor Green
        
        # Check next few lines for <small> tag
        for ($j = $i; $j -lt [math]::Min($i+10, $content.Count); $j++) {
            if ($content[$j] -match "<small>") {
                Write-Host "Found <small> tag at line $($j+1)" -ForegroundColor Green
                
                # Check what's inside the <small> tags
                if ($content[$j] -match "<small>([^<]*)</small>") {
                    $currentText = $matches[1]
                    Write-Host "Current footer text: '$currentText'" -ForegroundColor Yellow
                    
                    # Add "Built by Apollo Technologies US"
                    $newLine = $content[$j] -replace "<small>([^<]*)</small>", "<small>`$1<br />Built by Apollo Technologies US</small>"
                    $content[$j] = $newLine
                    $changesMade = $true
                    Write-Host "✓ Updated footer text" -ForegroundColor Green
                } else {
                    # Just add our text after existing
                    $content[$j] = $content[$j] -replace "</small>", "<br />Built by Apollo Technologies US</small>"
                    $changesMade = $true
                    Write-Host "✓ Added text to existing <small> tag" -ForegroundColor Green
                }
                break
            }
        }
        
        # If no <small> tag found, add one
        if (-not $changesMade) {
            Write-Host "No <small> tag found, adding one..." -ForegroundColor Yellow
            
            # Find the closing </div> for the footer
            for ($j = $i; $j -lt [math]::Min($i+10, $content.Count); $j++) {
                if ($content[$j] -match "</div>") {
                    # Insert our text before the closing </div>
                    $content[$j] = "                        <small>Built by Apollo Technologies US</small>`n" + $content[$j]
                    $changesMade = $true
                    Write-Host "✓ Added footer text at line $($j+1)" -ForegroundColor Green
                    break
                }
            }
        }
        break
    }
}

if ($changesMade) {
    # Save the file
    $content | Out-File $filePath -Encoding UTF8
    Write-Host "✓ File updated successfully" -ForegroundColor Green
} else {
    Write-Host "⚠ Could not find footer to update" -ForegroundColor Yellow
    Write-Host "Here's what your footer area looks like:" -ForegroundColor White
    Get-Content $filePath | Select-String -Pattern "text-center|footer|Footer" -Context 2,2
}
