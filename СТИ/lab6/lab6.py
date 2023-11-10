import spacy

# Загрузка модели для английского языка
nlp_en = spacy.load("en_core_web_sm")

# Ваш текст на английском
text_en = "Your English text goes here."


with open("lab6\english_text.txt", "r", encoding="windows-1252") as file:
    text_en = file.read()
# Обработка текста
doc_en = nlp_en(text_en)

# Вывод информации о токенах
# Вывод информации о первых пяти токенах
for i, token in enumerate(doc_en):
    if i < 5:
        print(f"Токен {i + 1}:")
        print(f"Текст: {token.text}")
        print(f"Лемма: {token.lemma_}")
        print(f"Часть речи: {token.pos_}")
        print(f"Стоп-слово: {token.is_stop}")
        print("-" * 30)

# Выберите предложение для анализа (например, первое предложение)
sentence = list(doc_en.sents)[0]

# Вывод дерева зависимостей
for token in sentence:
    print(f"{token.text} -> {token.head.text} ({token.dep_})")


# Извлекаем именованные сущности
for ent in doc_en.ents:
    if ent.label_ in ["GPE", "PERSON", "ORG"]:
        print(f"Сущность: {ent.text}, Тип: {ent.label_}")



# Загрузите модель для русского языка
nlp_ru = spacy.load("ru_core_news_sm")

# Откройте и прочитайте файл с текстом на русском
with open("lab6\Dostoevskiy Fedor. Bratya Karamazovy - BooksCafe.Net.txt", "r", encoding="cp1251") as file:
    text_ru = file.read()

# Обработка текста с использованием spaCy
doc_ru = nlp_ru(text_ru)

# Вывод информации о первых пяти токенах
for i, token in enumerate(doc_ru):
    if i < 5:
        print(f"Токен {i + 1}:")
        print(f"Текст: {token.text}")
        print(f"Лемма: {token.lemma_}")
        print(f"Часть речи: {token.pos_}")
        print(f"Стоп-слово: {token.is_stop}")
        print("-" * 30)

# Выберите предложение для анализа (например, первое предложение)
sentence = list(doc_ru.sents)[0]

# Вывод дерева зависимостей
for token in sentence:
    print(f"{token.text} -> {token.head.text} ({token.dep_})")


# Извлекаем именованные сущности
for ent in doc_ru.ents:
    if ent.label_ in ["GPE", "PERSON", "ORG"]:
        print(f"Сущность: {ent.text}, Тип: {ent.label_}")
