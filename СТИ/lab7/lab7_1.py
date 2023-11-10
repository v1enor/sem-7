import spacy
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Загрузите модель для английского языка
nlp_en = spacy.load("en_core_web_sm")

# Загрузите датасет
data = pd.read_csv("lab7\spam.csv", encoding="ISO-8859-1")

# Преобразуйте тексты в векторы признаков с использованием CountVectorizer
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(data['Message'])
y = data['Category']

# Создайте и обучите модель
model = MultinomialNB()
model.fit(X, y)

# Запрос текста у пользователя
user_input = input("Введите текст: ")

# Обработка текста с использованием spaCy
user_input_doc = nlp_en(user_input)

# Преобразуйте вектор признаков для пользовательского ввода
user_input_vec = vectorizer.transform([user_input])

# Предсказание
prediction = model.predict(user_input_vec)

if prediction[0] == 'spam':
    #Пример - "free digital sale"
    print("Это сообщение классифицируется как спам.")
else:
    print("Это сообщение классифицируется как не-спам.")