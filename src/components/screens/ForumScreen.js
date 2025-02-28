"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { MaterialIcons, Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

// Sample data for forum posts
const forumPosts = [
  {
    id: 1,
    gender: "male",
    title: "Necesito ayuda con una situación difícil",
    content:
      "He estado viviendo una situación de violencia de género y me cuesta encontrar apoyo. ¿Alguien ha pasado por algo similar?",
    likes: 15,
    comments: ["No estás solo, hay organizaciones que pueden ayudarte.", "Te recomiendo buscar ayuda profesional."],
    time: "2 horas",
  },
  {
    id: 2,
    gender: "female",
    title: "¿Dónde puedo pedir ayuda legal?",
    content:
      "Quiero saber qué opciones legales tengo para denunciar y protegerme. Cualquier orientación sería de mucha ayuda.",
    likes: 20,
    comments: [
      "Consulta con un abogado especializado en estos casos.",
      "Hay líneas de ayuda gratuita para asistencia legal.",
    ],
    time: "4 horas",
  },
  {
    id: 3,
    gender: "male",
    title: "Cómo superar el miedo y buscar ayuda",
    content: "Me ha costado mucho dar el primer paso para salir de una relación tóxica. ¿Cómo afrontaron ese miedo?",
    likes: 12,
    comments: ["Tener una red de apoyo es clave.", "Busca ayuda psicológica, puede hacer la diferencia."],
    time: "6 horas",
  },
]

const ForumScreen = ({ navigation }) => {
  const [likedPosts, setLikedPosts] = useState({})
  const [expandedComments, setExpandedComments] = useState({})

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foro de Ayuda</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="filter" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.forumContainer} showsVerticalScrollIndicator={false}>
        {forumPosts.map((post) => (
          <View key={post.id} style={styles.forumPost}>
            <View style={styles.postHeader}>
              <Image
                source={{
                  uri:
                    post.gender === "male"
                      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-P2YEpnJ2uMnEIJR1mwseRZobhjtKjn.png"
                      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-02-28%20020546-LkApUY7tAMs6gSHYJDGbYqVhpMpQpN.png",
                }}
                style={styles.avatar}
              />
              <View style={styles.postHeaderInfo}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.divider} />

            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => toggleLike(post.id)} style={styles.postAction}>
                <MaterialIcons
                  name={likedPosts[post.id] ? "favorite" : "favorite-border"}
                  size={20}
                  color={likedPosts[post.id] ? "#1f4035" : "#1f4035"}
                />
                <Text style={[styles.postActionText, likedPosts[post.id] && styles.likedText]}>
                  {post.likes + (likedPosts[post.id] ? 1 : 0)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postAction} onPress={() => toggleComments(post.id)}>
                <MaterialIcons
                  name={expandedComments[post.id] ? "chat-bubble" : "chat-bubble-outline"}
                  size={20}
                  color={expandedComments[post.id] ? "#1f4035" : "#1f4035"}
                />
                <Text style={[styles.postActionText, expandedComments[post.id] && { color: "#4A6FE7" }]}>
                  {post.comments.length}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postAction}>
                <Feather name="share-2" size={20} color="#1f4035" />
              </TouchableOpacity>
            </View>

            {expandedComments[post.id] && post.comments.length > 0 && (
              <View style={styles.commentsSection}>
                <Text style={styles.commentsSectionTitle}>Comentarios</Text>
                {post.comments.map((comment, index) => (
                  <View key={index} style={styles.commentContainer}>
                    <View style={styles.commentDot} />
                    <Text style={styles.comment}>{comment}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <TouchableOpacity style={styles.newPostButton} onPress={() => {}}>
        <Feather name="edit-2" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1f4035",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius:5,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  forumContainer: {
    padding: 16,
  },
  forumPost: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-start",
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postTime: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
    lineHeight: 22,
  },
  postContent: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  postActionText: {
    fontSize: 14,
    color: "#718096",
    marginLeft: 6,
    fontWeight: "500",
  },
  likedText: {
    color: "#1f4035",
  },
  commentsSection: {
    marginTop: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
  },
  commentsSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  commentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1f4035",
    marginTop: 8,
    marginRight: 8,
  },
  comment: {
    flex: 1,
    fontSize: 13,
    color: "#1f4035",
    lineHeight: 20,
  },
  newPostButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#1f4035",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#4A6FE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bottomSpace: {
    height: 80,
  },
})

export default ForumScreen

