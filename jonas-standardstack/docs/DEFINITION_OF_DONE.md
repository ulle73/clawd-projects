# Definition of Done

En uppgift är inte klar för att koden är skriven.

## Funktion

- Kraven i `PROJECT.md` är uppfyllda.
- Primärflödet fungerar.
- Relevanta edge cases och felvägar är hanterade.
- Ändringen orsakar inte kända regressioner i närliggande flöden.
- Inga oavsiktliga TODO-, mock- eller placeholder-lösningar finns i produktionsflödet.

## Kvalitet

Där projektet stödjer det ska följande passera:

- build
- lint
- typecheck
- relevanta automatiska tester

Tester ska verifiera beteende, inte bara att en funktion anropades.

## Data

Vid schema- eller datamigrering:

- migreringen är reproducerbar
- befintlig data bevaras
- rollback eller återställningsväg är dokumenterad
- förändringen har testats mot realistisk data

## Säkerhet

- inga credentials eller secrets i kod
- input valideras vid trust boundaries
- behörighet kontrolleras server-side där det behövs
- känslig information exponeras inte i felmeddelanden eller loggar
- säkerhetsreview har körts om ändringen träffar kriterierna i `REVIEW_PROTOCOL.md`

## Drift

- fel går att upptäcka
- externa API-anrop har rimlig timeout/felhantering
- återförsök är endast införda när operationen är säker att upprepa
- rate limits och relevanta driftgränser är beaktade

## UI

När relevant:

- loading state
- empty state
- error state
- disabled/pending state för mutationer
- mobil layout
- tangentbord/tillgänglighet för centrala kontroller

## Dokumentation

`PROJECT.md` uppdateras om implementationen ändrar ett viktigt antagande, kommando, deploymentflöde eller arkitekturbeslut.

## Slutrapport

Arbetet får kallas klart först när agenten kan redovisa:
- ändrade delar
- körda verifieringar
- resultat
- kvarvarande risk
