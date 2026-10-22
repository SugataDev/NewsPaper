Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) "reference/home.png"))
$bmp = New-Object System.Drawing.Bitmap($img)

Write-Host "Image size: $($bmp.Width) x $($bmp.Height)"

function Get-HexColor($x, $y) {
    $c = $bmp.GetPixel($x, $y)
    return "#{0:X2}{1:X2}{2:X2}" -f $c.R, $c.G, $c.B
}

# 1. Let's find content container boundaries.
# Header row 2 has border-top/bottom rules or row 1 top teaser / logo area.
# In row 38 (top header):
# Let's scan horizontally across y = 40 to see where the logo starts and ends.
Write-Host "`n--- Finding container bounds at y=40 (Header logo) ---"
$leftBound = -1
$rightBound = -1
for ($x = 100; $x -lt 1820; $x++) {
    $c = $bmp.GetPixel($x, 40)
    # If not white (#FFFFFF)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        if ($leftBound -eq -1) { $leftBound = $x }
        $rightBound = $x
    }
}
Write-Host "Content bounds at y=40: left=$leftBound, right=$rightBound, span=$($rightBound - $leftBound)"

# Let's scan at y = 80 (nav bar or hero lead)
Write-Host "`n--- Finding container bounds at y=500 (Hero section) ---"
$leftBoundHero = -1
$rightBoundHero = -1
for ($x = 100; $x -lt 1820; $x++) {
    $c = $bmp.GetPixel($x, 500)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        if ($leftBoundHero -eq -1) { $leftBoundHero = $x }
        $rightBoundHero = $x
    }
}
Write-Host "Content bounds at y=500: left=$leftBoundHero, right=$rightBoundHero, span=$($rightBoundHero - $leftBoundHero)"

# Let's inspect the Red logo dot or kicker
# In the hero left column, there is a red kicker: "রাবিতে ছাত্র" or similar around y=480..520, x=340..500
Write-Host "`n--- Searching for Red kicker color around x=340..550, y=470..550 ---"
$redSamples = @()
for ($y = 470; $y -lt 550; $y += 2) {
    for ($x = 340; $x -lt 550; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        # Red is high R (> 200), low G (< 60), low B (< 60)
        if ($c.R -gt 200 -and $c.G -lt 60 -and $c.B -lt 60) {
            $redSamples += (Get-HexColor $x $y)
        }
    }
}
Write-Host "Sampled red count: $($redSamples.Count)"
$redSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Red: $($_.Name) (count $($_.Count))"
}

# Blue button around y=3600 (Bangladesh local news filter)
Write-Host "`n--- Searching for Blue button around y=3600..3750 ---"
$blueSamples = @()
for ($y = 3600; $y -lt 3750; $y += 3) {
    for ($x = 1200; $x -lt 1600; $x += 3) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.B -gt 180 -and $c.R -lt 60 -and $c.G -lt 150) {
            $blueSamples += (Get-HexColor $x $y)
        }
    }
}
$blueSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Blue: $($_.Name) (count $($_.Count))"
}

# Video section background (Blue tint) around y=1900..2300
Write-Host "`n--- Searching for Video section card bg around y=1900..2200 ---"
$videoBgSamples = @()
for ($y = 2000; $y -lt 2200; $y += 5) {
    for ($x = 360; $x -lt 600; $x += 5) {
        $c = $bmp.GetPixel($x, $y)
        # blue tint: R ~ 220-240, G ~ 235-245, B ~ 250-255
        if ($c.R -gt 220 -and $c.R -lt 245 -and $c.B -gt 245) {
            $videoBgSamples += (Get-HexColor $x $y)
        }
    }
}
$videoBgSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Video card bg: $($_.Name) (count $($_.Count))"
}

# Promo strip pink tint around y=2400..2600
Write-Host "`n--- Searching for Promo strip pink tint around y=2400..2600 ---"
$promoPinkSamples = @()
for ($y = 2400; $y -lt 2600; $y += 5) {
    for ($x = 100; $x -lt 300; $x += 10) { # full bleed area
        $c = $bmp.GetPixel($x, $y)
        # pink tint: high R (> 245), slight lower G/B (G ~ 235-245, B ~ 235-245)
        if ($c.R -gt 245 -and $c.G -gt 230 -and $c.G -lt 248 -and $c.B -gt 230 -and $c.B -lt 245) {
            $promoPinkSamples += (Get-HexColor $x $y)
        }
    }
}
$promoPinkSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Promo strip pink bg: $($_.Name) (count $($_.Count))"
}

# Hairline borders
Write-Host "`n--- Checking Hairline border colors ---"
$hairlineSamples = @()
# Vertical rule between left column and center column in hero around y=400..800
# Let's find vertical lines: x around 600..750 where R=G=B between 215 and 235
for ($x = 600; $x -lt 750; $x++) {
    $c = $bmp.GetPixel($x, 600)
    if ($c.R -eq $c.G -and $c.G -eq $c.B -and $c.R -ge 215 -and $c.R -le 240) {
        $hairlineSamples += (Get-HexColor $x 600)
    }
}
$hairlineSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Hairline: $($_.Name) (count $($_.Count))"
}

# Dark promo cards around y=2450
Write-Host "`n--- Checking Dark promo card color around y=2450 ---"
$darkPromoSamples = @()
for ($y = 2450; $y -lt 2550; $y += 5) {
    for ($x = 450; $x -lt 550; $x += 5) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 30 -and $c.G -lt 30 -and $c.B -lt 30) {
            $darkPromoSamples += (Get-HexColor $x $y)
        }
    }
}
$darkPromoSamples | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "Dark card bg: $($_.Name) (count $($_.Count))"
}

$bmp.Dispose()
$img.Dispose()
