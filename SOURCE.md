# Источник данных

Канонические выгрузки: **`source/`** (не в git — локально на машине аналитика).

```
source/
├── Бактикова/     Бактикова Фаина Родьсиловна.xlsx + Выгрузки.xlsx (JIRA)
├── кочетков/      Кочетков Никита Николаевич.xlsx (consolidated 646 строк) + Выгрузки.xlsx
├── Кузнецова/     Кузнецова Анастасия Витальевна.xlsx + Выгрузки.xlsx
└── Сорванов/      Сорванов Олег Николаевич.xlsx + Выгрузки.xlsx
```

**Дедупликация:** 4 копии `Выгрузки.xlsx` идентичны (md5 `94b6be0e…`) — в pipeline используется одна.

**Пересчёт** (из репозитория VFOS USER API):

```bash
python scripts/sync_source.py
python scripts/analyze_profitability.py
python scripts/generate_html.py
```

Манифест синхронизации: `data/source_manifest.json`.
