import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView, // Import ScrollView
} from "react-native";
import { UserContext } from "../App";

const App = () => {
  const [balance, setBalance] = useState(10000);
  const { userData, setUserData } = useContext(UserContext);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stocks, setStocks] = useState([
    { id: "AAPL", name: "Apple Inc.", price: 150.25 },
    { id: "GOOGL", name: "Alphabet Inc.", price: 2765.45 },
    { id: "MSFT", name: "Microsoft Corporation", price: 305.52 },
    { id: "TSLA", name: "Tesla, Inc.", price: 735.72 },
    { id: "AMZN", name: "Amazon.com, Inc.", price: 3349.63 },
  ]);
  const [marketTrends, setMarketTrends] = useState([]);

  const generateRandomDataPoint = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = stocks.map((stock) => ({
        ...stock,
        price: stock.price + generateRandomDataPoint(-10, 10), // Simulate price changes
      }));
      setStocks(updatedStocks);

      // Store the market trends for the last 5 updates
      setMarketTrends((prevTrends) =>
        [updatedStocks, ...prevTrends].slice(0, 5)
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [stocks]);

  const buyStock = (stock) => {
    if (!stock) return;

    if (balance >= stock.price) {
      setBalance(balance - stock.price);
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const sellStock = (stock) => {
    if (!stock) return;

    setBalance(balance + stock.price);
    setSelectedStocks(selectedStocks.filter((s) => s.id !== stock.id));
  };

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{item.name}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>
            <Button title={`Buy ${item.name}`} onPress={() => buyStock(item)} />
          </View>
        )}
      />
      <Text style={styles.marketTrends}>Market Trends:</Text>
      {/* <FlatList
        data={marketTrends}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
      /> */}
      <Text style={styles.selectedStocks}>Selected Stocks:</Text>
      <FlatList
        data={selectedStocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.selectedStockItem}>
            <Text>{item.name}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>
            <Button
              title={`Sell ${item.name}`}
              onPress={() => sellStock(item)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
  },
  stockItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  marketTrends: {
    fontSize: 16,
    marginTop: 20,
  },
  selectedStocks: {
    fontSize: 16,
    marginTop: 20,
  },
  selectedStockItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
  },
});

export default App;
