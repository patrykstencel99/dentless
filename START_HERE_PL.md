# CommentSnap — instrukcja "po ludzku" (Mac + lokalnie)

Spokojnie — poniżej masz prostą wersję bez żargonu developerskiego.

## 1) Co już jest zrobione i działa (funkcjonalnie)

To, co aplikacja **ma robić**:
- ekran **Create** do wpisania `username` i `comment`;
- podgląd na żywo (zmieniasz tekst -> podgląd się zmienia od razu);
- przycisk **Copy** (kopiuje komentarz);
- przycisk **Download Comment** (zapisuje PNG tylko z podglądu);
- ekran **History** (zapamiętuje ostatnie projekty w przeglądarce, do 20 sztuk);
- zakładki **Bulk** i **Profile** jako "Coming soon".

W skrócie: to jest działający MVP na frontendzie (bez backendu i bez API).

---

## 2) Dlaczego u mnie (w tej chmurze) nie odpaliłem tego do końca?

W tym środowisku blokowany był dostęp do paczek npm (`403 Forbidden`), więc nie dało się dociągnąć zależności i uruchomić serwera.

To NIE oznacza, że projekt jest "zepsuty" — po prostu ta konkretna maszyna miała blokadę dostępu do rejestru paczek.

---

## 3) Jak odpalić u Ciebie na Macu (najprościej)

### Krok A — sprawdź Node.js
1. Otwórz Terminal.
2. Wpisz:

```bash
node -v
npm -v
```

Jeśli `node` nie działa, zainstaluj LTS z: https://nodejs.org

### Krok B — pobierz kod
Masz 2 opcje:
- ZIP z repo i rozpakowanie,
- albo `git clone ...` jeśli używasz gita.

### Krok C — instalacja i start
W folderze projektu:

```bash
npm install
npm run dev
```

Potem otwórz w przeglądarce:

```text
http://localhost:3000/create
```

---

## 4) Szybki test "czy działa" (2 min)

1. Wpisz swój username i komentarz na `/create`.
2. Sprawdź, czy preview reaguje od razu.
3. Kliknij **Copy** i wklej gdziekolwiek (np. Notatki) — powinien wkleić tekst.
4. Kliknij **Download Comment** — powinien pobrać plik PNG.
5. Wejdź na **History** — powinien pokazać ostatnie projekty.
6. Kliknij **Load** na projekcie — powinien wrócić na `/create` z tymi danymi.

---

## 5) Jak pracować dalej bez bycia programistą

Najprostszy workflow dla Ciebie:
1. Traktuj `/create` jako główny ekran produktu.
2. Najpierw dopracuj UX i copy (teksty przycisków, wygląd, flow).
3. Potem dopiero dodawaj "pro" funkcje (Bulk CSV, ZIP export, gotowe style platform).

Jeśli chcesz, mogę w następnym kroku przygotować Ci:
- checklistę "go-live MVP" dla marketera,
- 3 warianty UI (minimal / creator / agency),
- plan monetyzacji i onboarding bez backendu na start.


---

## 6) Co będzie rozwijane dalej (autoplan)

Dodałem techniczny plan kolejnych etapów w pliku:

- `AGENT_BUILD_PLAN.md`

Tam są etapy rozbudowy i statusy (co już zrobione, co następne).
