param(
    [Parameter(Mandatory = $true)]
    [string]$TargetPath,

    [switch]$InstallAITMPL
)

$ErrorActionPreference = "Stop"

$stackRoot = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $TargetPath)) {
    throw "Målmappen finns inte: $TargetPath"
}

$target = (Resolve-Path $TargetPath).Path

function Copy-StandardFile {
    param(
        [string]$SourceRelative,
        [string]$DestinationRelative,
        [switch]$OnlyIfMissing
    )

    $source = Join-Path $stackRoot $SourceRelative
    $destination = Join-Path $target $DestinationRelative
    $destinationDir = Split-Path -Parent $destination

    if (-not (Test-Path $destinationDir)) {
        New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
    }

    if ($OnlyIfMissing -and (Test-Path $destination)) {
        Write-Host "Behåller befintlig: $DestinationRelative"
        return
    }

    Copy-Item $source $destination -Force
    Write-Host "Installerad: $DestinationRelative"
}

Copy-StandardFile "AGENTS.md" "AGENTS.md"
Copy-StandardFile "CLAUDE.md" "CLAUDE.md"
Copy-StandardFile "PROJECT.template.md" "PROJECT.md" -OnlyIfMissing
Copy-StandardFile "docs\DEFINITION_OF_DONE.md" "docs\DEFINITION_OF_DONE.md"
Copy-StandardFile "docs\REVIEW_PROTOCOL.md" "docs\REVIEW_PROTOCOL.md"
Copy-StandardFile ".github\pull_request_template.md" ".github\pull_request_template.md"

if ($InstallAITMPL) {
    & (Join-Path $PSScriptRoot "install-aitmpl.ps1") -TargetPath $target
}

Write-Host ""
Write-Host "Jonas Standardstack installerad i $target"
Write-Host "Nästa steg: fyll i PROJECT.md innan större utvecklingsarbete."
