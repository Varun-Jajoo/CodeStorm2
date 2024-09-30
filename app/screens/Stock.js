import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const initialStocks = [
  {
    id: "TCS",
    name: "Tata Consultancy Services",
    price: 345.75,
    quantity: 0,
    change: 0.28,
  },
  {
    id: "HDFCBANK",
    name: "HDFC Bank",
    price: 148.35,
    quantity: 0,
    change: 0.55,
  },
  {
    id: "RELIANCE",
    name: "Reliance Industries",
    price: 250.9,
    quantity: 0,
    change: 0.01,
  },
  {
    id: "TATASTEEL",
    name: "Tata Steel",
    price: 150.45,
    quantity: 0,
    change: -4.76,
  },
  {
    id: "INFY",
    name: "Infosys Limited",
    price: 178.2,
    quantity: 0,
    change: 0.4,
  },
  {
    id: "HDFC",
    name: "Housing Development Finance Corporation",
    price: 280.6,
    quantity: 0,
    change: -0.2,
  },
  {
    id: "ICICIBANK",
    name: "ICICI Bank",
    price: 380.9,
    quantity: 0,
    change: 0.3,
  },
  {
    id: "HINDUNILVR",
    name: "Hindustan Unilever",
    price: 245.3,
    quantity: 0,
    change: 0.5,
  },
  { id: "ITC", name: "ITC Limited", price: 210.75, quantity: 0, change: 0.1 },
  {
    id: "WIPRO",
    name: "Wipro Limited",
    price: 380.15,
    quantity: 0,
    change: 0.25,
  },
  {
    id: "BAJAJ-AUTO",
    name: "Bajaj Auto",
    price: 320.95,
    quantity: 0,
    change: -1.0,
  },
  {
    id: "CIPLA",
    name: "Cipla Limited",
    price: 520.4,
    quantity: 0,
    change: -0.15,
  },
  {
    id: "LT",
    name: "Larsen & Toubro",
    price: 768.75,
    quantity: 0,
    change: 0.35,
  },
  {
    id: "SBI",
    name: "State Bank of India",
    price: 450.35,
    quantity: 0,
    change: -0.1,
  },
  {
    id: "HEROMOTOCO",
    name: "Hero MotoCorp",
    price: 650.1,
    quantity: 0,
    change: 0.2,
  },
  {
    id: "HCLTECH",
    name: "HCL Technologies",
    price: 105.25,
    quantity: 0,
    change: 0.45,
  },
  {
    id: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    price: 205.5,
    quantity: 0,
    change: 0.6,
  },
];

const StockCard = ({ stock, onBuy, onSell }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.stockName}>{stock.name}</Text>
          <Text style={styles.stockPrice}>₹ {stock.price.toFixed(2)}</Text>
        </View>
        <View
          style={[
            styles.changeContainer,
            stock.change >= 0
              ? styles.positiveChangeBackground
              : styles.negativeChangeBackground,
          ]}
        >
          <Icon
            name={stock.change >= 0 ? "arrow-upward" : "arrow-downward"}
            style={[
              styles.icon,
              { color: stock.change >= 0 ? "#4caf50" : "#f44336" },
            ]} // Change icon color based on stock change
          />
          <Text
            style={[
              styles.changeText,
              stock.change >= 0
                ? styles.changeTextPositive
                : styles.changeTextNegative,
            ]}
          >
            {Math.abs(stock.change).toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={() => onBuy(stock)}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sellButton}
          onPress={() => onSell(stock)}
        >
          <Text style={styles.buttonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const App = () => {
  const [stocks, setStocks] = useState(initialStocks);
  const [portfolio, setPortfolio] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(4120.0);
  const [points, setPoints] = useState(Math.floor(balance / 10));
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerAnimation] = useState(new Animated.Value(0));

  const updateStockPrices = () => {
    const updatedStocks = stocks.map((stock) => {
      const randomChange = Math.random() * 16 - 8; // Random change between -8% and +8%
      const newPrice = stock.price * (1 + randomChange / 100);
      return {
        ...stock,
        price: newPrice,
        change: randomChange,
      };
    });
    setStocks(updatedStocks);
  };

  const handleBuy = (stock) => {
    if (balance >= stock.price) {
      setPortfolio((prevPortfolio) => {
        const existingStock = prevPortfolio.find(
          (item) => item.id === stock.id
        );
        if (existingStock) {
          return prevPortfolio.map((item) =>
            item.id === stock.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevPortfolio, { ...stock, quantity: 1 }];
        }
      });

      const newBalance = balance - stock.price;
      setBalance(newBalance);
      setPoints(Math.floor(newBalance / 10)); // Update points based on new balance
    } else {
      alert("Insufficient balance to buy stock");
    }
  };

  const handleSell = (stock) => {
    const existingStock = portfolio.find((item) => item.id === stock.id);
    if (existingStock && existingStock.quantity > 0) {
      setPortfolio(
        (prevPortfolio) =>
          prevPortfolio
            .map((item) =>
              item.id === stock.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0) // Remove stocks with quantity 0
      );

      const newBalance = balance + stock.price; // Increase balance by stock price
      setBalance(newBalance);
      setPoints(Math.floor(newBalance / 10)); // Update points based on new balance
    } else {
      // Show drawer if stock is not in portfolio
      setDrawerVisible(true);
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(drawerAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
          setDrawerVisible(false);
        }, 2000);
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(updateStockPrices, 3000); // Update every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [stocks]);

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Balance: ₹{balance.toFixed(2)}</Text>
        <Text style={styles.pointText}>Point: {points}</Text>

        <TouchableOpacity
          style={styles.portfolioButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Portfolio</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StockCard stock={item} onBuy={handleBuy} onSell={handleSell} />
        )}
        contentContainerStyle={styles.stockList}
      />

      {/* Modal for Portfolio */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Portfolio</Text>
            <ScrollView>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Stock Name</Text>
                  <Text style={styles.tableHeaderText}>Quantity</Text>
                </View>
                {portfolio.length === 0 ? (
                  <Text style={styles.noPortfolioText}>
                    No stocks in portfolio
                  </Text>
                ) : (
                  portfolio.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                      <Text style={styles.tableRowText}>{item.name}</Text>
                      <Text style={styles.tableRowText}>{item.quantity}</Text>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Drawer for Error */}
      {drawerVisible && (
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateY: drawerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.errorText}>Stock not in portfolio!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  balanceCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  balanceTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pointText: {
    fontSize: 18,
    marginBottom: 8,
  },
  portfolioButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  stockList: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  cardContent: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stockPrice: {
    fontSize: 14,
    color: "#6b7280",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15, // Rounded corners
  },
  positiveChangeBackground: {
    backgroundColor: "#e0f7e4", // Light green background for positive change
  },
  negativeChangeBackground: {
    backgroundColor: "#fdecea", // Light red background for negative change
  },
  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  changeTextPositive: {
    color: "#4caf50", // Green color for positive change
  },
  changeTextNegative: {
    color: "#f44336", // Red color for negative change
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  buyButton: {
    backgroundColor: "#2196f3",
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
    paddingHorizontal: 26,
  },
  sellButton: {
    backgroundColor: "#f44336",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 26,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  icon: {
    width: 16,
    height: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableContainer: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  noPortfolioText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableRowText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f44336",
    padding: 16,
    alignItems: "center",
  },
  errorText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default App;
