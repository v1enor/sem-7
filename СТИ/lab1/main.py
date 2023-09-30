import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd


data = pd.read_csv("spotify-2023.csv", encoding='ISO-8859-1')
median_month = data["released_month"].median()
in_spotify_playlists = data["in_spotify_playlists"]

top_artists = data['artist(s)_name'].value_counts().head(10)


print("Средний месяц дропа: ")
print(median_month)

print("Дескрайб по среднему месяцу")
print(data["released_month"].describe())

print("Средний кол-во треков в плейлисте: ")
print(in_spotify_playlists.mean())

print("Средний кол-во треков в плейлисте: ")
print(in_spotify_playlists.median())

print("Топ 10 артистов по количество треков")
print(top_artists)


top_5_revisit = data.groupby(['released_year'])['released_year'].count().reset_index(name='count').sort_values(['count'], ascending=False).head(5)
print("Топ пять лет по количеству выпущенных треков")
print(top_5_revisit)

# Plot
plt.figure(figsize=(12, 6))
sns.barplot(x=top_artists.values, y=top_artists.index, palette='viridis')
plt.xlabel('Number of Songs')
plt.ylabel('Artist(s) Name')
plt.title('Top 10 Artists with Most Songs')
plt.show()


# Создание DataFrame из данных
df = pd.DataFrame(data)
df['rating'] = df.index
df.columns

# Box plot
sns.boxplot(x='released_year', y='rating', data=df, palette='viridis')
plt.xlabel('Release Year')
plt.ylabel('Rating')
plt.title('Boxplot of Ratings by Year of Release')
plt.xticks(rotation=45)
plt.show()


# Plot histogram for danceability
plt.figure(figsize=(10, 6))
sns.histplot(data['danceability_%'], bins=20, kde=True, color='purple')
plt.xlabel('Danceability (%)')
plt.ylabel('Frequency')
plt.title('Distribution of Danceability')
plt.show()


year_mon_pair = ['released_year','released_month']

x = data.groupby(year_mon_pair)[year_mon_pair].count()

ax = x.plot(kind='bar', rot=90, figsize=(15,5), grid=False, color='purple')
ax.bar_label(ax.containers[0], padding=1, label_type='edge', 
             color='black',  rotation=0)
plt.title('Count of Tracks between 2021 and 2023 by Month')
plt.xlabel('Year and Months in (yyyy, mm)')
plt.ylabel('Number of Tracks')
plt.legend('',frameon=False)
plt.show()

plt.figure(figsize=(8, 6))
sns.countplot(data=data, x='key')
plt.title('Number of songs by key')
plt.xticks(rotation=90)
plt.show()

plt.figure(figsize=(8, 6))
sns.countplot(data=data, x='released_month')
plt.title('Number of songs by released_month')
plt.xticks(rotation=90)
plt.show()