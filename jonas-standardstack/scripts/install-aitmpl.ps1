param(
    [string]$TargetPath = "."
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    throw "npx hittades inte. Installera Node.js innan AITMPL-komponenterna installeras."
}

$resolvedTarget = (Resolve-Path $TargetPath).Path
Push-Location $resolvedTarget

try {
    $components = @(
        @{ Type = "agent"; Name = "development-tools/code-reviewer" },
        @{ Type = "agent"; Name = "development-tools/architect-reviewer" },
        @{ Type = "agent"; Name = "security/read-only-auditor" },
        @{ Type = "command"; Name = "testing/generate-tests" },
        @{ Type = "hook"; Name = "git/pre-commit-validation" }
    )

    foreach ($component in $components) {
        Write-Host "Installerar $($component.Type): $($component.Name)"
        & npx claude-code-templates@latest "--$($component.Type)" $component.Name --yes

        if ($LASTEXITCODE -ne 0) {
            throw "Installationen misslyckades för $($component.Name)."
        }
    }

    Write-Host ""
    Write-Host "AITMPL-basstack installerad i $resolvedTarget"
    Write-Host "Kör inte alla reviewers automatiskt. Följ CLAUDE.md och docs/REVIEW_PROTOCOL.md."
}
finally {
    Pop-Location
}
