# Jonas Standardstack

En liten, återanvändbar arbetsstandard för AI-assisterad utveckling.

Målet är inte fler agenter. Målet är bättre leveranser med färre, tydligare roller och mätbara kvalitetsgrindar.

## Princip

En huvudagent äger analys, implementation och tester. Specialistagenter används endast som oberoende granskare när deras kompetens behövs.

Standardflöde:

1. Läs `PROJECT.md`.
2. Förstå befintlig kod innan du ändrar något.
3. Identifiera minsta säkra förändring som löser användarens faktiska mål.
4. Implementera själv.
5. Kör projektets riktiga kvalitetskontroller.
6. Kör relevant oberoende review.
7. Fixa blockerande fynd.
8. Rapportera vad som ändrades, vad som verifierades och vilken risk som återstår.

## Vad som ingår

- `AGENTS.md` – generell standard för AI-kodagenter.
- `CLAUDE.md` – Claude Code/AITMPL-specifika regler.
- `PROJECT.template.md` – projektets source of truth.
- `docs/DEFINITION_OF_DONE.md` – när arbete faktiskt är klart.
- `docs/REVIEW_PROTOCOL.md` – när arkitektur-, kod- och säkerhetsreview ska användas.
- `.github/pull_request_template.md` – samma kvalitetskrav i PR-flödet.
- `scripts/install-aitmpl.ps1` – installerar en minimal AITMPL-stack.
- `scripts/apply-to-project.ps1` – kopierar standarden till ett annat repo.

## Minimal AITMPL-stack

Basprofilen installerar:

- `development-tools/code-reviewer`
- `development-tools/architect-reviewer`
- `security/read-only-auditor`
- `testing/generate-tests`
- `git/pre-commit-validation`

Detta är medvetet litet. Ingen frontend-, backend-, produktägar- eller DevOps-agent installeras globalt. Sådana komponenter ska bara läggas till om ett konkret projekt behöver dem.

## Installera i ett projekt på Windows

Från den här mappen:

```powershell
.\scripts\apply-to-project.ps1 -TargetPath "C:\kod\mitt-projekt" -InstallAITMPL
```

Om du bara vill lägga in reglerna utan AITMPL:

```powershell
.\scripts\apply-to-project.ps1 -TargetPath "C:\kod\mitt-projekt"
```

Skriptet skriver inte över en befintlig `PROJECT.md`. Om filen saknas skapas den från mallen.

## Projektets viktigaste fil

Varje repo ska ha en `PROJECT.md`. Den beskriver mål, lyckat resultat, misslyckat resultat, icke-mål, begränsningar, risker, verifieringskommandon och det dyraste antagandet som ännu inte är bevisat.

## Regel mot agentinflation

Standard: 0–1 specialistagent per normal uppgift.

Använd arkitektgranskaren före strukturella förändringar. Använd kodgranskaren efter implementation. Använd säkerhetsgranskaren när ändringen berör auth, behörighet, betalningar, hemligheter, persondata, adminfunktioner eller externa write-actions.

Kör inte flera implementation-agenter parallellt på samma problem.
