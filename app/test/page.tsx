"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    id: 1,
    question: "모임에서 나는 주로...",
    options: [
      { value: "egen", label: "분위기를 주도하고 활발하게 대화를 이끈다" },
      { value: "teto", label: "차분하게 상황을 관찰하고 필요할 때 의견을 낸다" },
    ],
  },
  {
    id: 2,
    question: "스트레스를 받았을 때 나는...",
    options: [
      { value: "egen", label: "친구들과 만나 수다를 떨며 푼다" },
      { value: "teto", label: "혼자만의 시간을 가지며 생각을 정리한다" },
    ],
  },
  {
    id: 3,
    question: "의사결정을 할 때 나는...",
    options: [
      { value: "teto", label: "논리적으로 분석하고 객관적인 사실에 기반해 결정한다" },
      { value: "egen", label: "직감과 감정에 따라 결정하는 편이다" },
    ],
  },
  {
    id: 4,
    question: "갈등 상황에서 나는...",
    options: [
      { value: "egen", label: "감정을 표현하고 즉각적으로 해결하려 한다" },
      { value: "teto", label: "일단 상황을 분석하고 차분하게 대응한다" },
    ],
  },
  {
    id: 5,
    question: "새로운 환경에 적응하는 것이...",
    options: [
      { value: "egen", label: "쉽고 빠르게 적응하는 편이다" },
      { value: "teto", label: "시간이 좀 걸리지만 깊게 적응한다" },
    ],
  },
  {
    id: 6,
    question: "주말에 나는 주로...",
    options: [
      { value: "teto", label: "계획을 세우고 그에 따라 시간을 보낸다" },
      { value: "egen", label: "즉흥적으로 그때그때 하고 싶은 것을 한다" },
    ],
  },
  {
    id: 7,
    question: "대화할 때 나는...",
    options: [
      { value: "egen", label: "다양한 주제로 빠르게 대화를 이어나간다" },
      { value: "teto", label: "한 주제에 대해 깊이 있게 대화하는 것을 선호한다" },
    ],
  },
  {
    id: 8,
    question: "일을 처리할 때 나는...",
    options: [
      { value: "teto", label: "체계적으로 한 가지씩 끝내는 것을 선호한다" },
      { value: "egen", label: "여러 일을 동시에 처리하는 것을 잘한다" },
    ],
  },
  {
    id: 9,
    question: "나의 에너지는 주로...",
    options: [
      { value: "egen", label: "외부 활동과 사람들과의 교류에서 얻는다" },
      { value: "teto", label: "혼자만의 시간과 내적 성찰에서 얻는다" },
    ],
  },
  {
    id: 10,
    question: "나는 주변 사람들에게...",
    options: [
      { value: "egen", label: "활발하고 에너지 넘치는 사람으로 인식된다" },
      { value: "teto", label: "차분하고 신중한 사람으로 인식된다" },
    ],
  },
]

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [currentQuestion]: selectedOption })

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        // Calculate result
        const egenCount =
          Object.values(answers).filter((answer) => answer === "egen").length + (selectedOption === "egen" ? 1 : 0)
        const tetoCount =
          Object.values(answers).filter((answer) => answer === "teto").length + (selectedOption === "teto" ? 1 : 0)

        router.push(`/result?egen=${egenCount}&teto=${tetoCount}`)
      }
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                질문 {currentQuestion + 1}/{questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h2>

          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
          >
            {currentQuestion < questions.length - 1 ? "다음" : "결과 보기"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
