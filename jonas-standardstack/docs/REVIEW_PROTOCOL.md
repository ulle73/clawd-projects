# Review Protocol

Syftet är att hitta dyra fel utan att skapa ett låtsasteam av agenter.

## 1. Arkitekturreview

Kör före implementation när ändringen berör minst ett av följande:

- databasmodell eller migration som är svår att backa
- auth/identity/behörighetsmodell
- betalningsflöde
- ny extern kärnintegration
- bakgrundsjobb, köer eller eventarkitektur
- cache som påverkar korrekthet
- ny tjänst eller nytt större ramverk
- ändring av servicegränser
- betydande drift- eller kostnadsökning

Reviewern ska svara på:

1. Vilka är de tre största konkreta riskerna?
2. Vilket antagande kan göra lösningen fel eller onödigt dyr?
3. Finns en enklare design med samma användarutfall?
4. Vad blir dyrast att ändra efter lansering?

Arkitekturreview ska inte användas för vanliga komponent-, styling-, copy- eller små bugfixar.

## 2. Kodreview

Kör efter icke-trivial implementation.

Prioritera:

- faktisk buggrisk
- dataintegritet
- race conditions
- felhantering
- regressioner
- felaktiga antaganden om API/data
- onödig komplexitet som gör framtida ändringar riskabla

Krav på fynd:

- exakt fil/kodområde
- reproducerbar eller logiskt tydlig felväg
- konsekvens
- prioritet
- konkret fix

Prioriteter:

- P0: blockerar merge/release
- P1: bör fixas före merge
- P2: förbättring; blockerar inte
- Ignore: stilsmak utan praktisk konsekvens

Kör inte review-loopar tills modellen säger "perfekt". En andra pass krävs bara efter P0/P1 eller stor omarbetning.

## 3. Säkerhetsreview

Kör när ändringen hanterar:

- login/session/token
- roller/behörigheter
- adminfunktioner
- betalningar
- persondata eller annan känslig data
- secrets
- filuppladdning
- HTML från användare
- SQL/kommandon byggda från input
- externa write-actions
- webhookar
- AI-agenter med verktyg som kan skriva, skicka, köpa, radera eller deploya

Säkerhetsreviewern ska vara read-only. Huvudagenten fixar därefter problemen och verifierar regressioner.

## 4. Reviewbudget

Normal uppgift:
- 1 kodreview

Strukturell uppgift:
- 1 arkitekturreview
- 1 kodreview

Säkerhetskritisk strukturell uppgift:
- 1 arkitekturreview
- 1 säkerhetsreview
- 1 kodreview

Mer än detta kräver ett konkret skäl.
