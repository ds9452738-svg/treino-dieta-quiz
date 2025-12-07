"use client"

import { useState } from "react"
import { Dumbbell, Apple, TrendingUp, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type UserProfile = {
  goal: string
  level: string
  days: number
  diet: string
}

type Exercise = {
  name: string
  sets: string
  reps: string
  rest: string
  image: string
}

type Meal = {
  time: string
  name: string
  calories: number
  protein: number
}

export default function Home() {
  const [step, setStep] = useState<"quiz" | "app">("quiz")
  const [quizStep, setQuizStep] = useState(0)
  const [profile, setProfile] = useState<UserProfile>({
    goal: "",
    level: "",
    days: 0,
    diet: ""
  })
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([])
  const [completedMeals, setCompletedMeals] = useState<number[]>([])

  const quizQuestions = [
    {
      question: "Qual é o seu objetivo principal?",
      options: [
        { value: "hipertrofia", label: "Ganhar Massa Muscular", icon: "💪" },
        { value: "emagrecimento", label: "Perder Peso", icon: "🔥" },
        { value: "condicionamento", label: "Melhorar Condicionamento", icon: "⚡" },
        { value: "saude", label: "Saúde e Bem-estar", icon: "❤️" }
      ]
    },
    {
      question: "Qual é o seu nível de experiência?",
      options: [
        { value: "iniciante", label: "Iniciante", icon: "🌱" },
        { value: "intermediario", label: "Intermediário", icon: "🏃" },
        { value: "avancado", label: "Avançado", icon: "🏆" }
      ]
    },
    {
      question: "Quantos dias por semana você pode treinar?",
      options: [
        { value: "3", label: "3 dias", icon: "📅" },
        { value: "4", label: "4 dias", icon: "📅" },
        { value: "5", label: "5 dias", icon: "📅" },
        { value: "6", label: "6 dias", icon: "📅" }
      ]
    },
    {
      question: "Qual tipo de dieta você prefere?",
      options: [
        { value: "balanceada", label: "Balanceada", icon: "🥗" },
        { value: "low-carb", label: "Low Carb", icon: "🥩" },
        { value: "vegetariana", label: "Vegetariana", icon: "🌿" },
        { value: "flexivel", label: "Flexível", icon: "🍽️" }
      ]
    }
  ]

  const handleQuizAnswer = (value: string) => {
    const keys: (keyof UserProfile)[] = ["goal", "level", "days", "diet"]
    const key = keys[quizStep]
    
    setProfile(prev => ({
      ...prev,
      [key]: key === "days" ? parseInt(value) : value
    }))

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setStep("app")
    }
  }

  const workouts: { [key: string]: Exercise[] } = {
    "Dia 1 - Peito e Tríceps": [
      { 
        name: "Supino Reto", 
        sets: "4", 
        reps: "8-12", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"
      },
      { 
        name: "Supino Inclinado", 
        sets: "3", 
        reps: "10-12", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&h=600&fit=crop"
      },
      { 
        name: "Crucifixo", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop"
      },
      { 
        name: "Tríceps Testa", 
        sets: "3", 
        reps: "10-12", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=600&fit=crop"
      },
      { 
        name: "Tríceps Corda", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop"
      }
    ],
    "Dia 2 - Costas e Bíceps": [
      { 
        name: "Barra Fixa", 
        sets: "4", 
        reps: "6-10", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=600&fit=crop"
      },
      { 
        name: "Remada Curvada", 
        sets: "4", 
        reps: "8-12", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop"
      },
      { 
        name: "Pulldown", 
        sets: "3", 
        reps: "10-12", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1584863231364-2edc166de576?w=800&h=600&fit=crop"
      },
      { 
        name: "Rosca Direta", 
        sets: "3", 
        reps: "10-12", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop"
      },
      { 
        name: "Rosca Martelo", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop"
      }
    ],
    "Dia 3 - Pernas": [
      { 
        name: "Agachamento", 
        sets: "4", 
        reps: "8-12", 
        rest: "120s",
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop"
      },
      { 
        name: "Leg Press", 
        sets: "4", 
        reps: "10-15", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop"
      },
      { 
        name: "Cadeira Extensora", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      },
      { 
        name: "Cadeira Flexora", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop"
      },
      { 
        name: "Panturrilha", 
        sets: "4", 
        reps: "15-20", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop"
      }
    ],
    "Dia 4 - Ombros e Abdômen": [
      { 
        name: "Desenvolvimento", 
        sets: "4", 
        reps: "8-12", 
        rest: "90s",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop"
      },
      { 
        name: "Elevação Lateral", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      },
      { 
        name: "Elevação Frontal", 
        sets: "3", 
        reps: "12-15", 
        rest: "60s",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&h=600&fit=crop"
      },
      { 
        name: "Abdominal Supra", 
        sets: "3", 
        reps: "15-20", 
        rest: "45s",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"
      },
      { 
        name: "Prancha", 
        sets: "3", 
        reps: "45-60s", 
        rest: "45s",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=600&fit=crop"
      }
    ]
  }

  const dietPlan: Meal[] = [
    { time: "07:00", name: "Café da Manhã", calories: 450, protein: 25 },
    { time: "10:00", name: "Lanche da Manhã", calories: 200, protein: 15 },
    { time: "13:00", name: "Almoço", calories: 650, protein: 40 },
    { time: "16:00", name: "Lanche da Tarde", calories: 250, protein: 20 },
    { time: "19:00", name: "Jantar", calories: 550, protein: 35 },
    { time: "22:00", name: "Ceia", calories: 150, protein: 15 }
  ]

  const toggleWorkout = (index: number) => {
    setCompletedWorkouts(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const toggleMeal = (index: number) => {
    setCompletedMeals(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const workoutProgress = (completedWorkouts.length / Object.values(workouts).flat().length) * 100
  const dietProgress = (completedMeals.length / dietPlan.length) * 100

  if (step === "quiz") {
    const currentQuestion = quizQuestions[quizStep]
    const progress = ((quizStep + 1) / quizQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                Pergunta {quizStep + 1} de {quizQuestions.length}
              </Badge>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {currentQuestion.question}
            </CardTitle>
            <CardDescription className="text-base">
              Escolha a opção que melhor se adequa ao seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuizAnswer(option.value)}
                className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 dark:border-gray-700 dark:hover:border-purple-500 dark:hover:bg-purple-950/20 transition-all duration-200 flex items-center gap-4 group"
              >
                <span className="text-4xl">{option.icon}</span>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {option.label}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FitPro</h1>
                <p className="text-xs text-muted-foreground">Seu treino personalizado</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStep("quiz")
                setQuizStep(0)
                setCompletedWorkouts([])
                setCompletedMeals([])
              }}
            >
              Refazer Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Summary */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-purple-100 text-sm mb-1">Objetivo</p>
                <p className="font-bold capitalize">{profile.goal}</p>
              </div>
              <div>
                <p className="text-purple-100 text-sm mb-1">Nível</p>
                <p className="font-bold capitalize">{profile.level}</p>
              </div>
              <div>
                <p className="text-purple-100 text-sm mb-1">Frequência</p>
                <p className="font-bold">{profile.days}x por semana</p>
              </div>
              <div>
                <p className="text-purple-100 text-sm mb-1">Dieta</p>
                <p className="font-bold capitalize">{profile.diet}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Progresso Treino</CardTitle>
                    <CardDescription>Exercícios completados hoje</CardDescription>
                  </div>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {Math.round(workoutProgress)}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={workoutProgress} className="h-3" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Progresso Dieta</CardTitle>
                    <CardDescription>Refeições completadas hoje</CardDescription>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {Math.round(dietProgress)}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={dietProgress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="treino" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
            <TabsTrigger value="treino" className="text-base">
              <Dumbbell className="w-4 h-4 mr-2" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="dieta" className="text-base">
              <Apple className="w-4 h-4 mr-2" />
              Dieta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="treino" className="space-y-6">
            {Object.entries(workouts).map(([day, exercises], dayIndex) => (
              <Card key={dayIndex} className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    {day}
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {exercises.length} exercícios • {exercises.reduce((acc, ex) => acc + parseInt(ex.sets), 0)} séries totais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {exercises.map((exercise, exIndex) => {
                    const globalIndex = dayIndex * 10 + exIndex
                    const isCompleted = completedWorkouts.includes(globalIndex)
                    
                    return (
                      <div
                        key={exIndex}
                        className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                          isCompleted
                            ? "bg-green-50 dark:bg-green-950/20 border-green-500 shadow-lg"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
                        }`}
                      >
                        <div className="grid md:grid-cols-[200px_1fr] gap-0">
                          {/* Imagem do exercício */}
                          <div className="relative h-48 md:h-full overflow-hidden">
                            <img
                              src={exercise.image}
                              alt={exercise.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          
                          {/* Conteúdo do exercício */}
                          <div className="p-4 flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-xl mb-3">{exercise.name}</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-sm px-3 py-1">
                                  📊 {exercise.sets} séries
                                </Badge>
                                <Badge variant="secondary" className="text-sm px-3 py-1">
                                  🔢 {exercise.reps} reps
                                </Badge>
                                <Badge variant="secondary" className="text-sm px-3 py-1">
                                  ⏱️ {exercise.rest} descanso
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="lg"
                              variant={isCompleted ? "default" : "outline"}
                              onClick={() => toggleWorkout(globalIndex)}
                              className={`${
                                isCompleted 
                                  ? "bg-green-600 hover:bg-green-700 shadow-lg" 
                                  : "hover:bg-purple-50 dark:hover:bg-purple-950/20"
                              } transition-all duration-200`}
                            >
                              {isCompleted ? (
                                <>
                                  <Check className="w-5 h-5 mr-2" />
                                  Feito
                                </>
                              ) : (
                                <>
                                  <X className="w-5 h-5 mr-2" />
                                  Marcar
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="dieta" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-600" />
                  Plano Alimentar Diário
                </CardTitle>
                <CardDescription>
                  {dietPlan.reduce((acc, meal) => acc + meal.calories, 0)} calorias totais • 
                  {dietPlan.reduce((acc, meal) => acc + meal.protein, 0)}g proteína
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dietPlan.map((meal, index) => {
                  const isCompleted = completedMeals.includes(index)
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isCompleted
                          ? "bg-green-50 dark:bg-green-950/20 border-green-500"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {meal.time}
                            </Badge>
                            <h4 className="font-semibold text-lg">{meal.name}</h4>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Badge variant="secondary">{meal.calories} kcal</Badge>
                            </span>
                            <span className="flex items-center gap-1">
                              <Badge variant="secondary">{meal.protein}g proteína</Badge>
                            </span>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant={isCompleted ? "default" : "outline"}
                          onClick={() => toggleMeal(index)}
                          className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="text-lg">💡 Dicas de Nutrição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Beba pelo menos 2-3 litros de água por dia</p>
                <p>• Consuma proteína em todas as refeições</p>
                <p>• Evite alimentos ultraprocessados</p>
                <p>• Faça refeições a cada 3-4 horas</p>
                <p>• Priorize alimentos naturais e integrais</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
