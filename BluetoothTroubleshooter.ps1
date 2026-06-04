# Bluetooth & AirPods Diagnostic and Troubleshooter
# Created by Antigravity AI

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "    Windows Bluetooth & AirPods Diagnostic Tool" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

# 1. System Information
Write-Host "`n[1] Checking System Information..." -ForegroundColor Yellow
$os = Get-CimInstance Win32_OperatingSystem
$osName = $os.Caption
$osVersion = $os.Version
Write-Host "  - Operating System: $osName" -ForegroundColor White
Write-Host "  - Windows Version:  $osVersion" -ForegroundColor White

# 2. Bluetooth Services
Write-Host "`n[2] Checking Bluetooth Services..." -ForegroundColor Yellow
$services = Get-Service -Name bthserv, BluetoothUserService* -ErrorAction SilentlyContinue
foreach ($service in $services) {
    $statusColor = if ($service.Status -eq 'Running') { 'Green' } else { 'Red' }
    Write-Host "  - $($service.DisplayName) ($($service.Name)): " -NoNewline -ForegroundColor White
    Write-Host "$($service.Status)" -ForegroundColor $statusColor
}

# 3. Bluetooth Adapter Information
Write-Host "`n[3] Checking Bluetooth Adapter..." -ForegroundColor Yellow
$adapters = Get-PnpDevice -Class Bluetooth -Status OK | Where-Object { 
    $_.InstanceId -like "*USB*" -or $_.FriendlyName -like "*Intel*" -or $_.FriendlyName -like "*Realtek*" -or $_.FriendlyName -like "*MediaTek*" 
}
if ($adapters) {
    foreach ($adapter in $adapters) {
        Write-Host "  - Found Adapter: $($adapter.FriendlyName)" -ForegroundColor Green
        Write-Host "    Instance ID:   $($adapter.InstanceId)" -ForegroundColor DarkGray
        Write-Host "    Status:        $($adapter.Status)" -ForegroundColor White
    }
} else {
    Write-Host "  - [!] No active Bluetooth adapter found in Device Manager." -ForegroundColor Red
}

# 4. Paired Bluetooth Devices
Write-Host "`n[4] Scanning Paired Bluetooth Devices..." -ForegroundColor Yellow
$pairedDevices = Get-ChildItem -Path "HKLM:\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices" -ErrorAction SilentlyContinue | ForEach-Object {
    $keyPath = $_.Name -replace "HKEY_LOCAL_MACHINE", "HKLM:"
    $nameBytes = Get-ItemProperty -Path $keyPath -Name "Name" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
    $name = if ($nameBytes) { [System.Text.Encoding]::UTF8.GetString($nameBytes).TrimEnd("`0") } else { "Unknown" }
    [PSCustomObject]@{
        Address = $_.PSChildName
        Name    = $name
    }
}

if ($pairedDevices) {
    $airpodsFound = $false
    foreach ($device in $pairedDevices) {
        $isAirPods = $device.Name -like "*AirPod*" -or $device.Name -like "*Apple*"
        $color = if ($isAirPods) { 'Green' } else { 'White' }
        if ($isAirPods) { $airpodsFound = $true }
        
        Write-Host "  - Paired Device: $($device.Name) (MAC: $($device.Address))" -ForegroundColor $color
    }
    
    if (-not $airpodsFound) {
        Write-Host "  - [!] No AirPods or Apple Audio devices are currently paired." -ForegroundColor Cyan
    }
} else {
    Write-Host "  - No paired Bluetooth devices found in the registry." -ForegroundColor Gray
}

# 5. Check active Audio Output devices
Write-Host "`n[5] Checking Audio Output Devices..." -ForegroundColor Yellow
$audioDevices = Get-PnpDevice -Class Media -Status OK -ErrorAction SilentlyContinue
if ($audioDevices) {
    $foundAudio = $false
    foreach ($dev in $audioDevices) {
        if ($dev.FriendlyName -like "*AirPod*" -or $dev.FriendlyName -like "*Bluetooth*") {
            Write-Host "  - Active Audio Device: $($dev.FriendlyName)" -ForegroundColor Green
            $foundAudio = $true
        }
    }
    if (-not $foundAudio) {
        Write-Host "  - No active Bluetooth audio devices found." -ForegroundColor Gray
    }
}

Write-Host "`n=========================================================" -ForegroundColor Cyan
Write-Host "  Diagnostic complete! Run as Administrator to unlock service restarts." -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
