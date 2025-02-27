import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';

const forumPosts = [
  {
    id: 1,
    author: "MariaS",
    avatar: "https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=1",
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
    avatar: "https://api.a0.dev/assets/image?text=man%20profile%20picture%20avatar&aspect=1:1&seed=2",
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
    avatar: "https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=3",
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
      <Header
        title="Foro de Ayuda"
        leftIcon="arrow-back"
        rightIcon="add"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
      />

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
                <Text style={styles.postActionText}>{post.comments} comentarios</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  forumContainer: {
    padding: 16,
  },
  forumPost: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  postTime: {
    fontSize: 12,
    color: '#7B8D93',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#7B8D93',
  },
  newPostButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5D9CEC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default ForumScreen;