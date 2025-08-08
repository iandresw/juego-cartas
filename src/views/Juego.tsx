
import React, { useEffect, useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import Card from '../components/Card';
import { GameContext } from '../context/JuegoContext';

type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const GameScreen = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const { addGameResult } = useContext(GameContext);

  const generateCards = () => {
    const values = ['A', 'B', 'C', 'D'];
    const duplicated = [...values, ...values];
    const shuffled = duplicated
      .map((val) => ({ value: val, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((val, index) => ({
        id: index,
        value: val.value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelectedCards([]);
  };

  useEffect(() => {
    generateCards();
  }, []);

  const handleCardPress = (card: CardType) => {
    if (card.isFlipped || card.isMatched || selectedCards.length === 2) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    const newSelected = [...selectedCards, { ...card, isFlipped: true }];

    setCards(newCards);
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.value === second.value) {
        const updatedCards = newCards.map((c) =>
          c.value === first.value ? { ...c, isMatched: true } : c
        );
        setCards(updatedCards);
        setSelectedCards([]);
        if (updatedCards.every((c) => c.isMatched)) {
          Alert.alert('¡Ganaste!', 'Has encontrado todos los pares');
          addGameResult(true);
        }
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setSelectedCards([]);
          Alert.alert('No son iguales', 'Intenta de nuevo');
          addGameResult(false);
        }, 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Encuentra los pares:</Text>
      <View style={styles.grid}>
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped || card.isMatched}
            onPress={() => handleCardPress(card)}
          />
        ))}
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  instructions: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
});
