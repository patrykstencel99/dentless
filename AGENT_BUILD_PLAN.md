# CommentSnap — plan rozbudowy (dla agenta)

## Główny cel produktu (najważniejsze)
- Zbudować aplikację, w której **bez logowania** użytkownik tworzy naklejkę/obraz odpowiedzi na komentarz dla **Instagrama** i **TikToka**.
- Widok ma możliwie wiernie przypominać natywny styl tych platform (własny kod, bez kopiowania assetów 1:1).
- Edytowalne muszą być: `username`, `treść komentarza` oraz `avatar użytkownika`.

## Jak pracować
- Ten plik jest źródłem prawdy dla kolejnych kroków.
- Po każdym kroku: aktualizuj status, commit, testy i krótki opis.

## Etap 1 — Stabilizacja MVP
- [x] Dodać lepszą obsługę błędów dla `Copy` i `Download` (toast sukces/błąd).
- [x] Dodać akcję `New project` (reset formularza + nowe ID projektu).
- [x] Dodać ręczne `Save to History` (czytelny model zapisu dla usera).
- [x] Rozszerzyć historię o `Delete` i `Clear all`.
- [x] Dopisać dokumentację "co dalej" dla użytkownika nietechnicznego.

## Etap 2 — Ulepszenia UX i wierność platformie (TERAZ)
- [x] Lepsza kontrola trybów preview (warianty bańki, vibe TikTok/Instagram).
- [x] Personalizacja tła (presety gradientów + subtelny glow).
- [x] Dodanie uploadu avatara użytkownika.
- [x] Delikatne mikrointerakcje (animowane przejścia).

## Etap 3 — Bulk MVP+
- [ ] Upload CSV (`username,comment`) z walidacją.
- [ ] Kolejkowe generowanie obrazów.
- [ ] Export ZIP.

## Etap 4 — Produktowo
- [ ] Wstęp do onboarding/templating.
- [ ] Presety pod kampanie marketingowe.
- [ ] Eksport ustawień/import projektu.
