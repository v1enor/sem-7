from deap import base, algorithms
from deap import creator
from deap import tools

import random
import matplotlib.pyplot as plt
import numpy as np

# константы задачи
ONE_MAX_LENGTH = 100    # длина подлежащей оптимизации битовой строки

# константы генетического алгоритма
POPULATION_SIZE = 200   # количество индивидуумов в популяции
P_CROSSOVER = 0.9       # вероятность скрещивания
P_MUTATION = 0.1        # вероятность мутации индивидуума
MAX_GENERATIONS = 50    # максимальное количество поколений

RANDOM_SEED = 42
random.seed(RANDOM_SEED)

creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

def oneMaxFitness(individual):
    return sum(individual), # кортеж

toolbox = base.Toolbox()

toolbox.register("zeroOrOne", random.randint, 0, 1)
toolbox.register("individualCreator", tools.initRepeat, creator.Individual, toolbox.zeroOrOne, ONE_MAX_LENGTH)
toolbox.register("populationCreator", tools.initRepeat, list, toolbox.individualCreator)

population = toolbox.populationCreator(n=POPULATION_SIZE)

toolbox.register("evaluate", oneMaxFitness)
toolbox.register("select", tools.selTournament, tournsize=3)
toolbox.register("mate", tools.cxOnePoint)
# Оригинальная мутация
toolbox.register("mutate", tools.mutFlipBit, indpb=1.0/ONE_MAX_LENGTH)

stats_orig = tools.Statistics(lambda ind: ind.fitness.values)
stats_orig.register("max", np.max)
stats_orig.register("avg", np.mean)

population_orig = list(population)
population_orig, logbook_orig = algorithms.eaSimple(population_orig, toolbox,
                                        cxpb=P_CROSSOVER,
                                        mutpb=P_MUTATION,
                                        ngen=MAX_GENERATIONS,
                                        stats=stats_orig,
                                        verbose=True)

# После изменения мутации
# Заменяем мутацию mutFlipBit на mutShuffleIndexes
toolbox.register("mutate", tools.mutShuffleIndexes, indpb=0.1)  # Измените indpb по вашему усмотрению

population_shuffled = list(population)
population_shuffled, logbook_shuffled = algorithms.eaSimple(population_shuffled, toolbox,
                                        cxpb=P_CROSSOVER,
                                        mutpb=P_MUTATION,
                                        ngen=MAX_GENERATIONS,
                                        stats=stats_orig,  # Используем те же статистики, чтобы сравнивать
                                        verbose=True)

maxFitnessValues_orig, meanFitnessValues_orig = logbook_orig.select("max", "avg")
maxFitnessValues_shuffled, meanFitnessValues_shuffled = logbook_shuffled.select("max", "avg")

plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.plot(maxFitnessValues_orig, color='red')
plt.plot(meanFitnessValues_orig, color='green')
plt.xlabel('Поколение')
plt.ylabel('Макс/средняя приспособленность')
plt.title('Оригинальная мутация')

plt.subplot(1, 2, 2)
plt.plot(maxFitnessValues_shuffled, color='red')
plt.plot(meanFitnessValues_shuffled, color='green')
plt.xlabel('Поколение')
plt.ylabel('Макс/средняя приспособленность')
plt.title('Мутация mutShuffleIndexes')

# После изменения мутации
# Заменяем мутацию mutShuffleIndexes на mutUniformInt
toolbox.register("mutate", tools.mutUniformInt, low=0, up=1, indpb=0.1)  # Измените low, up и indpb по вашему усмотрению

population_uniform = list(population)
population_uniform, logbook_uniform = algorithms.eaSimple(population_uniform, toolbox,
                                        cxpb=P_CROSSOVER,
                                        mutpb=P_MUTATION,
                                        ngen=MAX_GENERATIONS,
                                        stats=stats_orig,  # Используем те же статистики, чтобы сравнивать
                                        verbose=True)

maxFitnessValues_uniform, meanFitnessValues_uniform = logbook_uniform.select("max", "avg")

plt.figure(figsize=(18, 6))
plt.subplot(1, 3, 1)
plt.plot(maxFitnessValues_orig, color='red')
plt.plot(meanFitnessValues_orig, color='green')
plt.xlabel('Поколение')
plt.ylabel('Макс/средняя приспособленность')
plt.title('Оригинальная мутация mutFlipBit')

plt.subplot(1, 3, 2)
plt.plot(maxFitnessValues_shuffled, color='red')
plt.plot(meanFitnessValues_shuffled, color='green')
plt.xlabel('Поколение')
plt.ylabel('Макс/средняя приспособленность')
plt.title('Мутация mutShuffleIndexes')

plt.subplot(1, 3, 3)
plt.plot(maxFitnessValues_uniform, color='red')
plt.plot(meanFitnessValues_uniform, color='green')
plt.xlabel('Поколение')
plt.ylabel('Макс/средняя приспособленность')
plt.title('Мутация mutUniformInt')

plt.show()

