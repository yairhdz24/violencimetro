import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  Pressable,
  Switch,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import Slider from '@react-native-community/slider';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [riskLevel, setRiskLevel] = useState(2);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'María (Hermana)', phone: '+34 612 345 678' },
    { id: 2, name: 'Centro de Ayuda', phone: '+34 900 123 456' },
    { id: 3, name: 'Policía Local', phone: '112' }
  ]);
  const [incidents, setIncidents] = useState([
    { id: 1, type: 'Test completado', date: '25/02/2025', time: '14:32', riskLevel: 3 },
    { id: 2, type: 'Alerta SOS', date: '20/02/2025', time: '22:15', riskLevel: 8 }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sosActive, setSosActive] = useState(false);
  const [sosCounter, setSosCounter] = useState(0);
  const [lastSosPress, setLastSosPress] = useState(0);
  const [showPanicButton, setShowPanicButton] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lionAnimation = useRef(new Animated.Value(0)).current;
  const drawerAnimation = useRef(new Animated.Value(-width * 0.7)).current;
  
  // Test Questions
  const questions = [
    {
      id: 1,
      question: '¿Con qué frecuencia te sientes controlado/a en tus decisiones diarias?',
      options: ['Nunca', 'A veces', 'Frecuentemente']
    },
    {
      id: 2,
      question: '¿Has notado cambios significativos en tu bienestar emocional últimamente?',
      options: ['Ninguno', 'Algunos', 'Muchos']
    },
    {
      id: 3,
      question: '¿Con qué frecuencia te sientes inseguro/a al expresar tus opiniones?',
      options: ['Nunca', 'A veces', 'Frecuentemente']
    },
    {
      id: 4,
      question: '¿Has perdido contacto con familiares o amigos cercanos recientemente?',
      options: ['No', 'Con algunos', 'Con muchos']
    },
    {
      id: 5,
      question: '¿Te has sentido amenazado/a o en peligro en los últimos 30 días?',
      options: ['Nunca', 'Alguna vez', 'Varias veces']
    }
  ];
  
  // SOS handling
  useEffect(() => {
    if (sosCounter >= 3 && Date.now() - lastSosPress < 2000) {
      activateSOS();
      setSosCounter(0);
    } else if (Date.now() - lastSosPress > 2000) {
      setSosCounter(0);
    }
  }, [sosCounter, lastSosPress]);
  
  const handleSosPress = () => {
    setSosCounter(prev => prev + 1);
    setLastSosPress(Date.now());
  };
  
  const activateSOS = () => {
    setSosActive(true);
    // In a real app this would trigger location sharing and audio recording
    setTimeout(() => {
      if (currentScreen !== 'location') {
        setCurrentScreen('location');
      }
    }, 300);
  };
  
  const deactivateSOS = () => {
    setSosActive(false);
  };

  // Splash screen animation
  useEffect(() => {
    if (currentScreen === 'splash') {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start(() => {
        setCurrentScreen('login');
      });
    }
  }, [currentScreen]);
  
  // Lion animation
  useEffect(() => {
    if (currentScreen === 'home') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(lionAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(lionAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, [currentScreen]);

  // Drawer animation
  const toggleDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: drawerOpen ? -width * 0.7 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogin = () => {
    // In a real app, this would validate credentials
    setCurrentScreen('home');
  };
  
  const handleRegister = () => {
    // In a real app, this would create a new account
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    setCurrentScreen('home');
  };
  
  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk level based on answers (higher index = higher risk)
      const riskSum = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const calculatedRisk = Math.round((riskSum / (questions.length * 2)) * 10);
      setRiskLevel(calculatedRisk);
      setCurrentScreen('results');
    }
  };
  
  const startTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentScreen('test');
  };
  
  const handlePanicAction = () => {
    // Quick exit from app or switch to innocent-looking screen
    setCurrentScreen('calculator');
  };
  
  const handleHomeIconPress = (count = 1) => {
    // Easter egg - pressing home icon 5 times shows panic button
    if (count >= 5) {
      setShowPanicButton(true);
      setTimeout(() => setShowPanicButton(false), 5000);
    }
  };

  // Drawer menu items
  const menuItems = [
    { icon: 'home', name: 'Inicio', screen: 'home' },
    { icon: 'help-outline', name: 'Test de Riesgo', screen: 'test' },
    { icon: 'forum', name: 'Foro de Ayuda', screen: 'forum' },
    { icon: 'library-books', name: 'Directorio', screen: 'directory' },
    { icon: 'location-on', name: 'Ubicación', screen: 'location' },
    { icon: 'contacts', name: 'Contactos', screen: 'contacts' },
    { icon: 'history', name: 'Historial', screen: 'history' },
    { icon: 'settings', name: 'Ajustes', screen: 'settings' },
    { icon: 'info-outline', name: 'Ayuda', screen: 'help' }
  ];
  
  // Render splash screen
  const renderSplashScreen = () => {
    return (
      <View style={styles.splashContainer}>
        <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="flower-tulip" size={70} color="#5D9CEC" />
          </View>
          <Text style={styles.splashTitle}>Bienestar Personal</Text>
          <Text style={styles.splashSubtitle}>Organiza. Aprende. Crece.</Text>
        </Animated.View>
      </View>
    );
  };
  
  // Render login/register screen
  const renderLoginScreen = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="flower-tulip" size={60} color="#5D9CEC" />
            </View>
            <Text style={styles.welcomeText}>
              Bienvenido a tu App de Organización
            </Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#7B8D93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={username}
                  onChangeText={setUsername}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#7B8D93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              
              {isRegister && (
                <View style={styles.inputContainer}>
                  <MaterialIcons name="lock" size={24} color="#7B8D93" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              )}
              
              <View style={styles.biometricContainer}>
                <Text style={styles.biometricText}>Autenticación biométrica</Text>
                <Switch
                  trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
                  thumbColor={biometricEnabled ? "#5D9CEC" : "#f4f3f4"}
                  onValueChange={setBiometricEnabled}
                  value={biometricEnabled}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={isRegister ? handleRegister : handleLogin}
              >
                <Text style={styles.buttonText}>
                  {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setIsRegister(!isRegister)}
              >
                <Text style={styles.secondaryButtonText}>
                  {isRegister ? 'Ya tengo una cuenta' : 'Crear cuenta nueva'}
                </Text>
              </TouchableOpacity>
              
              {!isRegister && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  // Render home screen with mascot
  const renderHomeScreen = () => {
    const translateY = lionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10]
    });
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer}>
            <MaterialIcons name="menu" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bienestar Personal</Text>
          <TouchableOpacity onPress={handleSosPress}>
            <MaterialIcons name="settings" size={28} color="#5D9CEC" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.homeContent}>
          <Animated.View 
            style={[
              styles.lionContainer, 
              { transform: [{ translateY }] }
            ]}
          >
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=a%20cute%20cartoon%20lion%20mascot%20with%20friendly%20expression&aspect=1:1' }} 
              style={styles.lionImage} 
            />
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                ¡Hola! Soy Leo, tu asistente personal. 
                ¿Te gustaría realizar un test rápido de auto-conocimiento?
              </Text>
            </View>
          </Animated.View>
          
          <View style={styles.riskMeterContainer}>
            <Text style={styles.riskMeterTitle}>Nivel de Autoconocimiento</Text>
            <View style={styles.riskMeterBar}>
              <View style={[styles.riskMeterFill, { width: `${(riskLevel/10) * 100}%`, backgroundColor: getRiskColor(riskLevel) }]} />
            </View>
            <View style={styles.riskLabels}>
              <Text style={styles.riskLabelLow}>Básico</Text>
              <Text style={styles.riskLabelMedium}>Intermedio</Text>
              <Text style={styles.riskLabelHigh}>Avanzado</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.startTestButton}
            onPress={startTest}
          >
            <Text style={styles.startTestButtonText}>Iniciar Test</Text>
          </TouchableOpacity>
          
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => setCurrentScreen('forum')}
            >
              <MaterialIcons name="forum" size={24} color="#5D9CEC" />
              <Text style={styles.quickAccessText}>Foro</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => setCurrentScreen('directory')}
            >
              <MaterialIcons name="library-books" size={24} color="#5D9CEC" />
              <Text style={styles.quickAccessText}>Directorio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => setCurrentScreen('contacts')}
            >
              <MaterialIcons name="contacts" size={24} color="#5D9CEC" />
              <Text style={styles.quickAccessText}>Contactos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {sosActive && (
          <View style={styles.sosActiveIndicator}>
            <Text style={styles.sosActiveText}>Asistencia activa</Text>
            <TouchableOpacity 
              style={styles.sosDeactivateButton}
              onPress={deactivateSOS}
            >
              <Text style={styles.sosDeactivateText}>Desactivar</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {showPanicButton && (
          <TouchableOpacity 
            style={styles.panicButton}
            onPress={handlePanicAction}
          >
            <MaterialIcons name="clear" size={24} color="#FFF" />
          </TouchableOpacity>
        )}
        
        {/* Hidden SOS Button */}
        <TouchableOpacity 
          style={styles.hiddenSosButton}
          onPress={handleSosPress}
          activeOpacity={1}
        />
      </SafeAreaView>
    );
  };
  
  // Render risk test
  const renderTestScreen = () => {
    const currentQ = questions[currentQuestion];
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Test de Autoconocimiento</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <View style={styles.testContainer}>
          <View style={styles.progressContainer}>
            {questions.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.progressDot, 
                  index === currentQuestion ? styles.progressDotActive : 
                  index < currentQuestion ? styles.progressDotCompleted : {}
                ]} 
              />
            ))}
          </View>
          
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Pregunta {currentQuestion + 1} de {questions.length}</Text>
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQ.options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  // Render results screen
  const renderResultsScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resultados</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Tu nivel de autoconocimiento</Text>
          
          <View style={styles.resultsMeterContainer}>
            <View style={styles.resultsMeterBar}>
              <View 
                style={[
                  styles.resultsMeterFill, 
                  { width: `${(riskLevel/10) * 100}%`, backgroundColor: getRiskColor(riskLevel) }
                ]} 
              />
              <View 
                style={[
                  styles.resultsMeterIndicator, 
                  { left: `${(riskLevel/10) * 100}%` }
                ]}
              />
            </View>
            <View style={styles.resultsLabels}>
              <Text style={styles.resultLabelLow}>Básico</Text>
              <Text style={styles.resultLabelMedium}>Intermedio</Text>
              <Text style={styles.resultLabelHigh}>Avanzado</Text>
            </View>
          </View>
          
          <View style={styles.resultMessageContainer}>
            <Text style={styles.resultMessageTitle}>
              {getRiskMessage(riskLevel).title}
            </Text>
            <Text style={styles.resultMessageText}>
              {getRiskMessage(riskLevel).message}
            </Text>
          </View>
          
          <View style={styles.suggestedActionsContainer}>
            <Text style={styles.suggestedActionsTitle}>Acciones sugeridas</Text>
            
            <TouchableOpacity 
              style={styles.suggestedActionButton}
              onPress={() => setCurrentScreen('forum')}
            >
              <MaterialIcons name="forum" size={24} color="#5D9CEC" />
              <Text style={styles.suggestedActionText}>Visitar el Foro de Ayuda</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.suggestedActionButton}
              onPress={() => setCurrentScreen('directory')}
            >
              <MaterialIcons name="library-books" size={24} color="#5D9CEC" />
              <Text style={styles.suggestedActionText}>Consultar el Directorio</Text>
            </TouchableOpacity>
            
            {riskLevel > 7 && (
              <TouchableOpacity 
                style={[styles.suggestedActionButton, styles.suggestedActionUrgent]}
                onPress={() => setCurrentScreen('contacts')}
              >
                <MaterialIcons name="contacts" size={24} color="#FF5252" />
                <Text style={[styles.suggestedActionText, styles.suggestedActionTextUrgent]}>
                  Ver Contactos de Ayuda
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.retakeTestButton}
              onPress={startTest}
            >
              <Text style={styles.retakeTestButtonText}>Realizar test de nuevo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render forum screen
  const renderForumScreen = () => {
    const forumPosts = [
      {
        id: 1,
        author: 'MariaS',
        avatar: 'https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=1',
        title: 'Compartiendo técnicas de organización personal',
        content: 'Hola a todos, quería compartir algunas técnicas que me han ayudado con mi rutina diaria y a mantener el equilibrio...',
        likes: 12,
        comments: 5,
        time: '3 horas'
      },
      {
        id: 2,
        author: 'Carlos23',
        avatar: 'https://api.a0.dev/assets/image?text=man%20profile%20picture%20avatar&aspect=1:1&seed=2',
        title: 'Buscando recomendaciones para mejorar mi situación',
        content: 'Últimamente me he sentido algo abrumado por mi situación personal. ¿Alguien tiene consejos sobre cómo manejar el estrés y la ansiedad?',
        likes: 8,
        comments: 7,
        time: '6 horas'
      },
      {
        id: 3,
        author: 'Laura_M',
        avatar: 'https://api.a0.dev/assets/image?text=woman%20profile%20picture%20avatar&aspect=1:1&seed=3',
        title: 'Mi experiencia con la meditación diaria',
        content: 'Quiero compartir cómo la meditación diaria ha transformado mi vida y me ha ayudado a encontrar paz en momentos difíciles...',
        likes: 22,
        comments: 14,
        time: '1 día'
      }
    ];
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Foro de Ayuda</Text>
          <TouchableOpacity>
            <MaterialIcons name="add" size={28} color="#5D9CEC" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.forumContainer}>
          {forumPosts.map(post => (
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
        
        <TouchableOpacity 
          style={styles.newPostButton}
          onPress={() => {}}
        >
          <MaterialIcons name="edit" size={24} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  // Render directory/glossary
  const renderDirectoryScreen = () => {
    const directoryItems = [
      {
        category: 'Nivel Básico',
        color: '#4CAF50',
        items: [
          { term: 'Control sutil', description: 'Peticiones aparentemente inocentes que limitan la libertad personal.' },
          { term: 'Aislamiento inicial', description: 'Primeros indicios de separación de amigos y familiares.' },
          { term: 'Comunicación pasivo-agresiva', description: 'Comunicación que parece neutral pero contiene hostilidad encubierta.' }
        ]
      },
      {
        category: 'Nivel Intermedio',
        color: '#FFC107',
        items: [
          { term: 'Manipulación emocional', description: 'Tácticas para controlar a través de las emociones (culpa, miedo, etc.).' },
          { term: 'Limitación de autonomía', description: 'Restricción de la capacidad para tomar decisiones propias.' },
          { term: 'Gaslighting moderado', description: 'Hacer que la persona dude de su percepción de la realidad.' }
        ]
      },
      {
        category: 'Nivel Avanzado',
        color: '#FF5252',
        items: [
          { term: 'Ciclo de tensión', description: 'Patrón de acumulación de tensión que precede a incidentes graves.' },
          { term: 'Intimidación directa', description: 'Amenazas explícitas o veladas que generan miedo constante.' },
          { term: 'Aislamiento severo', description: 'Corte total de relaciones con personas de apoyo.' }
        ]
      }
    ];
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Biblioteca de Términos</Text>
          <TouchableOpacity>
            <MaterialIcons name="search" size={28} color="#5D9CEC" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.directoryContainer}>
          {directoryItems.map((category, index) => (
            <View key={index} style={styles.directoryCategory}>
              <View style={[styles.categorylabel, { backgroundColor: category.color }]}>
                <Text style={styles.categoryLabelText}>{category.category}</Text>
              </View>
              
              {category.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.directoryItem}>
                  <Text style={styles.directoryItemTerm}>{item.term}</Text>
                  <Text style={styles.directoryItemDescription}>{item.description}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render location screen
  const renderLocationScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ubicación</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.mapContainer}>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=map%20with%20location%20marker%20city%20streets&aspect=16:9' }} 
              style={styles.mapImage} 
            />
            <View style={styles.mapPin}>
              <MaterialIcons name="location-pin" size={36} color="#FF5252" />
            </View>
          </View>
          
          <View style={styles.locationActions}>
            <TouchableOpacity 
              style={[styles.locationActionButton, sosActive ? styles.locationActionButtonActive : {}]}
              onPress={sosActive ? deactivateSOS : activateSOS}
            >
              <MaterialIcons 
                name={sosActive ? "location-off" : "location-on"} 
                size={24} 
                color={sosActive ? "#FF5252" : "#5D9CEC"} 
              />
              <Text 
                style={[
                  styles.locationActionText, 
                  sosActive ? styles.locationActionTextActive : {}
                ]}
              >
                {sosActive ? "Detener rastreo" : "Iniciar rastreo"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.locationActionButton}>
              <MaterialIcons name="share" size={24} color="#5D9CEC" />
              <Text style={styles.locationActionText}>Compartir ubicación</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.locationActionButton}>
              <MaterialIcons name="report" size={24} color="#5D9CEC" />
              <Text style={styles.locationActionText}>Denunciar incidente</Text>
            </TouchableOpacity>
          </View>
          
          {sosActive && (
            <View style={styles.locationSosActive}>
              <Text style={styles.locationSosTitle}>Compartiendo ubicación</Text>
              <Text style={styles.locationSosSubtitle}>
                Tu ubicación está siendo compartida en tiempo real con tus contactos de emergencia
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };
  
  // Render contacts screen
  const renderContactsScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contactos</Text>
          <TouchableOpacity>
            <MaterialIcons name="add" size={28} color="#5D9CEC" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.contactsContainer}>
          <Text style={styles.contactsTitle}>Contactos de Confianza</Text>
          <Text style={styles.contactsDescription}>
            Estos contactos recibirán notificaciones cuando actives la asistencia de emergencia
          </Text>
          
          {emergencyContacts.map(contact => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactAvatar}>
                <MaterialIcons name="person" size={28} color="#5D9CEC" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <TouchableOpacity style={styles.contactEdit}>
                <MaterialIcons name="edit" size={24} color="#7B8D93" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addContactButton}>
            <MaterialIcons name="add" size={24} color="#5D9CEC" />
            <Text style={styles.addContactText}>Agregar contacto</Text>
          </TouchableOpacity>
          
          <View style={styles.contactsSettings}>
            <Text style={styles.contactsSettingsTitle}>Configuración de mensajes</Text>
            <View style={styles.contactsSettingItem}>
              <Text style={styles.contactsSettingLabel}>Mensaje predeterminado</Text>
              <Text style={styles.contactsSettingValue}>
                "Necesito ayuda. Este es un mensaje automático con mi ubicación actual."
              </Text>
              <TouchableOpacity style={styles.contactsSettingEdit}>
                <MaterialIcons name="edit" size={20} color="#5D9CEC" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render history screen
  const renderHistoryScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Apuntes</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <ScrollView contentContainerStyle={styles.historyContainer}>
          {incidents.map(incident => (
            <View 
              key={incident.id} 
              style={[
                styles.historyItem,
                { borderLeftColor: getRiskColor(incident.riskLevel) }
              ]}
            >
              <View style={styles.historyItemHeader}>
                <Text style={styles.historyItemType}>{incident.type}</Text>
                <View style={styles.historyItemTime}>
                  <MaterialIcons name="access-time" size={14} color="#7B8D93" />
                  <Text style={styles.historyItemTimeText}>
                    {incident.date} - {incident.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.historyItemContent}>
                {incident.type === 'Test completado' ? (
                  <View style={styles.historyItemTest}>
                    <Text style={styles.historyItemTestLabel}>Nivel:</Text>
                    <View style={styles.historyItemRiskIndicator}>
                      <View 
                        style={[
                          styles.historyItemRiskLevel,
                          { backgroundColor: getRiskColor(incident.riskLevel), width: `${(incident.riskLevel/10) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.historyItemTestValue}>{incident.riskLevel}/10</Text>
                  </View>
                ) : (
                  <View style={styles.historyItemSos}>
                    <Text style={styles.historyItemSosLabel}>Duración:</Text>
                    <Text style={styles.historyItemSosValue}>15 minutos</Text>
                    <TouchableOpacity style={styles.historyItemSosPlay}>
                      <MaterialIcons name="play-arrow" size={18} color="#5D9CEC" />
                      <Text style={styles.historyItemSosPlayText}>Reproducir audio</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              <TouchableOpacity style={styles.historyItemActions}>
                <MaterialIcons name="more-horiz" size={24} color="#7B8D93" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render settings screen
  const renderSettingsScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajustes</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <ScrollView contentContainerStyle={styles.settingsContainer}>
          <View style={styles.profileSection}>
            <View style={styles.profileAvatar}>
              <MaterialIcons name="person" size={40} color="#5D9CEC" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Usuario</Text>
              <Text style={styles.profileEmail}>usuario@email.com</Text>
            </View>
            <TouchableOpacity style={styles.profileEdit}>
              <MaterialIcons name="edit" size={24} color="#7B8D93" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>Configuración general</Text>
            
            <View style={styles.settingItem}>
              <MaterialIcons name="notifications" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Notificaciones</Text>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
                thumbColor={true ? "#5D9CEC" : "#f4f3f4"}
                value={true}
              />
            </View>
            
            <View style={styles.settingItem}>
              <MaterialIcons name="vibration" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Vibración</Text>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
                thumbColor={true ? "#5D9CEC" : "#f4f3f4"}
                value={true}
              />
            </View>
            
            <View style={styles.settingItem}>
              <MaterialIcons name="fingerprint" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Autenticación biométrica</Text>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
                thumbColor={biometricEnabled ? "#5D9CEC" : "#f4f3f4"}
                onValueChange={setBiometricEnabled}
                value={biometricEnabled}
              />
            </View>
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>Privacidad y seguridad</Text>
            
            <TouchableOpacity style={styles.settingItemButton}>
              <MaterialIcons name="lock" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Cambiar contraseña</Text>
              <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItemButton}>
              <MaterialIcons name="security" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Configurar PIN de seguridad</Text>
              <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItemButton}>
              <MaterialIcons name="color-lens" size={24} color="#5D9CEC" />
              <Text style={styles.settingLabel}>Apariencia de la aplicación</Text>
              <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => setCurrentScreen('login')}
          >
            <MaterialIcons name="exit-to-app" size={24} color="#FF5252" />
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render help screen
  const renderHelpScreen = () => {
    const faqItems = [
      {
        question: '¿Cómo funciona el Test de Autoconocimiento?',
        answer: 'El test consta de 5 preguntas que evalúan aspectos de tu bienestar emocional y organización personal. Al finalizar, recibirás un nivel en una escala de 0 a 10 y recomendaciones personalizadas.'
      },
      {
        question: '¿Puedo cambiar mi contraseña?',
        answer: 'Sí, puedes cambiar tu contraseña en cualquier momento desde la sección "Ajustes", seleccionando la opción "Cambiar contraseña".'
      },
      {
        question: '¿Cómo agrego contactos de confianza?',
        answer: 'Dirígete a la sección "Contactos" y pulsa el botón "Agregar contacto". Podrás añadir el nombre y número de teléfono de las personas que desees.'
      },
      {
        question: '¿Qué es el modo de ubicación?',
        answer: 'La función de ubicación te permite compartir tu localización en tiempo real con los contactos que hayas configurado previamente.'
      }
    ];
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ayuda</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <ScrollView contentContainerStyle={styles.helpContainer}>
          <Text style={styles.helpTitle}>Preguntas Frecuentes</Text>
          
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
          
          <View style={styles.resourcesSection}>
            <Text style={styles.resourcesTitle}>Recursos adicionales</Text>
            
            <TouchableOpacity style={styles.resourceItem}>
              <MaterialIcons name="phone" size={24} color="#5D9CEC" />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>Línea de Ayuda</Text>
                <Text style={styles.resourceDescription}>Soporte 24/7 para situaciones de emergencia</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceItem}>
              <MaterialIcons name="article" size={24} color="#5D9CEC" />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>Guía de Autoayuda</Text>
                <Text style={styles.resourceDescription}>Recursos para mejorar tu bienestar personal</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceItem}>
              <MaterialIcons name="groups" size={24} color="#5D9CEC" />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>Comunidades de Apoyo</Text>
                <Text style={styles.resourceDescription}>Grupos de apoyo virtuales y presenciales</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Acerca de la App</Text>
            <Text style={styles.aboutText}>
              Versión 1.0.0
            </Text>
            <Text style={styles.aboutDescription}>
              Aplicación diseñada para ayudarte en tu desarrollo personal y bienestar emocional.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Render calculator screen (panic button action)
  const renderCalculatorScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.calculatorContainer}>
          <View style={styles.calculatorDisplay}>
            <Text style={styles.calculatorResult}>0</Text>
          </View>
          
          <View style={styles.calculatorKeypad}>
            {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((key, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.calculatorKey,
                  isNaN(parseInt(key)) && key !== '.' && key !== '0' ? styles.calculatorKeyOperator : {},
                  key === '0' ? styles.calculatorKeyZero : {},
                  key === '=' ? styles.calculatorKeyEquals : {}
                ]}
                onPress={() => key === 'C' ? setCurrentScreen('home') : null}
              >
                <Text style={[
                  styles.calculatorKeyText,
                  isNaN(parseInt(key)) && key !== '.' ? styles.calculatorKeyTextOperator : {}
                ]}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  // Render drawer menu
  const renderDrawer = () => {
    return (
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }]
          }
        ]}
      >
        <View style={styles.drawerHeader}>
          <View style={styles.drawerLogo}>
            <MaterialCommunityIcons name="flower-tulip" size={40} color="#5D9CEC" />
          </View>
          <Text style={styles.drawerTitle}>Bienestar Personal</Text>
          <TouchableOpacity onPress={toggleDrawer} style={styles.drawerClose}>
            <MaterialIcons name="close" size={24} color="#7B8D93" />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.drawerContent}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.drawerItem,
                currentScreen === item.screen ? styles.drawerItemActive : {}
              ]}
              onPress={() => {
                setCurrentScreen(item.screen);
                toggleDrawer();
              }}
            >
              <MaterialIcons 
                name={item.icon} 
                size={24} 
                color={currentScreen === item.screen ? "#5D9CEC" : "#7B8D93"} 
              />
              <Text 
                style={[
                  styles.drawerItemText,
                  currentScreen === item.screen ? styles.drawerItemTextActive : {}
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.drawerFooterButton}
          onPress={() => {
            toggleDrawer();
            handleHomeIconPress(5);
          }}
        >
          <MaterialIcons name="home" size={24} color="#5D9CEC" />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  // Get risk color based on level
  const getRiskColor = (level) => {
    if (level <= 3) return '#4CAF50'; // green
    if (level <= 7) return '#FFC107'; // amber
    return '#FF5252'; // red
  };
  
  // Get risk message based on level
  const getRiskMessage = (level) => {
    if (level <= 3) {
      return {
        title: 'Nivel Básico',
        message: 'Tu nivel de autoconocimiento es básico. Tienes un buen punto de partida, pero hay oportunidades para profundizar en tu desarrollo personal.'
      };
    }
    if (level <= 7) {
      return {
        title: 'Nivel Intermedio',
        message: 'Has desarrollado un nivel intermedio de autoconocimiento. Estás en el camino correcto, pero podrías beneficiarte de más herramientas y recursos.'
      };
    }
    return {
      title: 'Nivel Avanzado',
      message: 'Tu nivel de autoconocimiento es avanzado. Recomendamos que consultes recursos adicionales y consideres profundizar en aspectos específicos para seguir creciendo.'
    };
  };

  // Main render method
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return renderSplashScreen();
      case 'login':
        return renderLoginScreen();
      case 'home':
        return renderHomeScreen();
      case 'test':
        return renderTestScreen();
      case 'results':
        return renderResultsScreen();
      case 'forum':
        return renderForumScreen();
      case 'directory':
        return renderDirectoryScreen();
      case 'location':
        return renderLocationScreen();
      case 'contacts':
        return renderContactsScreen();
      case 'history':
        return renderHistoryScreen();
      case 'settings':
        return renderSettingsScreen();
      case 'help':
        return renderHelpScreen();
      case 'calculator':
        return renderCalculatorScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={() => drawerOpen && toggleDrawer()}>
          <View style={styles.container}>
            {renderScreen()}
            {renderDrawer()}
            
            {drawerOpen && (
              <TouchableWithoutFeedback onPress={toggleDrawer}>
                <View style={styles.drawerOverlay} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  
  /* Splash Screen Styles */
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  splashContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  splashTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D9CEC',
    marginTop: 24,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#7B8D93',
    marginTop: 8,
  },
  
  /* Login Screen Styles */
  loginContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#454F63',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#454F63',
  },
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  biometricText: {
    fontSize: 16,
    color: '#454F63',
  },
  primaryButton: {
    backgroundColor: '#5D9CEC',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#5D9CEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryButtonText: {
    color: '#5D9CEC',
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#7B8D93',
    fontSize: 14,
  },
  
  /* Header Styles */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
  },
  
  /* Home Screen Styles */
  homeContent: {
    padding: 16,
    alignItems: 'center',
  },
  lionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lionImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  chatBubble: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    maxWidth: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chatText: {
    fontSize: 16,
    color: '#454F63',
    lineHeight: 22,
  },
  riskMeterContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  riskMeterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  riskMeterBar: {
    height: 16,
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  riskMeterFill: {
    height: '100%',
    borderRadius: 8,
  },
  riskLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  riskLabelLow: {
    fontSize: 12,
    color: '#4CAF50',
  },
  riskLabelMedium: {
    fontSize: 12,
    color: '#FFC107',
  },
  riskLabelHigh: {
    fontSize: 12,
    color: '#FF5252',
  },
  startTestButton: {
    backgroundColor: '#5D9CEC',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#5D9CEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startTestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  quickAccessButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessText: {
    marginTop: 8,
    fontSize: 14,
    color: '#454F63',
  },
  sosActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF5252',
    // padding: a06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sosActiveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sosDeactivateButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sosDeactivateText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  panicButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF5252',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  hiddenSosButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    zIndex: -1,
  },
  
  /* Test Screen Styles */
  testContainer: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E7FF',
    marginHorizontal: 6,
  },
  progressDotActive: {
    backgroundColor: '#5D9CEC',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#4CAF50',
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionNumber: {
    fontSize: 14,
    color: '#7B8D93',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 24,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#454F63',
  },
  
  /* Results Screen Styles */
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 24,
    textAlign: 'center',
  },
  resultsMeterContainer: {
    marginBottom: 30,
  },
  resultsMeterBar: {
    height: 24,
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  resultsMeterFill: {
    height: '100%',
    borderRadius: 12,
  },
  resultsMeterIndicator: {
    position: 'absolute',
    top: -10,
    width: 12,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 6,
    marginLeft: -6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resultLabelLow: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  resultLabelMedium: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  resultLabelHigh: {
    fontSize: 14,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  resultMessageContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultMessageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  resultMessageText: {
    fontSize: 16,
    color: '#7B8D93',
    lineHeight: 24,
  },
  suggestedActionsContainer: {
    marginBottom: 24,
  },
  suggestedActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 16,
  },
  suggestedActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestedActionUrgent: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  suggestedActionText: {
    fontSize: 16,
    color: '#454F63',
    marginLeft: 16,
  },
  suggestedActionTextUrgent: {
    color: '#FF5252',
  },
  retakeTestButton: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  retakeTestButtonText: {
    fontSize: 16,
    color: '#5D9CEC',
    fontWeight: 'bold',
  },
  
  /* Forum Screen Styles */
  forumContainer: {
    padding: 16,
  },
  forumPost: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: '#F5F7FA',
  },
  postAuthorInfo: {
    marginLeft: 12,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
  },
  postTime: {
    fontSize: 12,
    color: '#7B8D93',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#7B8D93',
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    borderTopColor: '#F5F7FA',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  postActionText: {
    fontSize: 12,
    color: '#7B8D93',
    marginLeft: 4,
  },
  newPostButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#5D9CEC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5D9CEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  /* Directory Screen Styles */
  directoryContainer: {
    padding: 16,
  },
  directoryCategory: {
    marginBottom: 24,
  },
  categorylabel: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryLabelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  directoryItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  directoryItemTerm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  directoryItemDescription: {
    fontSize: 14,
    color: '#7B8D93',
    lineHeight: 20,
  },
  
  /* Location Screen Styles */
  locationContainer: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -36,
  },
  locationActions: {
    marginBottom: 24,
  },
  locationActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationActionButtonActive: {
    backgroundColor: '#FFE5E5',
  },
  locationActionText: {
    fontSize: 16,
    color: '#454F63',
    marginLeft: 16,
  },
  locationActionTextActive: {
    color: '#FF5252',
  },
  locationSosActive: {
    backgroundColor: '#FF5252',
    borderRadius: 12,
    padding: 16,
  },
  locationSosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  locationSosSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  
  /* Contacts Screen Styles */
  contactsContainer: {
    padding: 16,
  },
  contactsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  contactsDescription: {
    fontSize: 14,
    color: '#7B8D93',
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#7B8D93',
  },
  contactEdit: {
    padding: 8,
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  addContactText: {
    fontSize: 16,
    color: '#5D9CEC',
    marginLeft: 8,
  },
  contactsSettings: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactsSettingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 16,
  },
  contactsSettingItem: {
    marginBottom: 8,
  },
  contactsSettingLabel: {
    fontSize: 14,
    color: '#7B8D93',
    marginBottom: 8,
  },
  contactsSettingValue: {
    fontSize: 14,
    color: '#454F63',
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 8,
  },
  contactsSettingEdit: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  
  /* History Screen Styles */
  historyContainer: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyItemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
  },
  historyItemTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemTimeText: {
    fontSize: 12,
    color: '#7B8D93',
    marginLeft: 4,
  },
  historyItemContent: {
    marginBottom: 8,
  },
  historyItemTest: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemTestLabel: {
    fontSize: 14,
    color: '#7B8D93',
    marginRight: 8,
  },
  historyItemRiskIndicator: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E7FF',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  historyItemRiskLevel: {
    height: '100%',
    borderRadius: 4,
  },
  historyItemTestValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#454F63',
  },
  historyItemSos: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  historyItemSosLabel: {
    fontSize: 14,
    color: '#7B8D93',
    marginRight: 8,
  },
  historyItemSosValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#454F63',
    marginRight: 16,
  },
  historyItemSosPlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemSosPlayText: {
    fontSize: 14,
    color: '#5D9CEC',
    marginLeft: 4,
  },
  historyItemActions: {
    alignItems: 'flex-end',
  },
  
  /* Settings Screen Styles */
  settingsContainer: {
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#7B8D93',
  },
  profileEdit: {
    padding: 8,
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#454F63',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  /* Help Screen Styles */
  helpContainer: {
    padding: 16,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#7B8D93',
    lineHeight: 20,
  },
  resourcesSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceInfo: {
    marginLeft: 16,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#7B8D93',
  },
  aboutSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#454F63',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#7B8D93',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#7B8D93',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  /* Calculator Screen (Panic Button) Styles */
  calculatorContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  calculatorDisplay: {
    backgroundColor: '#454F63',
    padding: 24,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  calculatorResult: {
    fontSize: 48,
    color: 'white',
  },
  calculatorKeypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calculatorKey: {
    width: '25%',
    height: (height - 200) / 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#F5F7FA',
  },
  calculatorKeyOperator: {
    backgroundColor: '#5D9CEC',
  },
  calculatorKeyZero: {
    width: '50%',
  },
  calculatorKeyEquals: {
    backgroundColor: '#FF5252',
  },
  calculatorKeyText: {
    fontSize: 24,
    color: '#454F63',
  },
  calculatorKeyTextOperator: {
    color: 'white',
  },
  
  /* Drawer Styles */
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  drawerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#454F63',
    marginLeft: 16,
  },
  drawerClose: {
    padding: 8,
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItemActive: {
    backgroundColor: '#F5F7FA',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#7B8D93',
    marginLeft: 16,
  },
  drawerItemTextActive: {
    color: '#5D9CEC',
    fontWeight: 'bold',
  },
  drawerFooterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F7FA',
  },
});

export default HomeScreen;