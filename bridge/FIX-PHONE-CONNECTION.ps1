$ErrorActionPreference = 'Stop'
$ruleName = 'MasumGalaxyBridge8765'

$admin = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $admin.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host 'Right-click FIX-PHONE-CONNECTION.bat and choose Run as administrator.' -ForegroundColor Yellow
    exit 1
}

Write-Host 'Current network profiles:' -ForegroundColor Cyan
Get-NetConnectionProfile | Select-Object Name, InterfaceAlias, NetworkCategory | Format-Table -AutoSize

try {
    $existing = Get-NetFirewallRule -Name $ruleName -ErrorAction SilentlyContinue
    if ($null -eq $existing) {
        New-NetFirewallRule -Name $ruleName `
            -DisplayName 'Masum Galaxy Bridge - Private Wi-Fi' `
            -Description 'Allows phone access to Galaxy Bridge on port 8765 from the local subnet on private networks only.' `
            -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8765 `
            -Profile Private -RemoteAddress LocalSubnet | Out-Null
        Write-Host 'Private-network rule added for local subnet, TCP port 8765.' -ForegroundColor Green
    } else {
        Write-Host 'Bridge rule already exists. No second rule was created.' -ForegroundColor Green
    }
} catch {
    Write-Host "Could not add the rule: $($_.Exception.Message)" -ForegroundColor Red
    exit 2
}

$private = Get-NetConnectionProfile | Where-Object NetworkCategory -eq 'Private'
if (-not $private) {
    Write-Host 'Your active network may be Public. Windows Settings > Network & internet > Wi-Fi > your network > Network profile > Private.' -ForegroundColor Yellow
}

try {
    $result = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8765/api/session' -TimeoutSec 4
    Write-Host "Laptop Bridge responded locally (HTTP $($result.StatusCode))." -ForegroundColor Green
} catch {
    Write-Host 'Bridge is not responding on this laptop. Start START-BRIDGE.bat and keep its window open.' -ForegroundColor Yellow
}

Write-Host 'Now retry http://192.168.0.106:8765/ on the phone (or use the current Phone address shown by START-BRIDGE.bat).'
Write-Host 'To remove this rule later, open PowerShell as administrator and run: Remove-NetFirewallRule -Name MasumGalaxyBridge8765'
