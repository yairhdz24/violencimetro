import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"


const forumPosts = [
  {
    id: 1,
    author: "MariaS",
    avatar:
      "https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=1",
    title: "Compartiendo técnicas de organización personal",
    content:
      "Hola a todos, quería compartir algunas técnicas que me han ayudado con mi rutina diaria y a mantener el equilibrio...",
    likes: 12,
    comments: 5,
    time: "3 horas",
  },
  {
    id: 2,
    author: "Carlos23",
    avatar:
      "https://api.a0.dev/assets/image?text=man%20profile%20picture%20avatar&aspect=1:1&seed=2",
    title: "Buscando recomendaciones para mejorar mi situación",
    content:
      "Últimamente me he sentido algo abrumado por mi situación personal. ¿Alguien tiene consejos sobre cómo manejar el estrés y la ansiedad?",
    likes: 8,
    comments: 7,
    time: "6 horas",
  },
  {
    id: 3,
    author: "Laura_M",
    avatar:
      "https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=3",
    title: "Mi experiencia con la meditación diaria",
    content:
      "Quiero compartir cómo la meditación diaria ha transformado mi vida y me ha ayudado a encontrar paz en momentos difíciles...",
    likes: 22,
    comments: 14,
    time: "1 día",
  },
];
const ForumScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foro de Ayuda</Text>
        <TouchableOpacity>
          <MaterialIcons name="add" size={28} color="#5D9CEC" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.forumContainer}>
        {forumPosts.map((post) => (
          <View key={post.id} style={styles.forumPost}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
              <View style={styles.postAuthorInfo}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <MaterialIcons name="thumb-up" size={18} color="#7B8D93" />
                <Text style={styles.postActionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <MaterialIcons name="comment" size={18} color="#7B8D93" />
                <Text style={styles.postActionText}>
                  {post.comments} comentarios
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <MaterialIcons name="share" size={18} color="#7B8D93" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.newPostButton} onPress={() => {}}>
        <MaterialIcons name="edit" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#454F63" },
  forumContainer: { padding: 16 },
  forumPost: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FA",
  },
  postAuthorInfo: { marginLeft: 12 },
  postAuthor: { fontSize: 16, fontWeight: "bold", color: "#454F63" },
  postTime: { fontSize: 12, color: "#7B8D93" },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#7B8D93",
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: "row",
    borderTopColor: "#F5F7FA",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  postAction: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  postActionText: { fontSize: 12, color: "#7B8D93", marginLeft: 4 },
  newPostButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#5D9CEC",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5D9CEC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default ForumScreen;
