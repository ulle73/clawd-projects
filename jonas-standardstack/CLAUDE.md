# Claude Code Standard

Följ alltid `AGENTS.md` och `PROJECT.md`.

## Huvudregel

Claude är huvudutvecklare. AITMPL-agenter är oberoende reviewers, inte ett permanent agentteam.

Använd inte en subagent bara för att den finns. För normal feature- eller bugfixutveckling ska huvudagenten normalt själv:
- läsa koden
- planera
- implementera
- skriva eller uppdatera tester
- köra verifiering

## Installerade AITMPL-komponenter

Basstacken kan innehålla:

- `development-tools/code-reviewer`
- `development-tools/architect-reviewer`
- `security/read-only-auditor`
- `testing/generate-tests`
- `git/pre-commit-validation`

### När de används

**architect-reviewer**

Använd före svåråterkalleliga strukturella beslut. Be om de tre största riskerna och enklaste hållbara alternativet. Kör inte för små UI-, copy- eller bugfixändringar.

**code-reviewer**

Använd efter icke-trivial implementation. Be om verkliga buggar, regressionsrisker, felhantering, dataintegritet och tydlig teknisk skuld. Max en normal review-pass.

**read-only-auditor**

Använd för säkerhetskänsliga flöden. Den ska granska utan att ändra kod. Huvudagenten ansvarar därefter för åtgärder och tester.

**generate-tests**

Använd när befintlig testtäckning inte fångar det ändrade beteendet. Acceptera inte genererade tester blint; verifiera att de testar verkligt beteende och kan fallera av rätt anledning.

**pre-commit-validation**

Använd som sista lokal grind, men låt projektets egna kommandon i `PROJECT.md` avgöra vad som är obligatoriskt.

## Agentbudget

Normal uppgift: 0–1 specialist.

Större strukturell uppgift: högst 2 specialister före slutreview.

Säkerhetskritisk uppgift: arkitektur + säkerhet + kodreview kan motiveras.

Undvik parallella implementation-agenter som ändrar samma område.

## Stoppsignal

Om en agent föreslår ny databas, kö, cache, mikrotjänst, betalt SaaS, auth-system, stort ramverksbyte eller annan dyr permanent komponent ska den först visa:

1. vilket verifierat problem det löser
2. varför befintlig lösning inte räcker
3. enklare alternativ
4. migrations- och exitkostnad
